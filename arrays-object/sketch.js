// Arrays and Object Notation Assignment
// Amy (Lening) Zhang
// October 21, 2024
//
// Extra for Experts:
// - Implemented a basic 3D collision framework between the Character and the Keys
// - Applied a simple gravity function to allow for "jumping"
// - Used "camera" function to provide perspective for player

// numerical variables
let gravity = 0.5;
let accel = 10;
let theGround = 5; // add offset to have box fully on surface
let keyWidth = 30;
let keyHeight = 100;

// arrays to store objects, sounds, indexes, etc.
let theCharacter = [];
let whiteKeys = [];
let blackKeys = [];
let blackKeySpaces = [1, 2, 4, 5, 6]; // accounts for no black keys between E and F, B and C
let whiteKeySounds = [];
let blackKeySounds = [];

// preload sounds and push into arrays
function preload() {
  whiteKeySounds.push(loadSound("assets/piano_key_C.mp3"));
  whiteKeySounds.push(loadSound("assets/piano_key_D.mp3"));
  whiteKeySounds.push(loadSound("assets/piano_key_E.mp3"));
  whiteKeySounds.push(loadSound("assets/piano_key_F.mp3"));
  whiteKeySounds.push(loadSound("assets/piano_key_G.mp3"));
  whiteKeySounds.push(loadSound("assets/piano_key_A.mp3"));
  whiteKeySounds.push(loadSound("assets/piano_key_B.mp3"));

  blackKeySounds.push(loadSound("assets/piano_key_Aflat.mp3"));
  blackKeySounds.push(loadSound("assets/piano_key_Bflat.mp3"));
  blackKeySounds.push(loadSound("assets/piano_key_Dflat.mp3"));
  blackKeySounds.push(loadSound("assets/piano_key_Eflat.mp3"));
  blackKeySounds.push(loadSound("assets/piano_key_Gflat.mp3"));
}

// create character and spawn keys into array
function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  for (let i = 0; i < 1; i++) {
    theCharacter.push(new Character());
  }

  spawnKeys();
}

function draw() {
  background(0);
  
  // add pointLight for ambience
  pointLight(255, 255, 255, 0, -200, 100);

  // add camera for perspective
  camera(0, -200, 200, 0, 0, 0, 0, 1, 0);

  // draw flat surface
  push();
  translate(0, windowHeight / 2, 0);
  fill(140, 140, 255);
  box(width, height);
  pop();

  // display character
  for (let character of theCharacter) {
    character.display();
    character.move();
    character.addGravity();
  }
 
  // display white and black keys
  showWhiteKeys();
  showBlackKeys();

  // check collisions
  for (let character of theCharacter) {
    for (let i = 0; i < whiteKeys.length; i++) {
      checkCollision(character, whiteKeys[i], i, "white");
    }
    for (let i = 0; i < blackKeys.length; i++) {
      checkCollision(character, blackKeys[i], i, "black");
    }
  }
}

// create Character class
class Character {
  constructor() {
    this.posX = 0;
    this.posY = theGround;
    this.posZ = keyHeight;
    this.dx = 5;
    this.dy = 0;
    this.dz = 5;
    this.isJumping = false;
  }

  display() {
    push();
    translate(this.posX, -this.posY, this.posZ);
    normalMaterial();
    box(10, 10, 10);
    pop();
  }

  move() {
    if (keyIsDown(83)) { // move further (Z-axis)
      this.posZ += this.dz;
    }
    else if (keyIsDown(87)){ // move closer (Z-axis)
      this.posZ -= this.dz;
    }
    else if (keyIsDown(68)){ // move right (X-axis)
      this.posX += this.dx;
    }
    else if (keyIsDown(65)){ // move left(X-axis)
      this.posX -= this.dx;
    }

    // jump function
    if (keyIsDown(32) && !this.isJumping) {
      this.isJumping = true;
      this.dy = accel;
    }
  }

  // implement gravitational influence
  addGravity() {
    if (this.isJumping) {
      this.dy -= gravity;
      this.posY += this.dy;

      // return to ground level
      if (this.posY <= theGround) {
        this.isJumping = false;
        this.dy = 0;
        this.posY = theGround;
      }
    }
  }
}

// check collisions
function checkCollision(character, key, index, keyType) {
  let keyTop = key.y + key.h / 8;
  let keyBottom = key.y - key.h / 2;
  let keyXStart = key.x - key.w / 2;
  let keyXEnd = key.x + key.w / 2;

  // boolean to check whether within certain area
  if (character.posY <= keyTop && character.posY >= keyBottom 
    && character.posX > keyXStart && character.posX < keyXEnd
    && character.posZ <= keyHeight / 2 && character.posZ >= -keyHeight / 2) {

    // change where ground is
    theGround = keyTop;
    character.isJumping = false;
    character.dy = 0;

    // play key sound
    if (keyType === 'white') {
      if (!whiteKeySounds[index % 7].isPlaying()) {
        whiteKeySounds[index % 7].play();
      }
    }
    
    // play key sound
    else if (keyType === 'black') {
      if (!blackKeySounds[index % 5].isPlaying()) {
        blackKeySounds[index % 5].play();
      }
    }
  } 
  
  else {
    theGround = 5;
  }
}

// spawn keys 
function spawnKeys() {  
  let totalWidth = 15 * keyWidth;

  for (let i = 0; i < 15; i++) {
    let whiteKey = {
      x: (i * keyWidth) - (totalWidth / 2), // centering
      y: keyHeight / 4,
      z: 0,
      w: keyWidth,
      h: keyHeight,
      color: 255, // white color
    };
    whiteKeys.push(whiteKey);
  }

  for (let i = 0; i < 15; i++) {
    if (blackKeySpaces.includes(i % 7)) {
      let blackKey = {
        x: (i * keyWidth) - (totalWidth / 2) + keyWidth, // centering
        y: 0,
        z: -10,
        w: keyWidth * 0.6,
        h: keyHeight * 0.67,
        color: 0, // black color
      };
      blackKeys.push(blackKey);
    }
  }
}

// show keys
function showWhiteKeys() {
  for (let key of whiteKeys) {
    fill(key.color);
    noStroke();
    push();
    translate(key.x, key.y, key.z);
    box(key.w, key.h);
    pop();
  }
}

// show keys
function showBlackKeys() {
  for (let key of blackKeys) {
    fill(key.color);
    noStroke();
    push();
    translate(key.x, key.y, key.z);
    box(key.w, key.h);
    pop();
  }
}