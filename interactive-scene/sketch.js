// Interactive Galaxy
// Amy L Zhang
// October 1, 2024
//
// Extra for Experts:
// - implemented 3D using WEBGL
// - explored lighting and rotation using WEBGL 3D

let shape;
let stars = [];
let planets = [];
let sun;
let planetTexture;
let solarTexture;
let starTexture;
let angle = 0;
let orbitState = "stationary";

function preload() {
  planetTexture = loadImage("planettexture.jpg"); 
  solarTexture = loadImage("solartexture.jpg");
//  starTexture = loadImage("startexture.jpg");
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

  sun = new Sun();

  sun.display();
}

function drawCustomSphere(x, y, z, radius){
  push(); // enter local coordinate system
  translate(x, y, z);
  noStroke();
  sphere(radius);
  pop(); // exit local coordinate system (back to global coordinates)
}

function keyPressed () {
  if (keyCode === 32) { // press space
    orbitState = "orbit";
  }
  else if (keyCode === 13) {  // press enter
    orbitState = "stationary";
  }
}

// create class for stars
class Star {
  constructor() {
    this.posX = random(-windowWidth, windowWidth);
    this.posY = random(-windowHeight, windowHeight);
    this.posZ = random(-5000, 5000);
    this.size = random(1, 3);
    this.brightness = random(105, 185);
  }

  display() {
    tint(this.brightness);
    fill(255);
    emissiveMaterial(20, 90, 144);
    drawCustomSphere(this.posX, this.posY, this.posZ, this.size);
    this.size += random(-0.8, 0.8);
    this.brightness += random(-50, 50);

    if (orbitState === "orbit") {
      angle += 1;
      rotateX(sin(angle));
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
    this.orbitSpeed = random(0.01, 0.03);
    this.angle = random(360);
  }

  display() {
    emissiveMaterial(this.color);
    pointLight(255, 255, 255, mouseX, mouseY, 200);
    tint(this.color);
    texture(planetTexture);
    drawCustomSphere(this.posX, this.posY, this.posZ, this.size);
    


    if (orbitState === "orbit") {
      this.angle += this.orbitSpeed;
    }

    let orbitX = this.posX + cos(this.angle) * this.size; // Orbit radius on X axis
    let orbitY = this.posY + sin(this.angle) * this.size; // Orbit radius on Y axis

    push();

    translate(orbitX, orbitY, this.posZ);
    rotateX(frameCount * 0.01);
    rotateY(frameCount * 0.01); 

    pop();

//    if (orbitState === "orbit") {
  //    angle += 1;
    //  rotateX(200 * sin(angle));
  //  }
  }
}

// create class for Sun
class Sun {
  constructor() {
    this.posX = 0;
    this.posY = 0;
    this.posZ = 0;
    this.size = 200;
  }

  display() {
    specularMaterial(255);
    texture(solarTexture);
    drawCustomSphere(this.posX, this.posY, this.posZ, this.size);
   // rotateY(frameCount * 0.01);
  }
}