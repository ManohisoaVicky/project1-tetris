function init() {
  let startBtn = document.querySelector("#start-button");
  let canvas = document.querySelector("#game-canvas");
  let playerScore = document.querySelector("#score");
  let playerLines = document.querySelector("#line");
  let score = 0;
  let lines = 0;
  let ctx = canvas.getContext("2d");

  // variables needed
  let width = ctx.canvas.width;
  let numOfColumns = 10;
  let numOfRows = 20;
  let cellSize = width / 10;
  let fallTime = 800;
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

  // getting grid
  function getNewGrid() {
    let gridRes = [];
    for (let i = 0; i < numOfRows; i++) {
      gridRes[i] = [];
      for (let j = 0; j < numOfColumns; j++) {
        gridRes[gridRes.length - 1].push(0);
      }
    }
    return gridRes;
  }

  // randomly choosing a tetromino shape
  function randomShape() {
    let random = Math.floor(Math.random() * 7);
    shape = shapes[random];
    return shape;
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
    drawUpdatedGrid();
    drawTetrimino();
    requestAnimationFrame(draw);
  }
  draw();

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

  //checking if left side is void
  function isLeftVoid() {
    if (shape.length === 3) {
      if (shape[0][0] === 0 && shape[1][0] === 0 && shape[2][0] === 0)
        return true;
    } else if (shape.length === 4) {
      if (
        shape[0][0] === 0 &&
        shape[1][0] === 0 &&
        shape[2][0] === 0 &&
        shape[3][0] === 0
      )
        return true;
    }

    return false;
  }

  // checking if right side is void
  function isRightVoid() {
    if (shape.length === 3) {
      if (shape[0][2] === 0 && shape[1][2] === 0 && shape[2][2] === 0)
        return true;
    } else if (shape.length === 4) {
      if (
        shape[0][3] === 0 &&
        shape[1][3] === 0 &&
        shape[2][3] === 0 &&
        shape[3][3] === 0
      )
        return true;
    }

    return false;
  }

  // functions for keyboard movements
  function moveHori(num) {
    if (sideCollision()) {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      draw();
      return;
    }
    if (shape === shapes[3]) {
      oCurrentX += num;
    }
    if (num === -1 && isLeftVoid()) {
      const tempShape = Array.from(shape);
      if (shape.length === 3) {
        shape[0] = [tempShape[0][1], tempShape[0][2], tempShape[0][0]];
        shape[1] = [tempShape[1][1], tempShape[1][2], tempShape[1][0]];
        shape[2] = [tempShape[2][1], tempShape[2][2], tempShape[2][0]];
      } else if (shape.length === 4) {
        shape[0] = [
          tempShape[0][1],
          tempShape[0][2],
          tempShape[0][3],
          tempShape[0][0],
        ];
        shape[1] = [
          tempShape[1][1],
          tempShape[1][2],
          tempShape[1][3],
          tempShape[1][0],
        ];
        shape[2] = [
          tempShape[2][1],
          tempShape[2][2],
          tempShape[2][3],
          tempShape[2][0],
        ];
        shape[3] = [
          tempShape[3][1],
          tempShape[3][2],
          tempShape[3][3],
          tempShape[3][0],
        ];
      }

      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      draw();
      return;
    } else if (num === 1 && isRightVoid()) {
      const tempShape = Array.from(shape);
      if (shape.length === 3) {
        shape[0] = [tempShape[0][2], tempShape[0][0], tempShape[0][1]];
        shape[1] = [tempShape[1][2], tempShape[1][0], tempShape[1][1]];
        shape[2] = [tempShape[2][2], tempShape[2][0], tempShape[2][1]];
      } else if (shape.length === 4) {
        shape[0] = [
          tempShape[0][3],
          tempShape[0][0],
          tempShape[0][1],
          tempShape[0][2],
        ];
        shape[1] = [
          tempShape[1][3],
          tempShape[1][0],
          tempShape[1][1],
          tempShape[1][2],
        ];
        shape[2] = [
          tempShape[2][3],
          tempShape[2][0],
          tempShape[2][1],
          tempShape[2][2],
        ];
        shape[3] = [
          tempShape[3][3],
          tempShape[3][0],
          tempShape[3][1],
          tempShape[3][2],
        ];
      }

      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      draw();
      return;
    } else {
      if (num === 1) {
        if (currentX >= 0 && currentX < numOfColumns - shape.length)
          currentX += num;
      } else {
        if (currentX > 0 && currentX <= numOfColumns) currentX += num;
      }
    }

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
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

  // collision detection
  function collisionDetection() {
    if (currentY >= numOfRows - getShapeHeight()) {
      return true;
    } else {
      if (shapeCollidesGridBottom(shape)) return true;
      return false;
    }
  }

  //checking if bottom collides
  function shapeCollidesGridBottom(shape) {
    let grid2 = getGrid(shape);
    for (let i = 0; i < grid.length - 1; i++) {
      for (let j = 0; j < grid.length; j++) {
        if (grid[i + 1][j] == 1 && grid[i + 1][j] == grid2[i][j]) {
          return true;
        }
      }
    }
    return false;
  }

  function sideCollision() {
    let tempY = currentY;
    for (let s = 0; s < shape.length; s++) {
      for (let r = 0; r < shape[s].length; r++) {
        let x = currentX + r;
        if (
          (grid[tempY][x - 1] === 1 && shape[s][r]) === 1 ||
          (grid[tempY][x + 1] === 1 && shape[s][r] === 1)
        ) {
          return true;
        }
      }
      tempY += 1;
    }

    return false;
  }

  // fall motion
  function fall() {
    let motion = setInterval(() => {
      if (collisionDetection()) {
        clearInterval(motion);
        updateGrid(grid, shape);
        if (gameOver()) {
          if (window.confirm("Game Over! Would you like to play again?")) {
            location.reload();
          }
          return;
        }
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
    removeLine();
    console.log(grid);
  }

  // draw updated grid
  function drawUpdatedGrid() {
    grid.forEach((row, y) => {
      row.forEach((value, x) => {
        if (grid[y][x] === 1) {
          if (shape === shapes[3]) {
            currentX = oCurrentX;
          }
          ctx.strokeStyle = "white";
          ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);
          ctx.fillStyle = "green";
          ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
      });
    });
  }

  function getGrid(shape) {
    let gridRes = getNewGrid();
    shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value === 1) {
          gridRes[y + currentY][x + currentX] = value;
        }
      });
    });
    return gridRes;
  }

  // function to remove and add lines
  function removeLine() {
    for (let x = numOfRows - 1; x >= 0; x--) {
      if (full(grid[x])) {
        grid.splice(x, 1);
        grid.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        x++;
        score += 100;
        lines += 1;
        if (lines % 7 === 0) {
          fallTime -= 100;
        }
        playerScore.textContent = score;
        playerLines.textContent = lines;
      }
    }
  }

  function full(row) {
    if (isTheSameArray(row, [1, 1, 1, 1, 1, 1, 1, 1, 1, 1])) {
      return true;
    }
    return false;
  }

  // function for game over
  function gameOver() {
    let top = grid[0];
    for (let i = 0; i < top.length; i++) {
      if (top[i] === 1) {
        return true;
      }
    }
    return false;
  }

  // function for starting the game
  function startGame() {
    randomShape();
    lastMove = true;
    fall();
  }

  //event listeners
  startBtn.addEventListener("click", startGame);
  document.addEventListener("keydown", keyHandler);
}

window.addEventListener("DOMContentLoaded", init);
