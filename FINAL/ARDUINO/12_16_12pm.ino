#include <Adafruit_NeoPixel.h>
#include <Keypad.h>

// Buttons
const int buttonPin = 12;
int previousButtonState = LOW;

// Ultra Sonic Sensor
const int triggerPin = 11;
const int echoPin = 10;

// Keypad
const byte ROWS = 4;
const byte COLS = 4;

char hexaKeys[ROWS][COLS] = {
  {'1', '2', '3', 'A'},
  {'4', '5', '6', 'B'},
  {'7', '8', '9', 'C'},
  {'*', '0', '#', 'D'}
};

byte colPins[ROWS] = {5, 4, 3, 2};
byte rowPins[COLS] = {9, 8, 7, 6};

// NeoPixel
const int ledPin = 13;
const int ledNum = 6;

Adafruit_NeoPixel strip = Adafruit_NeoPixel(ledNum, ledPin, NEO_GRB + NEO_KHZ800);

Keypad customKeypad = Keypad(makeKeymap(hexaKeys), rowPins, colPins, ROWS, COLS);

void setup() {
  Serial.begin(9600);
  pinMode(buttonPin, INPUT);
  pinMode(triggerPin, OUTPUT);
  pinMode(echoPin, INPUT);

  strip.begin();

  for (int i = 0; i < ledNum; i++) {
    strip.setPixelColor(i, strip.Color(255, 255, 255));
  }
  strip.show();
}

void loop() {
  int buttonState = digitalRead(buttonPin);

  digitalWrite(triggerPin, LOW);
  delayMicroseconds(2);
  digitalWrite(triggerPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(triggerPin, LOW);

  long duration = pulseIn(echoPin, HIGH);
  int distance = duration * 0.034 / 2;

  // Update LED strip based on distance
  if (distance < 10) {
    for (int i = 0; i < ledNum; i++) {
      strip.setPixelColor(i, strip.Color(255, 0, 0));
    }
    strip.show();
    Serial.println("us,1");
  } else {
    for (int i = 0; i < ledNum; i++) {
      strip.setPixelColor(i, strip.Color(255, 255, 255));
    }
    strip.show();
  }

  // Read the pushed button
  if (buttonState != previousButtonState) {
    if (buttonState == HIGH) {
      Serial.println("b,1");
    } else {
      Serial.println("b,0");
    }
  }

  char keypadValue = customKeypad.getKey();
  if (keypadValue) {
    Serial.println("num," + String(keypadValue));
  }

  previousButtonState = buttonState;
}
