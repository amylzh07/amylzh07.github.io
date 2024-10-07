// Perlin Noise Ball

let x;
let y;
let time = 0;
let offset = 50;

function setup() {
  createCanvas(windowWidth, windowHeight);
  x = width / 2;
  y = height / 2;
}

function draw() {
  background(200, 200, 255);

  x = noise(time) * width;
  y = noise(time + offset) * height;
  circle(x, y, 50);

  time += 0.01;
}
