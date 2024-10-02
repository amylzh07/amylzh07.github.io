// Interactive Galaxy
// Amy L Zhang
// October 1, 2024
//
// Extras for Experts:
// - implemented 3D using WEBGL, including adding lighitng, textures, rotation,
// and use of x-y axes alongside z-axis, allowing for incorporation of rotation
// - explored classes to store attributes for specific objects and displayed by
// iterating through an array
// - featured use of p5.js sound library for background music

let spaceSound;
let stars = [];
let planets = [];
let sun;
let planetTexture;
let solarTexture;
let starTexture;
let angle = 0;
let twinkle = 0;
let orbitState = "stationary";

function preload() {
  soundFormats('mp3');
  spaceSound = loadSound("spacesound.mp3");
  planetTexture = loadImage("planettexture.jpg"); 
  solarTexture = loadImage("solartexture.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  // create array with stars
  for (let i = 0; i < 800; i++) {
    stars.push(new Star());
  }

  // create array with planets
  for (let i = 0; i < 15; i++) {
    planets.push(new Planet());
  }

  angleMode(DEGREES);
}

// play background music
function mouseClicked() {
  spaceSound.play();
  spaceSound.loop(duration = 119);
}

function draw() {
  background(0);

  // mouse interacts with canvas perspective
  orbitControl();

  // show stars
  for (let star of stars) {
    star.display();
  }

  // show stars
  for (let planet of planets) {
    planet.display();
  }

  // display sun
  sun = new Sun();
  sun.display();
}

function drawCustomSphere(x, y, z, radius){
  push(); // enter new coordinates to randomize object position
  translate(x, y, z);
  noStroke();
  sphere(radius);
  pop(); // go back to original coordinates
}

// change between orbiting and stationary states
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
    this.posZ = random(-8000, 8000);
    this.size = random(1, 5);
    this.brightness = random(105, 185);
  }

  display() {
    tint(this.brightness);
    fill(255);
    drawCustomSphere(this.posX, this.posY, this.posZ, this.size);

    // twinkle effect
    this.size = this.size + sin(twinkle);
    twinkle += 0.1;
    this.brightness = this.brightness + sin(twinkle);

    // orbit movement
    if (orbitState === "orbit") {
      angle = frameCount * 0.0005;
      rotateY(angle);
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
    normalMaterial(this.color);
    pointLight(255, 255, 255, mouseX, mouseY, 0); // light follows mouse direction
    tint(this.color);
    texture(planetTexture);
    drawCustomSphere(this.posX, this.posY, this.posZ, this.size);

    // orbit movement
    if (orbitState === "orbit") {
      angle = frameCount * 0.0005;
      rotateY(angle);
    }
  }
}

// create class for Sun
class Sun {
  constructor() {
    this.posX = 0;
    this.posY = 0;
    this.posZ = 0;
    this.size = 200;
    this.brightness = 255;
  }

  display() {
    tint(this.brightness);
    fill("yellow");
    normalMaterial("yellow");
    texture(solarTexture);
    drawCustomSphere(this.posX, this.posY, this.posZ, this.size);
  }
}
