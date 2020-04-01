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

para = new Paratrooper()
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  para.draw()
  para.move()
  requestAnimationFrame(animate)
}
animate()
