// Interactive Galaxy
// Amy L Zhang
// October 1, 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let shape;
let stars = [];
let planets = [];

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  // create array with stars
  for (let i = 0; i < 100; i++) {
    stars.push(new Star());
  }

  // create array with planets
  for (let i = 0; i < 15; i++) {
    planets.push(new Planet());
  }

  angleMode(DEGREES);
}

function draw() {
  background(0);

  // enable orbiting with mouse
  orbitControl();

  for (let star of stars) {
    star.display();
  }

  for (let planet of planets) {
    planet.display();
  }
}

function drawSphere(x, y, z, radius){
  push(); // enter local coordinate system
  translate(x, y, z);
  noStroke();
  sphere(radius);
  pop(); // exit local coordinate system (back to global coordinates)
}

// create class of star
class Star {
  constructor() {
    this.posX = random(-windowWidth, windowWidth);
    this.posY = random(-windowHeight, windowHeight);
    this.posZ = random(-5000, 5000);
    this.size = random(10, 25);
  }

  display() {
    fill(255);
    drawSphere(this.posX, this.posY, this.posZ, this.size);
  }
}

// create class of planet
class Planet {
  constructor() {
    this.posX = random(-windowWidth, windowWidth);
    this.posY = random(-windowHeight, windowHeight);
    this.posZ = random(-5000, 5000);
    this.size = random(100, 150);
    this.color = random(50, 255);
  }

  display() {
    fill(this.color);
    drawSphere(this.posX, this.posY, this.posZ, this.size);
  }
}