let count = 0;

function setup() {
  createCanvas(400, 400);
  background(255, 255, 102);
  noStroke();
  frameRate(10);
}

function draw() {
  if (count < 100) {
    let x = random(width);
    let y = random(height);
    let size = random(10, 50);

    let colors = [
      color(255),      
      color(0),         
      color(255, 0, 0)  
    ];
    let randomColor = random(colors);
    fill(randomColor);

    ellipse(x, y, size, size);

    count++;
  }
}
