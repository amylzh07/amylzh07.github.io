// AI Checkers
// Amy (Lening) Zhang
// Due Date Here

let checkerboard;
let cellSize;
const GRID_SIZE = 25;

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
  checkerboard = generateRandomGrid(GRID_SIZE, GRID_SIZE);
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
      if (grid[y][x] === 0) {
        fill("black");  // 0 is black
      } 
      else if (grid[y][x] === 1) {
        fill("white"); // 1 is white
      }
      square(x * cellSize, y * cellSize, cellSize);
    }
  }
}

function mousePressed() {
  // move checkers
}

function keyPressed() {
  if (key === " ") {
    grid = generateCheckerboard(GRID_SIZE, GRID_SIZE);
  }
}

function generateCheckerboard(cols, rows) {
  let newGrid = [];

  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      newGrid[y].push(0);
    }
  }

  return newGrid;
}
