function init() {
  let startBtn = document.querySelector("#start-button");
  let canvas = document.querySelector("#game-canvas");
  let ctx = canvas.getContext("2d");
  let score = document.querySelector("#score");
  let lines = document.querySelector("#lines");
  let level = document.querySelector("#level");

  // variables needed
  let numOfColumns = 10;
  let numOfRows = 20;
  let cellSize = 35;
  let cellNumbers = numOfRows * numOfColumns;
  let time = 1000;
  let grid = [];
  let startingX = 3;
  let startingY = 0;
  let shape = [];

  let shapes = [
    [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0],
    ],
    [
      [1, 1],
      [1, 1],
    ],
    [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ],
    [
      [1, 1, 1],
      [0, 1, 0],
      [0, 0, 0],
    ],
    [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
  ];

  // drawing a cell
  function drawCell(x, y) {
    ctx.strokeStyle = "white";
    ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);
  }

  // creating the grid
  function createGrid() {
    for (let i = 0; i < numOfRows; i++) {
      grid[i] = [];
      for (let j = 0; j < numOfColumns; j++) {
        grid[grid.length - 1].push(0);
        drawCell(j, i);
      }
    }
  }
  createGrid();

  // randomly choosing a tetromino shape
  function randomShape() {
    let random = Math.floor(Math.random() * 6);
    shape = shapes[random];
    return shape;
  }

  // drawing the tetromino shapes
  function drawTetrimino() {}

  // function for starting the game
  function startGame() {
    // choosing a random tetromino shape
    randomShape();
    //draw tetromino

    drawTetrimino();
  }

  //event listener for the start button
  startBtn.addEventListener("click", startGame);
}

window.addEventListener("DOMContentLoaded", init);
