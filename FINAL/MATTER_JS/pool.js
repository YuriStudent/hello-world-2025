// p5js setup
let portName = "/dev/tty.usbmodem2101"; // Replace with your own port
let serial;
let inString = "";
let world;
let x_pos = 0; // Variable to hold the x position
let y_pos = 0; // Variable to hold the y position
let clicked = false; // Variable to hold the click state
let stage = 0;
let inputs = [];
let capturenum = 0;

let luckyNumber = 0; // 0 ~ 15
let luckyBalls = [];
let messages = [
  "Debug your finals, enjoy a sensor-network magic holiday!",
  "Flawless prototypes and error-free holidays!",
  "Shine like an RGB LED, relax like a successful user test.",
  "Perfect circuits and flicker-free holiday lights. Happy Holidays!",
  "Happy holiday! May 2024 be as awesome as a canceled Zoom meeting.",
  "Cash-filled wallets and cookie-filled bellies this season.",
  "Good luck galore, like ugly sweaters at Christmas parties!",
  "Happy Holidays! Huge happiness, tiny bills.",
  "Holidays: wallet worries aside.",
  "Drop stress like unread emails this season.",
  "Cheerful wallet, lucky heart this holiday. Spread the spirit!",
  "#EmojiExtravaganza: Holidays filled with luck and emojis!",
  "Merry holidays, full wine glass, fabulous 'plus one.",
  "Lit Hinge matches for a sparkling New Year!",
  "Here's to Hinge dates matching your 2024 vibe!",
  "Make your Hinge profile outshine Christmas lights.",
];
let images = [];
let luckImages = [];
let customFont; // Declare customFont at the top

const NUM_ORNAMENTS = 12;

function preload() {
  customFont = loadFont("public/font/IBMPlexMono-Regular.ttf"); // Load the custom font
  for (let i = 0; i < NUM_ORNAMENTS; i++) {
    images.push(loadImage(`public/ornaments/or_${i + 1}.png`));
  }

  for (let i = 0; i < 16; i++) {
    luckImages.push(loadImage(`public/numbers/Num_${i + 1}.png`));
  }
}

function polygon(x, y, radius, npoints) {
  let angle = TWO_PI / npoints;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

// Function to draw a star
function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

// matter js setup
var Engine = Matter.Engine,
  World = Matter.World,
  Render = Matter.Render,
  Runner = Matter.Runner,
  Body = Matter.Body,
  Bodies = Matter.Bodies,
  Texture = Matter.Texture,
  Composite = Matter.Composite;

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}

