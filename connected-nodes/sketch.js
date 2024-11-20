// Connected Nodes OOP

let points = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  let somePoint = new MovingPoint(width / 2, height / 2);
  points.push(somePoint);
}

function draw() {
  background(50);
  for (let point of points) {
    point.wrapAroundScreen();
    point.move();
    point.display();
  }
}

function mousePressed() {
  let newPoint = new MovingPoint(mouseX, mouseY);
  points.push(newPoint);
}

class MovingPoint {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 5;
    this.radius = 25;
    this.color = color(random(525), random(255), random(255));
    this.xTime = random(1000);
    this.yTime = random(1000);
    this.deltaTime = 0.01;
  }
  display() {
    noStroke();
    fill(this.color);
    circle(this.x, this.y, this.radius);
  }
  move() {
    // pick random direction of movement
    let dx = noise(this.xTime);
    let dy = noise(this.yTime);
   
    // scale to movement speed
    this.dx = map(dx, 0, 1, -this.speed, this.speed);
    this.dy = map(dy, 0, 1, -this.speed, this.speed);

    // move the point
    this.x += this.dx;
    this.y += this.dy;

    // move on the time axis
    this.xTime += this.deltaTime;
    this.yTime += this.deltaTime;
  }
  wrapAroundScreen() {
    // wrap around screen if you fall off
    if (this.x > width) {
      this.x = 0;
    }
    if (this.x < 0) {
      this.x = width;
    }
    if (this.y > height) {
      this.y = 0;
    }
    if (this.y < 0) {
      this.y = height;
    }
  }
}