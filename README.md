# endless-runner
<!DOCTYPE html>

<html lang="en">

<head>

  <meta charset="UTF-8" />

  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

  <title>Endless Runner</title>

  <link rel="stylesheet" href="style.css" />

</head>

<body>

  <h1>Endless Runner Game</h1>

  <canvas id="gameCanvas" width="800" height="300"></canvas>

  <script src="script.js"></script>

</body>

</html>
body {
  text-align: center;
  font-family: sans-serif;
  background: #f0f0f0;
}

canvas {
  border: 2px solid black;
  background-color: white;
}
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let player = { x: 50, y: 250, width: 30, height: 30, vy: 0, jumping: false };
let gravity = 1.5;
let obstacles = [];
let frame = 0;
let score = 0;

function drawPlayer() {
  ctx.fillStyle = "blue";
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawObstacles() {
  ctx.fillStyle = "red";
  for (let obs of obstacles) {
    ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
    obs.x -= 5;
  }
}

function addObstacle() {
  let height = 30 + Math.random() * 30;
  obstacles.push({ x: canvas.width, y: canvas.height - height, width: 20, height });
}

function checkCollision() {
  for (let obs of obstacles) {
    if (
      player.x < obs.x + obs.width &&
      player.x + player.width > obs.x &&
      player.y < obs.y + obs.height &&
      player.y + player.height > obs.y
    ) {
      alert("Game Over! Score: " + score);
      document.location.reload();
    }
  }
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer();
  drawObstacles();

  player.y += player.vy;
  player.vy += gravity;

  if (player.y > canvas.height - player.height) {
    player.y = canvas.height - player.height;
    player.jumping = false;
    player.vy = 0;
  }

  if (frame % 90 === 0) addObstacle();
  obstacles = obstacles.filter(obs => obs.x + obs.width > 0);

  checkCollision();
  score++;
  ctx.fillStyle = "black";
  ctx.fillText("Score: " + score, 700, 20);

  frame++;
  requestAnimationFrame(update);
}

document.addEventListener("keydown", e => {
  if (e.code === "Space" && !player.jumping) {
    player.vy = -20;
    player.jumping = true;
  }
});

update();
