#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <PubSubClient.h>

// Hall effect sensor pins
const int hallPin[12] = { 13, 23, 14, 27, 26, 25, 33, 32, 15, 22, 4, 5 };
int lastState[12];

// WiFi credentials
const char* ssid = "Next-Guest";
const char* password = "";

// MQTT broker
const char* mqtt_server = "mqtt.nextservices.dk";
const int mqtt_port = 8883;

// Secure client for TLS
WiFiClientSecure espClient;
PubSubClient client(espClient);

// Reconnect to MQTT broker
void reconnect() {
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    if (client.connect("HallEffectSensor")) {
      Serial.println("connected");
    } else {
      Serial.print(" failed, rc=");
      Serial.print(client.state());
      Serial.println(" retrying in 2 seconds...");
      delay(2000);
    }
  }
}

void setup() {
  Serial.begin(115200);

  // Initialize sensor pins and state
  for (int i = 0; i < 12; i++) {
    pinMode(hallPin[i], INPUT_PULLUP);
    lastState[i] = digitalRead(hallPin[i]);
  }

  // Connect to WiFi
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nConnected to WiFi");

  delay(500); // Ensure TLS entropy pool is ready

  // Resolve DNS BEFORE using TLS
  IPAddress brokerIP;
  if (!WiFi.hostByName(mqtt_server, brokerIP)) {
    Serial.println("DNS resolution failed!");
    while (true); // Fatal error
  }
  Serial.print("Resolved MQTT broker IP: ");
  Serial.println(brokerIP);

  // Disable TLS certificate validation
  espClient.setInsecure();

  // Set MQTT server
  client.setServer(mqtt_server, mqtt_port);

  // Initial connect
  reconnect();
}

void loop() {
  // Reconnect if needed
  if (!client.connected()) {
    reconnect();
  }

  client.loop();

  // Check all hall sensors
  for (int i = 0; i < 12; i++) {
    int currentState = digitalRead(hallPin[i]);
    if (currentState != lastState[i]) {
      lastState[i] = currentState;
      String message = String(hallPin[i]) + ":" + (currentState == HIGH ? "HIGH" : "LOW");
      client.publish("chessEscaperoom", message.c_str());
      Serial.println("Sent: " + message);
    }
  }

  delay(100); // Debounce & reduce traffic
}
