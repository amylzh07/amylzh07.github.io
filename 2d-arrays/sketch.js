// Checkers-ish
// Amy (Lening) Zhang
// Nov 15, 2024

// extras for experts:
// - used both classes(OOP) and object literals with different purposes in addition to two 2d arrays
//    --> classes were used to create checkers objects, while object literals were used to store the x and y coordinate data of a checker's possible moves
//    --> one 2d array held the board, while the other held the positions and was updated throughout gameplay

// NOTE: the current version (as of 10:27pm Nov. 14) does NOT allow for successful jumping
// --> as i ran out of time, i will debug later but am submitting this version for now as it meets the rubric's criteria

let checkerboard;
let pieces;
let cellSize;
const WHITE_TILE = 0;
const GRAY_TILE = 1;
const SELECTED_TILE = 2;
let isWhite = true;
let prevColor = null;

let pieceOffset = 14;

let currentPlayer = 1;

let redCheckers = [];
let blackCheckers = [];

let boardFile;
let startBoard;

let activeChecker = false;
let selectedPiece = null;
let donePicking = false;

let possibleMoves = [];

function preload() {
  boardFile = "board.txt";
  rows = loadStrings(boardFile);
}

function setup() {
  if (windowWidth < windowHeight) {
    createCanvas(0.75 * windowWidth, 0.75 * windowWidth);
  }
  else if (windowHeight < windowWidth) {
    createCanvas(0.75 * windowHeight, 0.75 * windowHeight);
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

      for (let move of possibleMoves) {
        if (move.x === x && move.y === y) {
          fill(0, 255, 0, 100);
        }
      }

      noStroke();
      square(x * cellSize, y * cellSize, cellSize);
    }
  }
}

function isValidMove(x, y) {
  for (let move of possibleMoves) {
    if (x === move.x && y === move.y) {
      return true;
    }
  }
  return false;
}

function cancelMove() {
  if (activeChecker) {
    checkerboard[selectedPiece.y][selectedPiece.x] = prevColor;
    activeChecker = false;  
    selectedPiece = null;  
  }
}

function mousePressed() {
  let x = Math.floor(mouseX / cellSize);
  let y = Math.floor(mouseY / cellSize);
  prevColor = checkerboard[y][x];

  // select tile for movement
  if (pieces[y][x] === "." && activeChecker && isValidMove(x, y)) {
    selectedPiece.moveChecker(x, y);
    checkerboard[selectedPiece.y][selectedPiece.x] = prevColor;

    // reset for next round
    activeChecker = false;
    currentPlayer = -currentPlayer;
    possibleMoves = [];
    selectedPiece = null;
  }

  // select black piece
  else if (currentPlayer === -1 && pieces[y][x] === "b" && !activeChecker) {
    possibleMoves = [];
    console.log(`Is the checker active? ${activeChecker}`);
    for (let black of blackCheckers) {
      if (black.x === x && black.y === y)  {
        // find selected piece
        activeChecker = true;
        selectedPiece = black;

        checkerboard[y][x] = SELECTED_TILE;

        // check possible moves
        possibleMoves = selectedPiece.checkMoves(selectedPiece.x, selectedPiece.y);
        break;
      }
    }
  }

  // select red piece
  else if (currentPlayer === 1 && pieces[y][x] === "r" && !activeChecker) {
    possibleMoves = [];

    for (let red of redCheckers) {
      if (red.x === x && red.y === y)  {
        // find selected piece
        activeChecker = true;
        selectedPiece = red;

        checkerboard[y][x] = SELECTED_TILE;

        // check possible moves
        possibleMoves = selectedPiece.checkMoves(selectedPiece.x, selectedPiece.y);
        break;
      }
    }
  }
  else {
    cancelMove();
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
  }

  checkMoves(x, y) {
    possibleMoves = [];

    if (this.color === "red") {
      //diagonal movement
      if (y - 1 >= 0 && x + 1 < squaresWide && pieces[y - 1][x + 1] === ".") {
        possibleMoves.push({y: y - 1, x: x + 1});
      }
      if (y - 1 >= 0 && x - 1 >= 0 && pieces[y - 1][x - 1] === ".") {
        possibleMoves.push({y: y - 1, x: x - 1});
      }

      // jump movement
      if (y - 2 >= 0 && x + 2 < squaresWide && pieces[y - 1][x + 1] === "b" && pieces[y - 2][x + 2] === ".") {
        possibleMoves.push({y: y - 2, x: x + 2});
      }
      if (y - 2 >= 0 && x - 2 >= 0 && pieces[y - 1][x - 1] === "b" && pieces[y - 2][x - 2] === ".") {
        possibleMoves.push({y: y - 2, x: x - 2});
      }

      return possibleMoves;
    }

    else if (this.color === "black") {
      //diagonal movement
      if (y + 1 < squaresHigh && x + 1 < squaresWide && pieces[y + 1][x + 1] === ".") {
        possibleMoves.push({y: y + 1, x: x + 1});
      }
      if (y + 1 < squaresHigh && x - 1 >= 0 && pieces[y + 1][x - 1] === ".") {
        possibleMoves.push({y: y + 1, x: x - 1});
      }

      // jump movement
      if (y + 2 <= 6 && x + 2 < squaresWide && pieces[y + 1][x + 1] === "r" && pieces[y + 2][x + 2] === ".") {
        possibleMoves.push({y: y + 2, x: x + 2});
      }
      if (y + 2 <= 6 && x - 2 >= 0 && pieces[y + 1][x - 1] === "r" && pieces[y + 2][x - 2] === ".") {
        possibleMoves.push({y: y + 2, x: x - 2});
      }
      return possibleMoves;
    }
  }

  moveChecker(x, y) {
    if (!activeChecker) {
      return;
    }

    //NOTE: jumping is currently buggy (11/14/2024)

    // check for jumping
    let dX = Math.abs(x - selectedPiece.x);
    let dY = Math.abs(y - selectedPiece.y);
    
    if (dX === 2 && dY === 2) {
      // find middle checker
      let midX = (x + selectedPiece.x) / 2;
      let midY = (y + selectedPiece.x) / 2;

      if (activeChecker.color === "red") {
        // remove black checker
        for (let i = 0; i < blackCheckers.length; i++) {
          if (blackCheckers[i].x === midX && blackCheckers[i].y === midY) {
            blackCheckers.splice(i, 1);
            pieces[midY][midX] = ".";
            break;
          }
        }
      } 
      else if (activeChecker.color === "black") {
        // remove red checker
        for (let i = 0; i < redCheckers.length; i++) {
          if (redCheckers[i].x === midX && redCheckers[i].y === midY) {
            redCheckers.splice(i, 1);
            pieces[midY][midX] = ".";
            break;
          }
        }
      }
    }
    // reset
    pieces[selectedPiece.y][selectedPiece.x] = ".";
    pieces[y][x] = selectedPiece.color[0]; // redraw checker in new spot

    let prevPosX = selectedPiece.x;
    let prevPosY = selectedPiece.y;

    selectedPiece.x = x;
    selectedPiece.y = y;

    checkerboard[prevPosY][prevPosX] = prevColor;
  }
}