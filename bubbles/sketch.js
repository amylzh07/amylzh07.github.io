// Bubbles
// Removing objects from the array

let theBubbles = [];
let deathLocations = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  for (i = 0; i < 5; i++) {
    spawnBubble();
  }

  // create a new bubble
  window.setInterval(spawnBubble, 500);
}

function draw() {
  background(250);
  moveBubblesWithNoise();
  displayBubbles();
  displayDeathSpots();
}

function mousePressed() {
  for (let bubble of theBubbles) {
    if (clickedInBubble(mouseX, mouseY, bubble)) {
      let theIndex = theBubbles.indexOf(bubble);
      theBubbles.splice(theIndex, 1);
      addDeath(mouseX, mouseY);
    }
  }
}

function displayDeathSpots() {
  for (let spot of deathLocations) {
    // add images for bubble pop
  }
}

function addDeath(_x, _y) {
  let deathSpot = {
    x: _x,
    y: _y,
  };
  deathLocations.push(deathSpot);
}

function clickedInBubble(x, y, theBubble) {
  let distanceAway = dist(x, y, theBubble.x, theBubble.y);
  if (distanceAway < theBubble.radius) {
    return true;
  }
  else {
    return false;
  }
}

function displayBubbles() {
  for (let bubble of theBubbles) {
    fill(bubble.red, bubble.green, bubble.blue, bubble.alpha);
    circle(bubble.x, bubble.y, bubble.radius * 2);
  }
}

function moveBubblesWithNoise() {
  for (let bubble of theBubbles) {
    let x = noise(bubble.timeX) * width;
    let y = noise(bubble.timeY) * height;

    bubble.x = x;
    bubble.y =y;
    
    bubble.timeX += bubble.deltaTime;
    bubble.timeY += bubble.deltaTime;
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
    timeX: random(1000000),
    timeY: random(1000000),
    deltaTime: 0.002,
  };
  theBubbles.push(someBubble);
}