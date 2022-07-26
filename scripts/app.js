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
  let fallTime = 1000;
  let grid = [];
  let shape = [];
  let startingX = 3;
  let startingY = 0;

  let shapes = [
    [
      [1, 1, 1, 1],
      [0, 0, 0, 0],
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
    console.log(grid);
  }
  createGrid();

  // randomly choosing a tetromino shape
  function randomShape() {
    let random = Math.floor(Math.random() * 6);
    shape = shapes[random];
    return shape;
  }

  // drawing the tetromino
  function drawTetrimino() {
    shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value === 1) {
          if (shape === shapes[3]) {
            startingX = 4;
          }
          ctx.strokeStyle = "white";
          ctx.strokeRect(
            (startingX + x) * cellSize,
            (startingY + y) * cellSize,
            cellSize,
            cellSize
          );
          ctx.fillStyle = "green";
          ctx.fillRect(
            (startingX + x) * cellSize,
            (startingY + y) * cellSize,
            cellSize,
            cellSize
          );
        }
      });
    });
  }

  // removing the tetromino
  function removeTetromino() {
    shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value === 1) {
          if (shape === shapes[3]) {
            startingX = 4;
          }
          ctx.strokeStyle = "white";
          ctx.strokeRect(
            (startingX + x) * cellSize,
            (startingY + y) * cellSize,
            cellSize,
            cellSize
          );
          ctx.fillStyle = "black";
          ctx.fillRect(
            (startingX + x) * cellSize,
            (startingY + y) * cellSize,
            cellSize,
            cellSize
          );
        }
      });
    });
  }

  // making the tetromino fall
  function fall() {
    let timer = setInterval(() => {
      removeTetromino();
      startingY += 1;
      drawTetrimino();
    }, fallTime);
  }

  // function for starting the game
  function startGame() {
    // choosing a random tetromino shape
    randomShape();
    //draw tetromino

    drawTetrimino();

    fall();
  }

  //event listener for the start button
  startBtn.addEventListener("click", startGame);
}

window.addEventListener("DOMContentLoaded", init);
