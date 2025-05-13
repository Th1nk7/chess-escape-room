const int hallPin[12] = {
  13, 23, 14, 27, 26, 25, 33, 32, 15, 22, 4, 5
};

int previousState[12];

void setup() {
  Serial.begin(115200);
  for (int i = 0; i < 12; i++) {
    pinMode(hallPin[i], INPUT_PULLUP);
    previousState[i] = digitalRead(hallPin[i]); // Initialize with current state
  }
  Serial.println("Hall-effect sensor test started...");
}

void loop() {
  for (int i = 0; i < 12; i++) {
    int currentState = digitalRead(hallPin[i]);
    if (currentState != previousState[i]) {
      Serial.print("State: ");
      Serial.print(currentState);
      Serial.print(" GPIO-PIN: ");
      Serial.println(hallPin[i]);
      previousState[i] = currentState;
    }
  }

  delay(50); // Faster polling since we're now only printing on change
}
