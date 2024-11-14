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

function mousePressed() {
  let x = Math.floor(mouseX / cellSize);
  let y = Math.floor(mouseY / cellSize);

  if (x < 0 || x >= squaresWide || y < 0 || y >= squaresHigh) return;

  // select piece
  if (pieces[y][x] === "r" && !pieceSelected) {
    possibleMoves = [];

    for (let red of redCheckers) {
      if (red.x === x && red.y === y)  {
        // delete prior selection
        if (pieceSelected) {
          checkerboard[selectedPiece.y][selectedPiece.x] = prevColor;
        }

        // select new piece
        pieceSelected = true;
        selectedPiece = red;

        prevColor = checkerboard[selectedPiece.y][selectedPiece.x];
        checkerboard[selectedPiece.y][selectedPiece.x] = SELECTED_TILE; // highlight selected piece
        // check possible moves
        possibleMoves = selectedPiece.checkMoves(selectedPiece.x, selectedPiece.y);
        break;
      }
    }
  }
  // select tile for movement
  else if (pieces[y][x] === "." && pieceSelected && isValidMove(x, y)) {
    selectedPiece.moveChecker(x, y);
    checkerboard[selectedPiece.y][selectedPiece.x] = prevColor;

    // reset for next round
    pieceSelected = false;
    currentPlayer = -currentPlayer;
    possibleMoves = [];
    selectedPiece = null;
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
      prevColor = checkerboard[this.y][this.x];
      checkerboard[this.y][this.x] = SELECTED_TILE; 
    }
  }

  checkMoves(x, y) {
    possibleMoves = [];

    if (y - 1 >= 0 && x + 1 < squaresWide && pieces[y - 1][x + 1] === ".") {
      possibleMoves.push({y: y - 1, x: x + 1});
    }
    if (y - 1 >= 0 && x - 1 >= 0 && pieces[y - 1][x - 1] === ".") {
      possibleMoves.push({y: y - 1, x: x - 1});
    }
    return possibleMoves;
  }

  moveChecker(x, y) {
    if (!pieceSelected) return;

    pieces[selectedPiece.y][selectedPiece.x] = ".";
    pieces[y][x] = selectedPiece.color[0]; // redraw checker in new spot

    let prevPosX = selectedPiece.x;
    let prevPosY = selectedPiece.y;

    selectedPiece.x = x;
    selectedPiece.y = y;

    checkerboard[prevPosY][prevPosX] = prevColor;
    checkerboard[y][x] = SELECTED_TILE; // highlight the new position
  }
}

function minimax(board, depth, isMaximizingPlayer) {
  if (depth === 0 || isGameOver(board)) {
    return evaluateBoard(board);
  }

  if (isMaximizingPlayer) {
    let maxEval = -Infinity;
    let moves = getAllPossibleMoves(board, "black");
    for (let move of moves) {
      let newBoard = makeMove(board, move);
      let eval = minimax(newBoard, depth - 1, false);
      maxEval = Math.max(maxEval, eval);
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    let moves = getAllPossibleMoves(board, "red");
    for (let move of moves) {
      let newBoard = makeMove(board, move);
      let eval = minimax(newBoard, depth - 1, true);
      minEval = Math.min(minEval, eval);
    }
    return minEval;
  }
}

function evaluateBoard(board) {

}

function isGameOver(board) {

}

function getAllPossibleMoves(board, player) {

}

function makeMove(board, move) {

}