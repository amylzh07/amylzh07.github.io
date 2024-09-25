// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let shape;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  
  shape = buildGeometry(createShape); 
}

function createShape() {
  
}

function draw() {
  background(200);

  // Enable orbiting with the mouse.
  orbitControl();

  model(shape);

}