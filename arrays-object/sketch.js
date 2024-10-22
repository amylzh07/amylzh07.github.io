// Arrays and Object Notation Assignment
// Amy (Lening) Zhang
// October 21, 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let gravity = 0.5;
let accel = 10;
let theGround = 0;

let theCharacter = [];
let whiteKeys = [];
let blackKeys = [];
let blackKeySpaces = [1, 2, 4, 5, 6]; // accounts for no black keys between E and F, B and C
let keyWidth = 30;
let keyHeight = 100;

let whiteKeySounds = [];
let blackKeySounds = [];

function preload() {
  whiteKeySounds.push(loadSound('assets/piano_key_C.mp3'));
  whiteKeySounds.push(loadSound('assets/piano_key_D.mp3'));
  whiteKeySounds.push(loadSound('assets/piano_key_E.mp3'));
  whiteKeySounds.push(loadSound('assets/piano_key_F.mp3'));
  whiteKeySounds.push(loadSound('assets/piano_key_G.mp3'));
  whiteKeySounds.push(loadSound('assets/piano_key_A.mp3'));
  whiteKeySounds.push(loadSound('assets/piano_key_B.mp3'));

  blackKeySounds.push(loadSound('assets/piano_key_Aflat.mp3'));
  blackKeySounds.push(loadSound('assets/piano_key_Bflat.mp3'));
  blackKeySounds.push(loadSound('assets/piano_key_Dflat.mp3'));
  blackKeySounds.push(loadSound('assets/piano_key_Eflat.mp3'));
  blackKeySounds.push(loadSound('assets/piano_key_Gflat.mp3'));
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  for (let i = 0; i < 1; i++) {
    theCharacter.push(new Character());
  }

  spawnKeys();
}

function draw() {
  background(0);

  pointLight(255, 255, 255, 0, -200, 100);

  camera(0, -200, 200, 0, 0, 0, 0, 1, 0);

  push();
  translate(0, windowHeight / 2, 0);
  fill(140, 140, 255);
  box(width, height);
  pop();

  for (let character of theCharacter) {
    character.display();
    character.move();
    character.addGravity();
  }
 
  showWhiteKeys();
  showBlackKeys();

  for (let character of theCharacter) {
    for (let i = 0; i < whiteKeys.length; i++) {
      checkCollision(character, whiteKeys[i], i, "white");
    }
    for (let i = 0; i < blackKeys.length; i++) {
      checkCollision(character, blackKeys[i], i, "black");
    }
  }
}

class Character {
  constructor() {
    this.posX = 0;
    this.posY = 0;
    this.posZ = 0;
    this.dx = 5;
    this.dy = 0;
    this.dz = 5;
    this.isJumping = false;  // tracking jump state
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

    if (keyIsDown(32) && !this.isJumping) {
      this.isJumping = true;
      this.dy = accel;
    }
  }

  addGravity() {
    if (this.isJumping) {
      this.dy -= gravity;
      this.posY += this.dy;

      if (this.posY <= theGround) {
        this.isJumping = false;
        this.dy = 0;
        this.posY = theGround;
      }
    }
  }
}

function checkCollision(character, key, index, keyType) {
  let keyTop = -key.y;
  let keyBottom = key.y;
  let keyXStart = key.x - key.x / 2;
  let keyXEnd = key.x + key.x / 2;
  let keyLength = key.h;

  if (character.posY <= keyTop && character.posY >= keyBottom 
    && character.posX > keyXStart && character.posX < keyXEnd
    && character.posZ < keyLength && character.posZ > -keyLength) {
    theGround = keyTop;
    character.isJumping = false;
    character.dy = 0;

    if (keyType === 'white') {
      if (!whiteKeySounds[index % whiteKeySounds.length].isPlaying()) {
        whiteKeySounds[index % whiteKeySounds.length].play();
      }
    }
    
    else if (keyType === 'black') {
      if (!blackKeySounds[index % blackKeySounds.length].isPlaying()) {
        blackKeySounds[index % blackKeySounds.length].play();
      }
    }
  } 
  
  else {
    theGround = 0;
  }
}

function spawnKeys() {  
  const totalWidth = 15 * keyWidth;

  for (let i = 0; i < 15; i++) {
    let whiteKey = {
      x: (i * keyWidth) - (totalWidth / 2),
      y: keyHeight / 4,
      z: 0,
      w: keyWidth,
      h: keyHeight,
      color: 255,
    };
    whiteKeys.push(whiteKey);
  }

  for (let i = 0; i < 15; i++) {
    if (blackKeySpaces.includes(i % 7)) {
      let blackKey = {
        x: (i * keyWidth) - (totalWidth / 2) + keyWidth, 
        y: 0,
        z: -10,
        w: keyWidth * 0.6,
        h: keyHeight * 0.67,
        color: 0,
      };
      blackKeys.push(blackKey);
    }
  }
}

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