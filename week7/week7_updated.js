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
  if (pinkLove) {
    background(random(255), random(255), random(255));
  } else {
    background(0);
  }
  
  love1.show();
  love2.show();

  heart.show();

  if (pinkLove) {
    love1.changeColor(color(255, 51, 153));
    love2.changeColor(color(255, 51, 153));
    heart.setHeartSymbol("❤"); 
  } else {
    heart.setHeartSymbol("♡"); 
  }
}

function mousePressed() {
  if (!pinkLove && heart.contains(mouseX, mouseY)) {
    heart.clicked();
  }
}

class Love {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 20;
    this.color = color(255); 
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

    fill(0);
    noStroke(); 
   let smallCircleX = this.x + map(mouseX, 0, width, -this.size / 4, this.size / 4);
    let smallCircleY = this.y + map(mouseY, 0, height, -this.size / 4, this.size / 4);
    ellipse(smallCircleX, smallCircleY, this.size / 3); 
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
    this.heartSymbol = "♡";
  }

  show() {
    fill(255, 0, 0);
    noStroke();
    textSize(this.size);
    text(this.heartSymbol, this.x, this.y);

    if (this.bouncing) {
      this.y += Math.sin(frameCount / 5) * 2;
    }
  }

  contains(px, py) {
    let d = dist(px, py, this.x, this.y);
    return d < this.size;
  }

  clicked() {
    if (!pinkLove) {
      this.clickedCount++;
      if (this.clickedCount >= 10) {
        pinkLove = true;
        this.bouncing = true; 
      }
    }
  }

  setHeartSymbol(symbol) {
    this.heartSymbol = symbol;
  }
}