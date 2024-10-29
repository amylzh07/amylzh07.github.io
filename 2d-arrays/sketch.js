// AI Checkers
// Amy (Lening) Zhang
// Due Date Here

let checkerboard;
let cellSize;
const GRID_SIZE = 8;
const WHITE_TILE = 0;
const BLACK_TILE = 1;
let isWhite = true;

// draw board
// move pieces (turn by turn)
// implement AI move system

function setup() {
  if (windowWidth < windowHeight) {
    createCanvas(windowWidth, windowWidth);
  }
  else if (windowHeight < windowWidth) {
    createCanvas(windowHeight, windowHeight);
  }
  cellSize = height / GRID_SIZE;
  checkerboard = generateCheckerboard(GRID_SIZE, GRID_SIZE);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  cellSize = height / GRID_SIZE;
}

function draw() {
  background(220);
  displayCheckerboard();
}

function displayCheckerboard() {
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      if (checkerboard[y][x] === WHITE_TILE) {
        fill("white");
      } 
      else if (checkerboard[y][x] === BLACK_TILE) {
        fill("black");
      }
      noStroke();
      square(x * cellSize, y * cellSize, cellSize);
    }
  }
}

function mousePressed() {
  // move checkers

}

function keyPressed() {
  if (key === " ") {
    checkerboard = generateCheckerboard(GRID_SIZE, GRID_SIZE);
  }
}

function generateCheckerboard(cols, rows) {
  let newBoard = [];

  for (let y = 0; y < rows; y++) {
    newBoard.push([]);
    for (let x = 0; x < cols; x++) {
      if (isWhite) {
        newBoard[y].push(WHITE_TILE);
      }
      else {
        newBoard[y].push(BLACK_TILE);
      }
      isWhite = !isWhite;
    }
    isWhite = !isWhite;
  }
  return newBoard;
}
