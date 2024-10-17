// Translation and Rotation


function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  rectMode(CENTER);
}

function draw() {
  background(220);
  translate(200, 200);
  square(0, 0, 50);
  for (let i = 0; i < 360; i++) {
    rotate(1);
  }

}
