const int hallPin = 13;  // Sensor output connected to GPIO 13 (D13)

void setup() {
  Serial.begin(115200);
  pinMode(hallPin, INPUT_PULLDOWN);  // No INPUT_PULLUP – we're using external pull-up
  Serial.println("Hall-effect sensor test started...");
}

void loop() {
  int state = digitalRead(hallPin);

  if (state == HIGH) {
    Serial.println("Magnet detected!");
  } else {
    Serial.println("No magnet.");
  }

  delay(500);  // Delay for readability
}
