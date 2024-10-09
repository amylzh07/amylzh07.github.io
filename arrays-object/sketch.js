// Arrays and Object Notation Assignment
// Amy (Lening) Zhang
// October 21, 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let posZ = 100;
let posX = 100;
let dx = 15;
let dz = 15;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
}

function draw() {
  background(0);
  //  box(windowWidth, windowHeight);

  box(100, 100);
  translate(posX, 0, posZ);
  moveCharacter();
}

function moveCharacter() {
  if (keyIsDown(87)) { // move further (Z-axis)
    posZ += dz;
  }
  else if (keyIsDown(83)){ // move closer (Z-axis)
    posZ -= dz;
  }
  else if (keyIsDown(68)){ // move right (X-axis)
    posX += dx;
  }
  else if (keyIsDown(65)){ // move left(X-axis)
    posX -= dx;
  }
}

// translate while moving. when stopped and displaying, push()