let title = document.getElementById("title");
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

ctx.canvas.height = window.innerHeight - 200;
ctx.canvas.width = (window.innerHeight - 200) * 1.7;
title.style.fontSize = `${canvas.width / 20}px`;

let ballRadius = canvas.width / 175;
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx;
let dy;
let paddleHeight = canvas.height / 100;
let paddleWidth = canvas.width / 8;
let paddleX = (canvas.width - paddleWidth) / 2;
let brickRowCount = 11;
let brickColumnCount = 6;
let brickWidth = canvas.width / 17;
let brickHeight = canvas.height / 50;
let brickPadding = 35;
let brickOffsetTop = 35;
let brickOffsetLeft = 35;
let score = 0;
let lives = 5;
let level = 1;
let bricks = [];
let levelSet = [];
let brickColor;
let direction = 1;

const data = {
  level1: [
    [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
  ],
  level2: [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ],
  level3: [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  ],
  level4: [
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
  ],
  level5: [
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  ],
};

const getRandomInt = () => {
  const random = Math.floor(Math.random() * 2) + 1;
  switch (random) {
    case 1:
      return 1;
    case 2:
      return -1;
    default:
      break;
  }
};

const mouseMoveHandler = (e) => {
  let relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) paddleX = relativeX - paddleWidth / 2;
};

document.addEventListener("mousemove", mouseMoveHandler, false);

const collisionDetection = () => {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      let b = bricks[c][r];

      if (b.status === 1)
        if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
          dy = -dy;
          b.status = 0;
          score += 100;

          if (checkWin()) {
            level++;

            if (level === 6) {
              alert("You Won!");
              document.location.reload();
            }

            initializeBricks();
          }
        }
    }
  }
};

const initializeBricks = () => {
  paddleWidth -= 20;

  switch (level) {
    case 1:
      dx = 6 * getRandomInt();
      dy = 6 * getRandomInt();

      brickColor = "#0DDBD4";
      levelSet = data.level1;
      break;

    case 2:
      dx = 7 * getRandomInt();
      dy = 7 * getRandomInt();

      brickColor = "#38C20A";
      levelSet = data.level2;
      break;

    case 3:
      dx = 8 * getRandomInt();
      dy = 8 * getRandomInt();

      brickColor = "#DBD82F";
      levelSet = data.level3;
      break;

    case 4:
      dx = 9 * getRandomInt();
      dy = 9 * getRandomInt();

      brickColor = "#EB7000";
      levelSet = data.level4;
      break;

    case 5:
      dx = 10 * getRandomInt();
      dy = 10 * getRandomInt();

      brickColor = "#EB1601";
      levelSet = data.level5;
      break;

    default:
      break;
  }

  for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];

    for (let r = 0; r < brickRowCount; r++) {
      if (levelSet[c][r] === 1) bricks[c][r] = { x: 0, y: 0, status: 1 };
      else bricks[c][r] = { x: 0, y: 0, status: 0 };
    }
  }
};

initializeBricks();

const drawBall = () => {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#accc2b";
  ctx.fill();
  ctx.closePath();
};

const drawPaddle = () => {
  drawBorder(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight, 2);
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#11DBF0";
  ctx.fill();
  ctx.closePath();
};

const drawBricks = () => {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status === 1) {
        let brickX = r * (brickWidth + brickPadding) + brickOffsetLeft;
        let brickY = c * (brickHeight + brickPadding) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        drawBorder(brickX, brickY, brickWidth, brickHeight, 2);
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = brickColor;
        ctx.fill();
        ctx.closePath();
      }
    }
  }
};

const drawScore = () => {
  ctx.font = `bold ${canvas.width / 60}px Pixel`;
  ctx.fillStyle = "#EBC900";
  ctx.fillText("Score: " + score, 8, 20);
};

const drawLives = () => {
  ctx.font = `bold ${canvas.width / 60}px Pixel`;
  ctx.fillStyle = "#EBC900";
  ctx.fillText("Lives: " + lives, canvas.width - 80, 20);
};

const drawLevels = () => {
  ctx.font = `bold ${canvas.width / 60}px Pixel`;
  ctx.fillStyle = "#EBC900";
  ctx.fillText("Level: " + level, canvas.width - 80, 50);
};

const checkWin = () => {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status === 1) return false;
    }
  }
  return true;
};

const drawBorder = (xPos, yPos, width, height, thickness) => {
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(xPos - thickness, yPos - thickness, width + thickness * 2, height + thickness * 2);
};

const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  drawLives();
  drawLevels();
  collisionDetection();

  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) dx = -dx;

  if (y + dy < ballRadius) dy = -dy;
  else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) dy = -dy;
    else {
      lives--;

      if (!lives) {
        alert("You Lost!");

        document.location.reload();
      } else {
        x = canvas.width / 2;
        y = canvas.height - 30;

        dx = dx * getRandomInt();
        dy = dy * getRandomInt();

        paddleX = (canvas.width - paddleWidth) / 2;
      }
    }
  }

  x += dx;
  y += dy;

  requestAnimationFrame(draw);
};

draw();
