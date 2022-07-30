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

  let shapes = [
    [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
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

  // getting shape height
  function getShapeHeight() {
    let len = shape.length;

    arr4 = [0, 0, 0, 0];
    arr3 = [0, 0, 0];

    if (len === 4) {
      if (isTheSameArray(shape[len - 1], arr4)) {
        return 1;
      }
    } else if (len === 3) {
      if (isTheSameArray(shape[len - 1], arr3)) {
        return 2;
      }
    }

    return len;
  }
  function isTheSameArray(array1, array2) {
    if (array1.length === array2.length) {
      return array1.every((element, index) => {
        if (element === array2[index]) {
          return true;
        }

        return false;
      });
    }
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
    if (currentY < numOfRows - getShapeHeight()) {
      currentY += num;
      draw();
    }
  }
  function rotate() {
    const tempShape = Array.from(shape);
    if (shape.length === 3) {
      shape[0] = [tempShape[2][0], tempShape[1][0], tempShape[0][0]];
      shape[1] = [tempShape[2][1], tempShape[1][1], tempShape[0][1]];
      shape[2] = [tempShape[2][2], tempShape[1][2], tempShape[0][2]];
    } else if (shape.length === 4) {
      if (shape[3][1] === 0) {
        shape = [
          [0, 1, 0, 0],
          [0, 1, 0, 0],
          [0, 1, 0, 0],
          [0, 1, 0, 0],
        ];
      } else {
        shape = [
          [1, 1, 1, 1],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ];
      }
    }
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    draw();
  }

  // handles key event listeners
  function keyHandler(e) {
    if (e.key === "ArrowLeft") {
      if (currentX > 0 && !collisionDetection()) {
        moveHori(-1);
      }
    } else if (e.key === "ArrowRight") {
      if (
        currentX < grid[currentX].length - shape.length &&
        !collisionDetection()
      ) {
        moveHori(1);
      }
    } else if (e.key === "ArrowDown") {
      if (!collisionDetection()) {
        moveDown(1);
      }
    } else if (e.key === "ArrowUp") {
      if (!collisionDetection()) {
        rotate();
      }
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
    if (currentY >= numOfRows - getShapeHeight()) {
      return true;
    }
    return false;
  }

  // fall motion
  function fall() {
    let motion = setInterval(() => {
      if (collisionDetection()) {
        clearInterval(motion);
        updateGrid(grid, shape);
        resetPositions();
        startGame();
        return;
      }
      if (currentY >= numOfRows - getShapeHeight()) return;
      draw();
      currentY += 1;
    }, fallTime);
    return;
  }

  // resetting the positions
  function resetPositions() {
    currentX = 3;
    currentY = 0;
    oCurrentX = 4;
  }

  //update grid on collision
  function updateGrid(grid, shape) {
    shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value === 1) {
          grid[y + currentY][x + currentX] = value;
        }
      });
    });
    console.log(grid);
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
