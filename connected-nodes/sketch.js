// Connected Nodes OOP

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
}

class MovingPoint {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 5;
    this.radius = 15;
    this.color = color(random(525), random(255), random(255));
  }
  display() {
    noStroke();
    fill(this.color);
    circle(this.x, this.y, this.radius);
  }
}