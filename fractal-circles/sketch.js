// Fractal Circles
function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  recursiveCircle(width / 2, height / 2, mouseX);
}

function recursiveCircle(x, y, r) {
  circle(x, y, r * 2);
  
  // escape clause
  if (r > 15) {
    recursiveCircle(x + r / 2, y, r / 2);
    recursiveCircle(x - r / 2, y, r / 2);
  }
}