// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let shape;
let stars = [];
let img;

function preload() {
  img = loadImage("galaxy.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  angleMode(DEGREES)
;
}

function draw() {
  background(200);

  // Enable orbiting with the mouse.
  orbitControl();

  drawBuilding();
}

function drawBuilding() {
  // start drawing shape
  beginShape();

  vertex(10, 10);
  vertex(90, 10);
  vertex(90, 90);
  vertex(10, 90);

  endShape(CLOSE);

}