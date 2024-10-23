// Grid Demo
// Amy (Lening) Zhang
// Oct 22, 2024

// let grid = [[1, 1, 1, 1],
//             [1, 0, 0, 1],
//             [1, 0, 0, 1],
//             [1, 1, 1, 1]];

let grid;
let cellSize;
const GRID_SIZE = 5;

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

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  cellSize = height / GRID_SIZE;
}

function draw() {
  background(220);
  displayGrid();
}

function displayGrid() {
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
  let x = Math.floor(mouseX/cellSize);
  let y = Math.floor(mouseY/cellSize);

  // toggle self
  toggleCell(x, y);

  // toggle neighbours
  toggleCell(x - 1, y);
  toggleCell(x + 1, y);
  toggleCell(x, y - 1);
  toggleCell(x, y + 1);
}

function toggleCell(x, y) {
  // make sure cell is in the grid (edge casing)

  if (x >= 0 && x < GRID_SIZE && y >= 0 && y < GRID_SIZE) {
    grid[y][x] = Math.abs(grid[y][x] - 1);
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
      newGrid[y].push(0);
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