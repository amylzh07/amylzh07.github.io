// Connected Nodes OOP

let points = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  let somePoint = new MovingPoint(width / 2, height / 2);
  points.push(somePoint);
}

function draw() {
  background(50);

  // draw lines first
  for (let point of points) {
    point.update();
    point.connectTo(points);
  }

  // draw circles afterwards to be on top
//  for (let point of points) {
//    point.display();
//  }
}

function mousePressed() {
  let somePoint = new MovingPoint(mouseX, mouseY);
  points.push(somePoint);
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
    this.reach = 150;
    this.minRadius = 25;
    this.maxRadius = 70;
  }

  display() {
    noStroke();
    fill(this.color);
    circle(this.x, this.y, this.radius);
  }

  update() {
    this.move();
    this.wrapAroundScreen();
    this.adjustSizeWithMouse();
  }

  connectTo(pointsArray) {
    for (let otherPoint of pointsArray) {
      // avoid drawing line with self
      if (this !== otherPoint) {
        let pointDistance = dist(this.x, this.y, otherPoint.x, otherPoint.y);
        if (pointDistance < this.reach) {
          stroke(this.color);
          line(this.x, this.y, otherPoint.x, otherPoint.y);
        }
      }
    }
  }

  adjustSizeWithMouse() {
    let mouseDistance = dist(this.x, this.y, mouseX, mouseY);


    if (mouseDistance < this.reach) {
      this.radius = map(mouseDistance, 0, this.reach, this.maxRadius, this.minRadius);
    }
    else {
      this.radius = this.minRadius;
    }
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
      this.x -= width;
    }
    if (this.x < 0) {
      this.x += width;
    }
    if (this.y > height) {
      this.y -= height;
    }
    if (this.y < 0) {
      this.y += height;
    }
  }
}