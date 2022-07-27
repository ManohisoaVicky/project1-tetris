function init() {
  let startBtn = document.querySelector("#start-button");
  let canvas = document.querySelector("#game-canvas");
  let score = document.querySelector("#score");
  let lines = document.querySelector("#lines");
  let level = document.querySelector("#level");
  let ctx = canvas.getContext("2d");

  // variables needed
  let numOfColumns = 10;
  let numOfRows = 20;
  let cellSize = 35;
  let cellNumbers = numOfRows * numOfColumns;
  let fallTime = 1000;
  let grid = [];
  let shape = [];
  let currentX = 3;
  let currentY = 0;
  let oCurrentX = 4;
  let bottom = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

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

  // creating the grid
  function createGrid() {
    for (let i = 0; i < numOfRows; i++) {
      grid[i] = [];
      for (let j = 0; j < numOfColumns; j++) {
        grid[grid.length - 1].push(0);
      }
    }
    console.table(grid);
    console.log(grid.length);
  }
  createGrid();

  // randomly choosing a tetromino shape
  function randomShape() {
    let random = Math.floor(Math.random() * 7);
    shape = shapes[random];
    return shape;
  }

  // functions for keyboard movements
  function moveHori(num) {
    if (shape === shapes[3]) {
      oCurrentX += num;
    }
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    currentX += num;
    draw();
  }

  function moveDown(num) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    if (!collision) {
      currentY += num;
      draw();
    }
  }

  function rotate() {
    //to-do
  }

  // handles key events
  function keyHandler(e) {
    if (e.key === "ArrowLeft") {
      if (currentX > 0) {
        moveHori(-1);
      }
    } else if (e.key === "ArrowRight") {
      if (currentX < grid[currentX].length - shape.length) {
        moveHori(1);
      }
    } else if (e.key === "ArrowDown") {
      moveDown(1);
    } else if (e.key === "ArrowUp") {
      console.log("up arrow");
    }
  }

  // drawing the tetromino
  function drawTetrimino() {
    shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value === 1) {
          if (shape === shapes[3]) {
            currentX = oCurrentX;
          }
          ctx.strokeStyle = "white";
          ctx.strokeRect(
            (currentX + x) * cellSize,
            (currentY + y) * cellSize,
            cellSize,
            cellSize
          );
          ctx.fillStyle = "green";
          ctx.fillRect(
            (currentX + x) * cellSize,
            (currentY + y) * cellSize,
            cellSize,
            cellSize
          );
        }
      });
    });
  }

  function draw() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    drawTetrimino();
    requestAnimationFrame(draw);
  }
  draw();

  // collision detection
  function collisionDetection() {
    if (currentY === 18) {
      return true;
    }
    return false;
  }

  collisionDetection();

  // fall motion
  function fall() {
    let motion = setInterval(() => {
      console.log(currentY);
      draw();
      currentY += 1;
      if (collisionDetection()) {
        clearInterval(motion);
      }
    }, fallTime);
    return;
  }

  // function for starting the game
  function startGame() {
    randomShape();
    fall();
  }

  //event listeners
  startBtn.addEventListener("click", startGame);
  document.addEventListener("keydown", keyHandler);
}

window.addEventListener("DOMContentLoaded", init);