function setup() {
  // Serial setup
  serial = new p5.SerialPort(); // Make a new instance of the serialport library
  serial.on("list", printList); // Callback to list all the ports
  serial.on("connected", serverConnected); // Callback for connecting to server
  serial.on("open", portOpen); // Callback to check port opening
  serial.on("data", serialEvent); // Callback for when new data arrives
  serial.on("error", serialError); // Callback for errors
  serial.on("close", portClose); // Callback for the port closing

  serial.list(); // List the serial ports
  serial.open(portName); // Open a serial port

  //serialEvent();

  let canvas = createCanvas(window.innerWidth, window.innerHeight);
  canvas.id("canvas");

  engine = Engine.create();
  world = engine.world;
  world.gravity.scale = 0.0005;

  var ceil = Bodies.rectangle(width / 2, -10, width + 100, 20, {
    restitution: 0.8,
    isStatic: true,
    label: "-4",
  });
  World.add(world, ceil);

  var ground = Bodies.rectangle(width / 2, height + 10, width + 100, 20, {
    restitution: 0.8,
    isStatic: true,
    label: "-4",
  });
  World.add(world, ground);

  var leftWall = Bodies.rectangle(-10, height / 2, 20, height, {
    restitution: 0.8,
    isStatic: true,
    label: "-4",
  });
  World.add(world, leftWall);

  var rightWall = Bodies.rectangle(width + 10, height / 2, 20, height, {
    restitution: 0.8,
    isStatic: true,
    label: "-4",
  });

  World.add(world, rightWall);

  // create 20 objects
  for (let i = 0; i < 20; i++) {
    let ball = Bodies.circle(
      random(width),
      random(height / 2),
      random(30, 80),
      {
        restitution: 0.8,
        frictionAir: 0.01,
        label: String(getRandomInt(1, NUM_ORNAMENTS + 1)),
      }
    );

    World.add(world, ball);
  }

  // lucky number balls
  for (let i = 0; i < 3; i++) {
    let circle = Bodies.circle(random(width), random(height / 2), 100, {
      restitution: 0.8,
      frictionAir: 0.01,
      label: "777",
    });

    luckyBalls.push(circle);
  }

  // if clicked set stage to 1
  window.addEventListener("click", () => {
    stage += 1;

    switch (stage) {
      case 1:
        world.gravity.scale = 0;
        world.gravity.x = 0;
        world.gravity.y = 0;
        for (body of world.bodies) {
          Body.setVelocity(body, {
            x: random(-7, 7),
            y: random(-7, 7),
          });

          // 100% restitution
          body.restitution = 1;

          // zero air friction
          body.frictionAir = 0;
        }
        break;
      case 2:
        world.gravity.scale = 0.001;
        world.gravity.x = 0;
        world.gravity.y = 1;
        for (body of world.bodies) {
          // 80% restitution
          Body.setVelocity(body, {
            x: 0,
            y: 0.1,
          });
          body.restitution = 0;

          // 1% air friction
          body.frictionAir = 0.01;
        }

        // pick a lucky number
        luckyNumber = getRandomInt(1, 16 + 1);
        message = messages[luckyNumber - 1];

        // add lucky balls
        for (let i = 0; i < 3; i++) {
          World.add(world, luckyBalls[i]);
        }

        break;

      case 3:
        stage = 0;
        for (let i = 0; i < 3; i++) {
          World.remove(world, luckyBalls[i]);
        }

        break;
    }
    // console.log("Current stage: " + stage);
  });

  Matter.Runner.run(engine);
}
function serialEvent() {
  // read a String from serial port
  // until you get carriage return and newline:
  inString = serial.readStringUntil("\r\n"); // store in a variable

  //check to see that there's actually a string:

  inputs = split(inString, ","); // split the value by commas, put into array
  // if (inputs.length > 1) {      // if there are two or more elements
  //    console.log(inputs[0], inputs[1]);     // print the input values
  // // extra code for mapping & storing
  // }
}

// CK: NEW FUNCTIONS to switch state
function resetGame() {
  console.log("Resetting game...");
  // Add your game reset logic here
}

function showMessageForNumber(number) {
  console.log(`Showing message for number: ${number}`);
  // Add your message display logic here
}

function handleUltrasonicReading(distance) {
  console.log(`Ultrasonic reading: ${distance}`);
  // Add your ultrasonic reading handling logic here
}

