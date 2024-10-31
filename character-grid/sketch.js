// Character in Grid Demo
// Amy (Lening) Zhang
// Oct 29, 2024

// took out randomized black + white, please add in

let grid;
let cellSize;
const GRID_SIZE = 10;
const OPEN_TILE = 0;
const IMPASSABLE = 1;
const PLAYER = 17;
let thePlayer = {
  x: 0,
  y: 0,
};
let grassImg;
let pathImg;

function preload() {
  grassImg= loadImage("grass.jpg");
  pathImg = loadImage("path.jpg");
}

function setup() {
  if (windowWidth < windowHeight) {
    createCanvas(windowWidth, windowWidth);
  }
  else if (windowHeight < windowWidth) {
    createCanvas(windowHeight, windowHeight);
  }
  cellSize = height / GRID_SIZE;
  grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);

  // add player to the grid
  grid[thePlayer.y][thePlayer.x] = PLAYER;
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
      if (grid[y][x] === IMPASSABLE) {
        // fill("black");  // 0 is black
        image(grassImg, x * cellSize, y * cellSize);
      } 
      else if (grid[y][x] === OPEN_TILE) {
        // fill("white"); // 1 is white
        image(pathImg, x * cellSize, y * cellSize);
      }
      else if (grid[y][x] === PLAYER) {
        fill("pink");
        square(x * cellSize, y * cellSize, cellSize);
      }
    }
  }
}

function mousePressed() {
  let x = Math.floor(mouseX/cellSize);
  let y = Math.floor(mouseY/cellSize);

  // toggle self
  toggleCell(x, y);

}

function toggleCell(x, y) {
  // make sure cell is in the grid (edge casing)

  if (x >= 0 && x < GRID_SIZE && y >= 0 && y < GRID_SIZE) {
    if (grid[y][x] === OPEN_TILE) {
      grid[y][x] = IMPASSABLE;
    }
    else if (grid[y][x] === IMPASSABLE) {
      grid[y][x] = OPEN_TILE;
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

  // move player around
  if (key === "s") {     // move down
    movePlayer(thePlayer.x, thePlayer.y + 1);
  }
  if (key === "w") {     // move up
    movePlayer(thePlayer.x, thePlayer.y - 1);
  }
  if (key === "d") {     // move right
    movePlayer(thePlayer.x + 1, thePlayer.y);
  }
  if (key === "a") {     // move left
    movePlayer(thePlayer.x - 1, thePlayer.y);
  }
}

function movePlayer(x, y) {
  // don't move off grid, only move in open tiles
  if (x >= 0 && x <= GRID_SIZE && y >= 0 && y < GRID_SIZE && grid[y][x] === OPEN_TILE) {

    // previous player location
    let oldX = thePlayer.x;
    let oldY = thePlayer.y;

    // keep track of where player is
    thePlayer.x = x;
    thePlayer.y = y;

    // reset old location to be empty tile
    grid[oldY][oldX] = OPEN_TILE;

    // add the player to the grid
    grid[thePlayer.y][thePlayer.x] = PLAYER;
  }
}

function generateRandomGrid(cols, rows) {
  let newGrid = [];

  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      if (random(100) < 50) {
        newGrid[y].push(OPEN_TILE);
      }
      else {
        newGrid[y].push(IMPASSABLE);
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
      newGrid[y].push(OPEN_TILE);
    }
  }

  return newGrid;
}

function generateDarkGrid(cols, rows) {
  let newGrid = [];

  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      newGrid[y].push(IMPASSABLE);
    }
  }

  return newGrid;
}