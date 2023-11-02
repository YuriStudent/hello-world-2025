// 필요한 변수 선언
let love1;
let love2;
let heart;
let pinkLove = false;
let sound;
let gameStarted = true; // 게임이 처음부터 시작됨
let spacebarPressCount = 0;

function preload() {
  sound = loadSound('Disco.mp3');
}

function setup() {
  createCanvas(400, 400);
  background(0);

  love1 = new Love(width / 4, height / 2);
  love2 = new Love(3 * width / 4, height / 2);
  heart = new Heart(width / 2, height / 2);

  // 'esc' 키를 누르면 게임을 새로고침
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      location.reload();
    }
  });
}

function draw() {
  if (gameStarted) {
    if (pinkLove) {
      background(random(255), random(255), random(255));
      heart.setHeartSymbol("❤");
      if (!sound.isPlaying()) {
        sound.jump(0); // 음악을 처음으로 되감기
        sound.play();
      }
    } else {
      background(0);
      heart.setHeartSymbol("♡");
      if (sound.isPlaying()) {
        sound.pause();
      }
    }

    love1.show();
    love2.show();
    heart.show();
  }
}

function keyPressed() {
  if (keyCode === 32) {
    spacebarPressCount++;
    if (spacebarPressCount >= int(random(1, 31))) { // int() 함수를 사용하여 소수를 정수로 변환
      spacebarPressCount = 0; // 스페이스바를 누르면 처음으로 돌아가도록 설정
      pinkLove = true;
      heart.bouncing = true;
    }
  }
  return false; // 스페이스바 이벤트를 처리하고 페이지 새로고침을 막음
}

function toggleGame() {
  gameStarted = !gameStarted;
  spacebarPressCount = 0;
  pinkLove = false;
}

// Love 클래스 정의
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
    let smallCircleX = this.x + map(mouseX, 0, width, -this.size / 6, this.size / 6);
    let smallCircleY = this.y + map(mouseY, 0, height, -this.size / 6, this.size / 6);
    ellipse(smallCircleX, smallCircleY, this.size / 3);
  }

  changeColor(newColor) {
    this.color = newColor;
  }
}

// Heart 클래스 정의
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
