// Bubbles
// Removing objects from the array

let theBubbles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (i = 0; i < 5; i++) {
    spawnBubble();
  }
}

function draw() {
  background(220, 220, 255);
  moveBubblesRandomly();
  displayBubbles();
}

function displayBubbles() {
  for (let bubble of theBubbles) {
    noStroke();
    fill(bubble.red, bubble.green, bubble.blue, bubble.alpha);
    circle(bubble.x, bubble.y, bubble.radius * 2);
  }
}

function moveBubblesRandomly() {
  for (let bubble of theBubbles) {
    let choice = random(100);
    if (choice < 50) {
      // move up
      bubble.y -= bubble.speed;
    }
    else if (choice < 65) {
      // move down
      bubble.y += bubble.speed;
    }
    else if (choice < 80) {
      // move right
      bubble.x += bubble.speed;
    }
    else {
      bubble.x -= bubble.speed;
    }
  }
}

function spawnBubble() {
  let someBubble = {
    x: random(width),
    y: height + random(0, 25),
    speed: random(2, 5),
    radius: random(20, 50),
    red: random(255),
    green: random(255),
    blue: random(255),
    alpha: random(255),
  };
  theBubbles.push(someBubble);
}