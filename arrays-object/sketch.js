// Arrays and Object Notation Assignment
// Amy (Lening) Zhang
// October 21, 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let posZ = 0;
let posX = 0;
let dx = 5;
let dz = 5;



function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
}

function draw() {
  orbitControl();

  background(0);
  push();
  translate(0, windowHeight / 2, 0);
  fill(220);
  box(windowWidth, windowHeight);
  pop();

  fill(0);
  translate(posX, 0, posZ);
  box(10, 10);

  moveCharacter();

}

function moveCharacter() {
  if (keyIsDown(83)) { // move further (Z-axis)
    posZ += dz;
  }
  else if (keyIsDown(87)){ // move closer (Z-axis)
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