// Grid Demo
// Amy (Lening) Zhang
// Oct 22, 2024

// let grid = [[1, 1, 1, 1],
//             [1, 0, 0, 1],
//             [1, 0, 0, 1],
//             [1, 1, 1, 1]];

let grid;
let cellSize;
const GRID_SIZE = 50;

function setup() {
  if (windowWidth < windowHeight) {
    createCanvas(windowWidth, windowWidth);
  }
  else if (windowHeight < windowWidth) {
    createCanvas(windowHeight, windowHeight);
  }
  cellSize = height / GRID_SIZE;
  grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);
}

function draw() {
  background(220);
  displayGrid();
  keyPressed();
}

function displayGrid() {
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      if (grid[y][x] === 0) {
        fill("white");
      } 
      else if (grid[y][x] === 1) {
        fill("black");
      }
      square(x * cellSize, y * cellSize, cellSize);
    }
  }
}

function keyPressed() {
  if (key === "r") {
    grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);
  }
  if (key === "e") {
    grid = generateEmptyGrid(GRID_SIZE, GRID_SIZE);
  }
  if (key === "b") {
    grid = generateDarkGrid(GRID_SIZE, GRID_SIZE);
  }
}

function generateRandomGrid(cols, rows) {
  let newGrid = [];

  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      // make it a 1 half the time, 0 half the time
      if (random(100) < 50) {
        newGrid[y].push(1);
      }
      else {
        newGrid[y].push(0);
      }
    }
  }

  return newGrid;
}

function generateEmptyGrid(cols, rows) {
  let newGrid = [];

  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      newGrid[y].push(0);
    }
  }

  return newGrid;
}

function generateDarkGrid(cols, rows) {
  let newGrid = [];

  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      newGrid[y].push(1);
    }
  }

  return newGrid;
}

function mouseClicked() {
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      if ((grid[y][x] * cellSize >= mouseX &&
        (grid[y][x] + 1) * cellSize <= mouseX)
        && (grid[y] * cellSize >= mouseY && 
          (grid[y] + 1) * cellSize <= mouseY )) {
        if (grid[y][x] === 0) {
          grid[y][x] = 1;
        }
        else {
          grid[y][x] = 0;
        }
      }
    }
  }
}