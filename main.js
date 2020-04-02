var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var keys = {};
var objects = {};

class Paratrooper {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.image = new Image();
    this.image.src = "img/paratrooper.png";

    this.x = Math.random() * canvas.width
    this.y = 0
  }

  move() {
    const canvas = this.canvas;
    if (this.y > canvas.height) {
      this.y -= canvas.height
    }

    this.y += 5
  }

  draw() {
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.drawImage(this.image, 0, 0, 120, 160)
    ctx.restore()
  }
}

class Heli {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.image = new Image();
    this.image.src = "img/heli.png";

    this.x = canvas.width
    this.y = 10
  }

  move() {
    const canvas = this.canvas;
    if (this.x < 0) {
      this.x += canvas.width
    }

    this.x -= 5
  }

  draw() {
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.drawImage(this.image, 0, 0, 157, 45)
    ctx.restore()
  }
}

class Player {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.image = new Image();
    this.image.src = "img/base.png";

    this.x = canvas.width/2
    this.y = canvas.height-220
    this.game = true
  }

  move(up, down, left, right) {
    const canvas = this.canvas;
    if (this.x < 0 || this.x > canvas.width || this.y > canvas.height || this.y < 0) {
      this.game = false;
      ctx.fillStyle = "red";
      ctx.fillRect(150, 200, 100, 50);
      ctx.fillStyle = "black";
      ctx.font = "20px Arial";
      ctx.textAlign = "center";
      ctx.fillText("Play Again", 200, 230);
    }
    this.x -= left;
    this.x += right;
    this.y += down;
    this.y -= up;
  }

  draw() {
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.drawImage(this.image, 0, 0)
    ctx.restore()
  }
}

para = new Paratrooper();
heli = new Heli();
player = new Player();

cross = new Image();
cross.src = "img/crosshair.png";

bg = new Image();
bg.src = "img/background.png";

//mys

function crosshair(x, y) {
  ctx.save()
  ctx.translate(x, y)
  ctx.drawImage(cross, 0, 0, 100, 100)
  ctx.restore()
};

canvas.onmousemove = function(event) {
  var x = event.clientX - canvas.offsetLeft;
  var y = event.clientY - canvas.offsetTop;
  console.log(x, y);
};

canvas.onclick = function(event) {
  var x = event.pageX - canvas.offsetLeft
  var y = event.pageY - canvas.offsetTop
  if ((x >= 150 && x <= 150 + 100) && (y >= 200 && y <= 200 + 50)) {
    window.open("paratrooper.html")
  }
}

//klavesnica
window.onkeydown = function(event) {
  keys[event.keyCode] = true;
  if (keys[37]) player.move(0, 0, 5, 0);
  if (keys[39]) player.move(0, 0, 0, 5);
  if (keys[38]) player.move(5, 0, 0, 0);
  if (keys[40]) player.move(0, 5, 0, 0);
};

window.onkeyup = function(event) {
  keys[event.keyCode] = false;
};

//renderovanie objektov
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(bg, 0, 0)
  para.draw()
  para.move()
  heli.draw()
  heli.move()
  player.draw()
  if (player.game){
    requestAnimationFrame(animate)
  }
};
animate();
