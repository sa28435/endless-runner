const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gravity = 0.8;
const friction = 0.8;

class Player {
  constructor() {
    this.width = 40;
    this.height = 60;
    this.x = 50;
    this.y = canvas.height - this.height;
    this.vx = 0;
    this.vy = 0;
    this.speed = 5;
    this.jumping = false;
  }

  update() {
    this.vy += gravity;
    this.x += this.vx;
    this.y += this.vy;

    if (this.y + this.height > canvas.height) {
      this.y = canvas.height - this.height;
      this.vy = 0;
      this.jumping = false;
    }

    if (this.x < 0) this.x = 0;
    if (this.x + this.width > canvas.width) this.x = canvas.width - this.width;
  }

  draw() {
    ctx.fillStyle = '#00FF00'; // Ninja groen
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

class Platform {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  draw() {
    ctx.fillStyle = '#654321';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

let player = new Player();
let platforms = [
  new Platform(0, canvas.height - 10, canvas.width, 10),
  new Platform(150, 300, 100, 10),
  new Platform(300, 250, 120, 10),
  new Platform(480, 200, 100, 10),
];

let keys = {};

document.addEventListener('keydown', (e) => {
  keys[e.code] = true;
});

document.addEventListener('keyup', (e) => {
  keys[e.code] = false;
});

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Player movement
  if (keys['ArrowRight']) {
    player.vx = player.speed;
  } else if (keys['ArrowLeft']) {
    player.vx = -player.speed;
  } else {
    player.vx *= friction;
  }

  if (keys['Space'] || keys['ArrowUp']) {
    if (!player.jumping) {
      player.vy = -15;
      player.jumping = true;
    }
  }

  player.update();

  // Collision with platforms
  platforms.forEach((platform) => {
    if (
      player.x < platform.x + platform.width &&
      player.x + player.width > platform.x &&
      player.y + player.height > platform.y &&
      player.y + player.height < platform.y + platform.height &&
      player.vy >= 0
    ) {
      player.y = platform.y - player.height;
      player.vy = 0;
      player.jumping = false;
    }
  });

  // Draw platforms and player
  platforms.forEach((p) => p.draw());
  player.draw();

  requestAnimationFrame(gameLoop);
}

gameLoop();
