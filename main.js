var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

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

para = new Paratrooper();
heli = new Heli();

cross = new Image();
cross.src = "img/crosshair.png";

function crosshair(x, y) {
  ctx.save()
  ctx.translate(x, y)
  ctx.drawImage(cross, 0, 0, 100, 100)
  ctx.restore()
}

window.onmousemove = function(event) {
  var x = event.clientX - canvas.offsetLeft;
  var y = event.clientY - canvas.offsetTop;
  console.log(x, y);
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  para.draw()
  para.move()
  heli.draw()
  heli.move()
  requestAnimationFrame(animate)
}
animate()
