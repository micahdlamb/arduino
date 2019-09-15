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

///////please enter your sensitive data in the Secret tab/arduino_secrets.h
// char ssid[] = "Orion";       // your network SSID (name)
// char pass[] = "3710flora";   // your network password (use for WPA, or use as key for WEP)
char ssid[] = "Ciller Room";       // your network SSID (name)
char pass[] = "12345678";   // your network password (use for WPA, or use as key for WEP)
int keyIndex = 0;            // your network key Index number (needed only for WEP)

int status = WL_IDLE_STATUS;
WiFiServer server(80);

// https://randomnerdtutorials.com/guide-for-ds18b20-temperature-sensor-with-arduino/
#include <OneWire.h>
#include <DallasTemperature.h>
// Data wire is conntec to the Arduino digital pin 4
#define ONE_WIRE_BUS 4
// Setup a oneWire instance to communicate with any OneWire devices
OneWire oneWire(ONE_WIRE_BUS);
// Pass our oneWire reference to Dallas Temperature sensor 
DallasTemperature sensors(&oneWire);


void setup() {
  //Initialize serial and wait for port to open:
  Serial.begin(9600);
//  while (!Serial) {
//    ; // wait for serial port to connect. Needed for native USB port only
//  }
  
  pinMode(0, INPUT_PULLDOWN);
  pinMode(1, INPUT_PULLDOWN);
  pinMode(2, INPUT_PULLDOWN);
  pinMode(3, INPUT_PULLDOWN);
  pinMode(4, INPUT_PULLDOWN);
  pinMode(5, INPUT_PULLDOWN);

  sensors.begin();
  initializeWifi();
}

void loop() {
  /*
  // Call sensors.requestTemperatures() to issue a global temperature and Requests to all devices on the bus
  sensors.requestTemperatures(); 
  
  Serial.print("Celsius temperature: ");
  // Why "byIndex"? You can have more than one IC on the same bus. 0 refers to the first IC on the wire
  Serial.print(sensors.getTempCByIndex(0)); 
  Serial.print(" - Fahrenheit temperature: ");
  Serial.println(sensors.getTempFByIndex(0));
  delay(1000);
  */
  
  handleRequest();
}

int i;
char buf[512];
char msg[128];
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

  if (strcmp(method, "POST") == 0){
    char* pin   = strtok(&path[1], "/");
    char* value = strtok(NULL, " ");
    digitalWrite(atoi(pin), atoi(value));

    int len = sprintf(msg, "\"pin %s set to %s\"", pin, value);
    send200(client, msg, len);
  }
  else if (strcmp(method, "GET") == 0){
    // Call sensors.requestTemperatures() to issue a global temperature and Requests to all devices on the bus
    sensors.requestTemperatures(); 
    float T1 = sensors.getTempFByIndex(0);

    int len = sprintf(msg, "{\"0\":%d,\"1\":%d,\"2\":%d,\"3\":%d,\"4\":%d,\"5\":%d,\"6\":%d,\"A0\":%d,\"A1\":%d,\"A2\":%d,\"T1\":%f}",
                           digitalRead(0), digitalRead(1), digitalRead(2), digitalRead(3), digitalRead(4), digitalRead(5), digitalRead(6),
                           analogRead(A0), analogRead(A1), analogRead(A2),
                           T1);
    send200(client, msg, len);
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

void initializeWifi() {
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
