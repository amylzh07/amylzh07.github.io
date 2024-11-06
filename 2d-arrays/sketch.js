// AI Checkers
// Amy (Lening) Zhang
// Nov 12, 2024

let checkerboard;
let cellSize;
const WHITE_TILE = 0;
const GRAY_TILE = 1;
let isWhite = true;

let offset = 14;

let turns = ["r", "b"]; // hold turns

let activePiece;

let redCheckers = [];
let blackCheckers = [];

let boardFile;
let startBoard;

// to do:

// array #1 checkerboard -- DONE
// array #2 checkers pieces displayed as objects in a class
// iterate through the string and set object positions (in an array) based on what the string's position is
// --> this can be done in the setup
// implement turn-based system when moving on click


// move piece diagonally
// capture opponent's piece
// implement turn by turn
// determine AI move system
// display the count of piece for each player
// display the winner at the end of the game

function preload() {
  boardFile = "board.txt";
  rows = loadStrings(boardFile);
}

function setup() {
  if (windowWidth < windowHeight) {
    createCanvas(windowWidth, windowWidth);
  }
  else if (windowHeight < windowWidth) {
    createCanvas(windowHeight, windowHeight);
  }

  squaresHigh = rows.length;
  squaresWide = rows[0].length;

  cellSize = height / squaresWide;
  checkerboard = generateCheckerboard(squaresWide, squaresHigh);
  pieces = createEmpty2dArray(squaresWide, squaresHigh);

  // create checkers
  for (let i = 0; i < 12; i++) {
    let theColor = "red";
    redCheckers.push(new Checkers(theColor));
  }

  for (let i = 0; i < 12; i++) {
    let theColor = "black";
    blackCheckers.push(new Checkers(theColor));
  }

  // convert position string into 2D array
  for (let y = 0; y < squaresHigh; y++) {
    for (let x = 0; x < squaresWide; x++) {
      let pieceType = rows[y][x];
      pieces[y][x] = pieceType;
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  cellSize = height / squaresHigh;
}

function draw() {
  background(220);
  displayCheckerboard();

  for (let y = 0; y < squaresHigh; y++) {
    for (let x = 0; x < squaresWide; x++) {
      showPieces(pieces[y][x], x, y);
    }
  }
}

function createEmpty2dArray(cols, rows) {
  let piecesBoard = [];
  for (let y = 0; y < rows; y++) {
    piecesBoard.push([]);
    for (let x = 0; x < cols; x++) {
      piecesBoard[y].push(0);
    }
  }
  return piecesBoard;
}

function displayCheckers(location, x, y) {
  if (location === "r") {
    redCheckers.display();
  }
  else if (location === "b") {
    blackCheckers.display();
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
        newBoard[y].push(GRAY_TILE);
      }
      isWhite = !isWhite;
    }
    isWhite = !isWhite;
  }
  return newBoard;
}

function displayCheckerboard() {
  for (let y = 0; y < squaresHigh; y++) {
    for (let x = 0; x < squaresWide; x++) {
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

  // send position data back to whichever checker clicked

}

class Checkers {
  constructor(theColor, x, y) {
    this.x = x;
    this.y = y;
    this.r = cellSize / 2;
    this.color = theColor;
  }

  display() {
    fill(this.color);
    circle(this.x * cellSize + this.r, this.y + this.r, 2 * this.r - offset);
  }

  move() {}

}


// currently we iterate through the string of positions to set where the checkers show up
// then the checkers are created by creating new objects and pushing to an array
// 

// refer to chess-maybe for help