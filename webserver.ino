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
  pinMode(1, OUTPUT);
  pinMode(2, OUTPUT);
  pinMode(3, OUTPUT);
  pinMode(4, OUTPUT);
  pinMode(5, OUTPUT);
  pinMode(6, OUTPUT);
  
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

void handleRequest(){
  // listen for incoming clients
  WiFiClient client = server.available();
  if (!client) return;

  String header = "";
  String body = "";
  while (client.connected()) {
    char c = client.read();
    Serial.write(c);
    header += c;
    if (header.endsWith("\r\n\r\n"))
      break;
//    if (header.endsWith("\r\n\r\n")){
//      if (header.startsWith("POST"){
//        while (client.available()){
//          c = client.read();
//          Serial.write(c):
//          body += c;
//        }
//        break;
//      }
//    }
  }

  int start=0;
  String method = split(header, ' ',  start);
  String path   = split(header, ' ', start);

  if (method == "POST"){
    int start=1;
    int pin   = split(path, '/', start).toInt();
    int value = path.substring(start).toInt();
    digitalWrite(pin, value);
    send200(client, "\"pin " + String(pin) + " set to " + String(value) + "\"");
  }
  else if (path == "/pins"){
    send200(client, "[" +
      String(digitalRead(1)) + "," +
      String(digitalRead(2)) + "," +
      String(digitalRead(3)) + "," +
      String(digitalRead(4)) + "," +
      String(digitalRead(5)) + "," +
      String(digitalRead(6)) + "," +
    "]");
  }
  else if (path == "/"){
    client.println("HTTP/1.1 200 OK");
    client.println("Content-Length: " + String(sizeof(buttons_html)-1));
    client.println();
    client.print(buttons_html);
  }
  else
    client.print("HTTP/1.1 404 Not Found");

  //client.stop();
  //Serial.println("client disconnected");
}

String send200(WiFiClient& client, const String& body){
    client.println("HTTP/1.1 200 OK");
    client.println("Access-Control-Allow-Origin: *");
    client.println("Content-Length: " + String(body.length()));
    client.println();
    client.print(body);
}

String split(const String& string, char delim, int& start){
    int end = string.indexOf(delim, start);
    String tok = string.substring(start, end);
    start = end+1;
    return tok;
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
