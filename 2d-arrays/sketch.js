// AI Checkers
// Amy (Lening) Zhang
// Nov 12, 2024

// extras for experts:
// - combined classes with 2d arrays based on positions
// - implemented minimax function to determine best possible move (as a sort of AI)

let checkerboard;
let pieces;
let cellSize;
const WHITE_TILE = 0;
const GRAY_TILE = 1;
const SELECTED_TILE = 2;
let isWhite = true;
let prevColor = null;

let canvasOffset = 50;
let pieceOffset = 14;

let currentPlayer = 1;

let redCheckers = [];
let blackCheckers = [];

let boardFile;
let startBoard;

let pieceSelected = false;
let selectedPiece = null;

let possibleMoves = [];

function preload() {
  boardFile = "board.txt";
  rows = loadStrings(boardFile);
}

function setup() {
  if (windowWidth < windowHeight) {
    createCanvas(windowWidth - canvasOffset, windowWidth - canvasOffset);
  }
  else if (windowHeight < windowWidth) {
    createCanvas(windowHeight - canvasOffset, windowHeight - canvasOffset);
  }

  squaresHigh = rows.length;
  squaresWide = rows[0].length;

  cellSize = height / squaresWide;
  checkerboard = generateCheckerboard(squaresWide, squaresHigh);
  pieces = createEmpty2dArray(squaresWide, squaresHigh);

  // convert position string into 2D array
  for (let y = 0; y < squaresHigh; y++) {
    for (let x = 0; x < squaresWide; x++) {
      let pieceType = rows[y][x];
      pieces[y][x] = pieceType;
    }
  }

  // create checkers based on positions
  for (let y = 0; y < squaresHigh; y++) {
    for (let x = 0; x < squaresWide; x++) {
      if (pieces[y][x] === "r") {
        redCheckers.push(new Checkers("red", x, y));
      }
      else if (pieces[y][x] === "b") {
        blackCheckers.push(new Checkers("black", x, y));
      }
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
  displayCheckers();

}

function displayCheckers() {
  for (let redChecker of redCheckers) {
    redChecker.display();
  }
  for (let blackChecker of blackCheckers) {
    blackChecker.display();
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
      else if (checkerboard[y][x] === SELECTED_TILE) {
        fill(0, 255, 0, 100);
      }
      noStroke();
      square(x * cellSize, y * cellSize, cellSize);
    }
  }
}

function mousePressed() {
  let x = Math.floor(mouseX / cellSize);
  let y = Math.floor(mouseY / cellSize);

  // pieceSelected && pieces[y][x] === "."
  if (pieces[y][x] === "r") {
    for (let red of redCheckers) {
      if (x >= red.x * cellSize && x <= red.x * cellSize + cellSize &&
        y >= red.y && y <= red.y + cellSize)  {
        pieceSelected = true;
        selectedPiece = red;
        break;
      }
    }
  }
  else if (pieces[y][x] === "." && selectedPiece) {
    for (let move of possibleMoves) {
      if (pieces[y][x] === move) {
        prevColor = checkerboard[y][x];
        checkerboard[y][x] = SELECTED_TILE; 
      }
    }
  }    
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
    circle(this.x * cellSize + this.r, this.y * cellSize + this.r, 2 * this.r - pieceOffset);
    if (pieceSelected && selectedPiece) {
      prevColor = checkerboard[y][x];
      checkerboard[y][x] = SELECTED_TILE; 
    }
  }

  checkMoves(x, y) {
    pieces[y][x];
    if (pieces[y - 1][x + 1] === ".") {
      possibleMoves.push(pieces[y - 1][x + 1]);
    }
    if (pieces[y - 1][x - 1] === ".") {
      possibleMoves.push(pieces[y - 1][x - 1]);
    }
    return possibleMoves;
  }

  moveChecker() {
    
    // if the player clicks on a spot that is a valid move, then redraw the checker on that spot
    // keep track in the array
    // clear old spot
    // set new spot
    pieceSelected = false;
    selectedPiece = null;
    currentPlayer = -currentPlayer;
  }
}


// 2. implement ai:
// red is player, black is AI
// minimax through ai.js or just on the main sketch.js
