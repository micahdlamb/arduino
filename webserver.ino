/*
  WiFi Web Server

 A simple web server that shows the value of the analog input pins.

 This example is written for a network using WPA encryption. For
 WEP or WPA, change the Wifi.begin() call accordingly.

 Circuit:
 * Analog inputs attached to pins A0 through A5 (optional)

 created 13 July 2010
 by dlf (Metodo2 srl)
 modified 31 May 2012
 by Tom Igoe

 */

#include <SPI.h>
#include <WiFiNINA.h>
#include "html.h"


///////please enter your sensitive data in the Secret tab/arduino_secrets.h
char ssid[] = "Orion";       // your network SSID (name)
char pass[] = "3710flora";   // your network password (use for WPA, or use as key for WEP)
int keyIndex = 0;            // your network key Index number (needed only for WEP)

int status = WL_IDLE_STATUS;

WiFiServer server(80);

void setup() {
  pinMode(0, INPUT_PULLDOWN);
  pinMode(1, INPUT_PULLDOWN);
  pinMode(2, INPUT_PULLDOWN);
  pinMode(3, INPUT_PULLDOWN);
  pinMode(4, INPUT_PULLDOWN);
  pinMode(5, INPUT_PULLDOWN);
  
  //Initialize serial and wait for port to open:
  Serial.begin(9600);
  while (!Serial) {
    ; // wait for serial port to connect. Needed for native USB port only
  }

  // check for the WiFi module:
  if (WiFi.status() == WL_NO_MODULE) {
    Serial.println("Communication with WiFi module failed!");
    // don't continue
    while (true);
  }

  String fv = WiFi.firmwareVersion();
  if (fv < "1.0.0") {
    Serial.println("Please upgrade the firmware");
  }

  // attempt to connect to Wifi network:
  while (status != WL_CONNECTED) {
    Serial.print("Attempting to connect to SSID: ");
    Serial.println(ssid);
    // Connect to WPA/WPA2 network. Change this line if using open or WEP network:
    status = WiFi.begin(ssid, pass);

    // wait 10 seconds for connection:
    //delay(10000);
  }
  server.begin();
  // you're connected now, so print out the status:
  printWifiStatus();
}

void loop() {
  handleRequest();
}

int i;
char buf[1024];
char msg[64];
char contentLength[32] = "Content-Length: ";

void handleRequest(){
  // listen for incoming clients
  WiFiClient client = server.available();
  if (!client) return;

  i = 0;
  while (client.connected()) {
    char c = client.read();
    Serial.write(c);
    buf[i++] = c;
    // Reading past first line isn't necessary if closing connection
    if (strncmp(&buf[i-4], "\r\n\r\n", 4) == 0)
      break;
  }

  char* method = strtok(buf, " ");
  char* path   = strtok(NULL, " ");

  Serial.print("method: "); Serial.println(method);
  Serial.print("path:   "); Serial.println(path);

  if (strcmp(method, "POST") == 0){
    char* pin   = strtok(&path[1], "/");
    char* value = strtok(NULL, " ");
    digitalWrite(atoi(pin), atoi(value));

    int len = sprintf(msg, "pin %s set to %s", pin, value);
    send200(client, msg, len);
  }
  else if (strcmp(path, "/pins") == 0){
    int len = sprintf(msg, "[%d,%d,%d,%d,%d,%d]", digitalRead(0), digitalRead(1), digitalRead(2), digitalRead(3), digitalRead(4), digitalRead(5));
    send200(client, msg, len);
  }
  else if (strcmp(path, "/") == 0){
    client.println("HTTP/1.1 200 OK");
    itoa(sizeof(buttons_html)-1, &contentLength[16], 10);
    client.println(contentLength);
    client.println();
    client.print(buttons_html);
  }
  else {
    client.print("HTTP/1.1 404 Not Found");
    client.stop();
  }

  // Content-Length not needed if stopping connection
  // Ideally connections could be reused? But seems to cause arduino to stop working after a while.
  client.stop();
  Serial.println("client disconnected");
}

void send200(WiFiClient& client, char* body, int len){
    client.println("HTTP/1.1 200 OK");
    client.println("Access-Control-Allow-Origin: *");
    itoa(len, &contentLength[16], 10);
    client.println(contentLength);
    client.println();
    client.print(body);
}

void printWifiStatus() {
  // print the SSID of the network you're attached to:
  Serial.print("SSID: ");
  Serial.println(WiFi.SSID());

  // print your board's IP address:
  IPAddress ip = WiFi.localIP();
  Serial.print("IP Address: ");
  Serial.println(ip);

  // print the received signal strength:
  long rssi = WiFi.RSSI();
  Serial.print("signal strength (RSSI):");
  Serial.print(rssi);
  Serial.println(" dBm");
}
