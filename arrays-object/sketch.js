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
let accel = -5;
let gravity = 9.8;


let theKeyboard = [];

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  for (let i = 0; i < 15; i++) {
    spawnKeyboard(i);
  }
}

function draw() {
  orbitControl();

  background(0);
  push();
  translate(0, windowHeight / 2, 0);
  fill(255);
  box(windowWidth, windowHeight);
  pop();

  fill(0);
  translate(posX, 0, posZ);
  box(10, 10);

  moveCharacter();
  jumpCharacter();

  showKeyboard();

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

function jumpCharacter() {

}

function checkCollision() {

// function checkCollision() {
//  if (redCubeBB.intersectsBox(blackCubeBB)) {
//    blackCube.material.transparent = true;
//    blackCube.material.opacity = 0.5;
//    blackCube.material.color = new THREE.Color(Math.random * 0xffffff);
//  } else {
//    blackCube.material.opacity = 1;
//  }
}

// Adding checkCollision() method in our animate() function
//function animate() {
//checkCollision()
//requestAnimationFrame(animate);
//renderer.render(scene, camera);
//}
//animate();

function spawnKeyboard(position) {
  let someKey = {
    x: 15,
    y: 50,
    pos: position,
  };
  theKeyboard.push(someKey);
}

function showKeyboard() {
  for (let key of theKeyboard) {
    fill(200, 0, 0);
    noStroke();
    push();
    translate(0 + key.x * key.pos, 20, 20);
    box(key.x, key.y);
    pop();
  }
}


// add acceleration to dy
// uses frame refresh to add 9.8

// translate while moving. when stopped and displaying, push()