function draw() {
  console.log(inputs);
  background(0, 0, 0);
  let bodyMargin = 10;
  let fontSize = 54;
  let lineMargin = 10;
  let boxWidth = 1280;
  let boxHeight = 120;
  for (let i = 0; i < world.bodies.length; i++) {
    let body = world.bodies[i];

    let label = parseInt(body.label);

    noStroke();

    let xPos = body.position.x;
    let yPos = body.position.y;

    push();
    translate(xPos, yPos);
    rotate(body.angle);
    if (label > 0 && label < 777) {
      // tilt the ornament
      image(
        images[label - 1],
        -body.circleRadius - bodyMargin,
        -body.circleRadius - bodyMargin,
        body.circleRadius * 2 + bodyMargin * 2,
        body.circleRadius * 2 + bodyMargin * 2
      );
    } else if (label === 777 && stage === 2) {
      image(
        luckImages[luckyNumber - 1],
        -body.circleRadius - bodyMargin,
        -body.circleRadius - bodyMargin,
        body.circleRadius * 2 + bodyMargin * 2,
        body.circleRadius * 2 + bodyMargin * 2
      );
    }
    // translate(-xPos, -yPos);

    pop();

    fill(255);
    textSize(fontSize);
    textAlign(CENTER, CENTER);

    switch (stage) {
      case 0:
        textFont(customFont); // Apply custom font
        text("Hi!", width / 2, height / 2 - fontSize - lineMargin);
        text("Put your hand in the box", width / 2, height / 2);
        text(
          "and pick your Lucky Number!",
          width / 2,
          height / 2 + fontSize + lineMargin
        );

        break;

      case 1:
        textFont(customFont); // Apply custom font
        text(
          "Pick a your Lucky Number",
          width / 2,
          height / 2 - fontSize - lineMargin
        );
        text("in the box", width / 2, height / 2);
        break;
      case 2:
        fill(255);
        rect(
          width / 2 - boxWidth / 2,
          height / 2 - boxHeight / 2,
          boxWidth,
          boxHeight
        );
        fill(0,81,130); // Set text color
        textSize(30); // Set text size
        textFont(customFont); // Apply custom font
        text(message, width / 2, height / 2);
    }
  }

  // console.log("0:"+inputs[0]);
  // console.log("1:"+inputs[1]);
  // console.log("2:"+inputs[2]);

  Engine.update(engine);
  //console.log("Current stage: " + stage);
  //console.log(sensors[0],sensors[1],sensors[2]);
  let inString = serial.readStringUntil("\r\n");
  //console.log(inString);
  //serial.write("x");
  if (inString !== "hello") {
    // If you get hello, ignore it
    // Split the string on the commas:
    let sensors = inString.split(","); // b,1 us,value num,value
    console.log(sensors)
    if (sensors.length === 2) {
      let whichSensor = sensors[0].trim();
      let val = sensors[1].trim();
      // CK: Let's use a switch statement because that is what your other game logic is using
      // I made these functions above resetGame, showMessageForNumber, handleUltrasonicReading
      // put your logic in there
      switch (whichSensor) {
        case "b":
          if (val === "1") resetGame();
          break;
        case "num":
          showMessageForNumber(val);
          break;
        case "us":
          handleUltrasonicReading(parseInt(val, 10));
          break;
      }
    }

    // CK: Let's move away from this code
    // it getting too hard to follow
    // see above for a switch statement
    // if (inputs.length > 1) {
    //   if (inputs[0] === 1) {
    //     stage = 1;
    //   } else if (inputs[1] === 1) {
    //     stage = 2;
    //    } else if (inputs[2] !== 0) {
    //      luckyNumber = inputs[2]; // keypad
    //      stage = 3;
    //   }

    // if (inString) {
    //   // console.log(inString);
    //   if (inString !== "hello") { // If you get hello, ignore it
    //       // Split the string on the commas:
    //       let sensors = split(inString, ",");
    //       let whichSensor = sensors[0]; // b, us, num
    //       let val = parseInt(sensors[1]); // value from the sensor
    //       console.log(whichSensor, typeof(val))

    //       if (sensors.length > 1) {
    //         // Check the sensor type and value to determine the stage
    //           if (whichSensor === 'b') { // Button press
    //             console.log("button", whichSensor, val)
    //               if (val === 1 && stage > 0) {
    //                   stage = 0; // Start or reset stage
    //               }
    //           } else if (whichSensor === 'us' && stage === 0) { // Ultra sonic sensor
    //             console.log("ultrasonic", val);
    //               if (val === 1  && stage === 1) {
    //                   stage = 1; // Set stage to 2
    //               }
    //           } else if (whichSensor === 'num' && stage === 2) { // Keypad
    //             console.log("number", val);
    //               // the value from the keypad is always a number
    //               luckyNumber = parseInt(val); // Store the keypad value
    //               stage = 2; // Set stage to 3
    //           }

    // serial.write("x");
  }
}
// }

function printList(portList) {
  // PortList is an array of serial port names
  for (let i = 0; i < portList.length; i++) {
    // Display the list the console:
    // console.log("port " + i + ": " + portList[i]);
  }
}

function serverConnected() {
  console.log("Connected to server.");
}

function portOpen() {
  console.log("The serial port opened.");
}

function serialEvent() {
  // Read a String from serial port until you get carriage return and newline:
  // Store in a variable
  // Check to see that there's actually a string:
}

function serialError(err) {
  console.log("Something went wrong with the serial port. " + err);
}

function portClose() {
  console.log("The serial port closed.");
}
