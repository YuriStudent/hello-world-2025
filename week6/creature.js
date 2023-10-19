let love1;
let love2;
let heart;
let pinkLove = false;
let clickCount = 0;

function setup() {
  createCanvas(400, 400);
  background(0);

  love1 = new Love(width / 4, height / 2);
  love2 = new Love(3 * width / 4, height / 2);
  heart = new Heart(width / 2, height / 2);
}

function draw() {
  background(0);

  love1.show();
  love2.show();

  if (pinkLove) {
    love1.changeColor(color(254, 127, 156));
    love2.changeColor(color(254, 127, 156));
  }

  heart.show();
}

function mousePressed() {
  if (heart.contains(mouseX, mouseY)) {
    heart.clicked();
  }
}

class Love {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 20;
    this.color = color(0);
    this.strokeEnabled = true;
  }

  show() {
    fill(this.color);
    stroke(255);
    if (this.strokeEnabled) {
      ellipse(this.x, this.y, this.size);
    } else {
      ellipse(this.x, this.y, this.size);
    }
  }

  changeColor(newColor) {
    this.color = newColor;
  }
}
class Heart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 20;
    this.clickedCount = 0;
    this.bouncing = false;
  }

  show() {
    fill(255, 0, 0);
    noStroke();
    textSize(this.size);
    text("❤", this.x, this.y);

    // Add bouncing effect if pinkLove is true
    if (this.bouncing) {
      this.y += Math.sin(frameCount / 5) * 2; // Adjust the division value for speed
    }
  }

  contains(px, py) {
    let d = dist(px, py, this.x, this.y);
    return d < this.size;
  }

  clicked() {
    this.clickedCount++;
    if (this.clickedCount >= 10) {
      pinkLove = !pinkLove;
      this.bouncing = pinkLove; // Start or stop bouncing when pinkLove is true or false
    }
  }
}