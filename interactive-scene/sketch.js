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

  angleMode(DEGREES);
}

function draw() {
  background(200);

  // enable orbiting with mouse
  orbitControl();

}

// create class of star
class Star {
  constructor() {
    this.posX = random(-windowWidth, windowWidth);
    this.posY = random(-windowHeight, windowHeight);
    this.size = random(1, 5);
  }

  display() {
    fill(255);
    sphere(this.size);
  }
}

// create class of planet
class Planet {
  constructor() {
    this.posX = random(-windowWidth, windowWidth);
    this.posY = random(-windowHeight, windowHeight);
    this.size = random(10, 15);
    this.color = random();
  }

  display() {
    fill(this.color);
    sphere(this.size);
  }
}