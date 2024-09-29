// Interactive Galaxy
// Amy L Zhang
// October 1, 2024
//
// Extra for Experts:
// - implemented 3D using WEBGL
// - explored lighting and rotation using WEBGL 3D

// To-Do list by priority:
// 1. finish keyboard triggers
// 2. texture and light rendering for sun glow, stars glow
// 3. comets animate

let shape;
let stars = [];
let planets = [];
let comets = [];
let planetTexture;
let angle;
let orbitState = "stationary";

function preload() {
  planetTexture = loadImage("planettexture.jpg"); 
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  // create array with stars
  for (let i = 0; i < 500; i++) {
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

  // draw Sun in center
 // emissiveMaterial("yellow");
  fill("yellow");
  noStroke()
  sphere(200);

}

function drawCustomSphere(x, y, z, radius){
  push(); // enter local coordinate system
  translate(x, y, z);
  noStroke();
  sphere(radius);
  pop(); // exit local coordinate system (back to global coordinates)
}

function keyPressed () {
  if (keyCode === 32) { // change keys
    orbitState = "orbit";
  }
  else if (keyCode === 13) {  // change keys
    orbitState = "stationary";
  }
}

function mouseClick() {
  comets.push(new Comet);
  for (let comet of comets) {
    comet.display();
  }
}

// create class for stars
class Star {
  constructor() {
    this.posX = random(-windowWidth, windowWidth);
    this.posY = random(-windowHeight, windowHeight);
    this.posZ = random(-5000, 5000);
    this.size = random(5, 15);
    this.brightness = random(185, 255);
  }

  display() {
    fill(this.brightness);
    drawCustomSphere(this.posX, this.posY, this.posZ, this.size)
    this.size += random(-0.8, 0.8);
    this.brightness += random(-50, 50);

    if (dist(this.x, mouseX) < 50) {
      this.brightness = 255;
    }
    else {
      this.brightness = random(185, 255);
      fill(this.brightness);
    }
  }
}

// create class for planets
class Planet {
  constructor() {
    this.posX = random(-windowWidth, windowWidth);
    this.posY = random(-windowHeight, windowHeight);
    this.posZ = random(-5000, 5000);
    this.size = random(100, 150);
    this.color = color(random(200), random(200), random(200));
  }

  display() {
    tint(this.color);
    texture(planetTexture);
    drawCustomSphere(this.posX, this.posY, this.posZ, this.size);
    
    if (orbitState === "orbit") {
      angle = frameCount * 0.01; // change to addition because 0 * something is still 0
      rotateX(angle);
    }
  }
}

// create class for shooting stars
class Comet {
  constructor() {
    this.posX = mouseX
    this.posY = mouseY
    this.posZ = random(-5000, 5000);
    this.size = random(25, 50);
  }

 // display() {
 // }
}