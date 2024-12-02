// Local Storage Demo

let numberOfClicks = 0;
let highestClick = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // only get highest value if it exists
  if (getItem("highest")) {
    highestClick = getItem("highest");
  }
}

function draw() {
  background(220);
  displayClicks();
  displayHighest();
}

function mousePressed() {
  if (mouseButton === "left") {
    numberOfClicks++;
    if (numberOfClicks > highestClick) {
      highestClick = numberOfClicks;
      storeItem("highest", highestClick);
    }
  }
  if (mouseButton === "right") {
    numberOfClicks--;
  }
}

function displayClicks() {
  fill("black");
  textSize(50);
  text(numberOfClicks, width / 2 - 50, height / 2);
}

function displayHighest() {
  fill("green");
  textSize(50);
  text(highestClick, width / 4 * 3, height / 4);
}