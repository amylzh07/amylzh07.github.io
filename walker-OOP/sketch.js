// Walker OOP Demo

class Walker {
  constructor(x, y, theColor) {
    this.x = x;
    this.y = y;
    this.speed = 8;
    this.radius = 3;
    this.color = theColor;
  }

  display() {
    noStroke();
    fill(this.color);
    circle(this.x, this.y, this.radius * 2);
  }

  move() {
    let choice = random(100);
    if (choice < 25) {
      // up
      this.y -= this.speed;
    }
    else if (choice < 50) {
      // down
      this.y += this.speed;
    }
    else if (choice < 75) {
      // left
      this.x -= this.speed;
    }
    else {
      // right
      this.x += this.speed;
    }
  }
}

let amy;
let joti;

function setup() {
  createCanvas(windowWidth, windowHeight);
  amy = new Walker(width / 2, height / 2, "pink");
  joti = new Walker(200, 300, "blue");
}

function draw() {
  amy.move();
  joti.move();

  amy.display();
  joti.display();
}
