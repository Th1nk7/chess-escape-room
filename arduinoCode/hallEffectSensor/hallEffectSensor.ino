const int hallPin[12] = {
  13, // D13
  12, // D12
  14, // D14
  27, // D27
  26, // D26
  25, // D25
  33, // D33
  32, // D32
  15, // D15
  2,  // D2
  4,  // D4
  5   // D5
};

void setup() {
  Serial.begin(115200);
  for (int i = 0; i < 12; i++) {
    pinMode(hallPin[i], INPUT_PULLUP);  // Internal pull-up used (no external resistors)
  }
  Serial.println("Hall-effect sensor test started...");
}

void loop() {
  for (int i = 0; i < 12; i++) {
    int state = digitalRead(hallPin[i]);

    if (state == HIGH) {
      Serial.println("Magnet detected!");
      Serial.print(i+1);
    } else {
      Serial.println("No magnet.");
      Serial.print(i+1);
    }
  }

  delay(500);  // Delay for readability
}
