var canvas = document.getElementById("canvas")
var context = canvas.getContext("2d")
var y = 0
var x = 600

var bg = new Image()
bg.src = "img/background.png"
bg.onload = animate

var para = new Image()
para.onload = animate
para.src = "img/paratrooper.png"

var heli = new Image()
heli.onload = animate
heli.src = "img/heli.png"

var bomb = new Image()
bomb.onload = animate
bomb.src = "img/bomb.png"

function animate() {
  context.clearRect(0, 0, canvas.width, canvas.height)
  context.drawImage(bg, 0, 0)
  context.drawImage(para, 100, y)
  context.drawImage(bomb, 0, y)
  context.drawImage(heli, x, 50)
  y += 1
  x -= 1
  requestAnimationFrame(animate)
}

/*class Obj {
  constructor(x, y) {
    this.image = document.getElementById("image")
    this.x = x
    this.y = y
  }

  move() {
    this.y += 10
  }

  draw() {
    context.save()
    context.translate(0, this.y)
    context.drawImage(this.image, this.x, this.y)
    context.restore()
  }
}
var para = new Obj(300, 0)
para.draw()*/

/*
function draw() {
  context.fillStyle = "white"
  context.fillRect(0, 0, canvas.width, canvas.height)
  para.draw()
}

function move() {
  para.move()
}

var para = new Obj(300, 0, 290, 320)

function step(){
  move()
  draw()
  context.font = '30px Arial'
  context.fillText('Paratrooper', 0, 25)
  requestAnimationFrame(step)
}
window.onload = function() {
  canvas = document.getElementById("canvas")
  context = canvas.getContext("2d")
  step()
}*/
