// AI Checkers
// Amy (Lening) Zhang
// Nov 6, 2024

let checkerboard;
let cellSize;
const GRID_SIZE = 8;
const WHITE_TILE = 0;
const GRAY_TILE = 1;
let isWhite = true;

let offset = 14;

let turns = ["r", "b"]; // hold turns

let activePiece;

let redCheckers = [];
let blackCheckers = [];

// to do:
// build the board
// place checkers pieces on grid
// move piece diagonally
// capture opponent's piece
// implement turn by turn
// determine AI move system
// display the count of piece for each player
// display the winner at the end of the game

function setup() {
  if (windowWidth < windowHeight) {
    createCanvas(windowWidth, windowWidth);
  }
  else if (windowHeight < windowWidth) {
    createCanvas(windowHeight, windowHeight);
  }
  cellSize = height / GRID_SIZE;
  checkerboard = generateCheckerboard(GRID_SIZE, GRID_SIZE);

  // create checkers pieces (red, black)
  // loop through top three grid (0, 2 for red) (bottom 3 for black)

  


  // create checkers pieces
  let theColor = "red";
  for (let i = 0; i < 12; i++) {
    redCheckers.push(new Checkers(theColor, x, y));
  }

  theColor = "black";
  for (let i = 0; i < 12; i++) {
    blackCheckers.push(new Checkers(theColor));
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  cellSize = height / GRID_SIZE;
}

function draw() {
  background(220);
  displayCheckerboard();

  for (let redChecker of redCheckers) {
    redChecker.display();
  }

}

function displayCheckerboard() {
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      if (checkerboard[y][x] === WHITE_TILE) {
        fill("white");
      } 
      else if (checkerboard[y][x] === GRAY_TILE) {
        fill("gray");
      }
      noStroke();
      square(x * cellSize, y * cellSize, cellSize);
    }
  }
}

function mousePressed() {
  let x = Math.floor(mouseX/cellSize);
  let y = Math.floor(mouseY/cellSize);

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
        newBoard[y].push(GRAY_TILE);
      }
      isWhite = !isWhite;
    }
    isWhite = !isWhite;
  }
  return newBoard;
}

class Checkers {
  constructor(theColor) {
    this.x = 0;
    this.y = 0;
    this.r = cellSize / 2;
    this.color = theColor;
  }

  display() {
    if (this.color === "red") {
      fill("red");
    }
    if (this.color === "black") {
      fill("black");
    }
    circle(this.x + this.r, this.y + this.r, 2 * this.r - offset);
  }

}

function moveCheckers() {

}