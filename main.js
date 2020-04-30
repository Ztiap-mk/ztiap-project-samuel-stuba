var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var keys = {};
var objects = [];
var paratroopers = [];
var time = 0;
var cross_x = 0
var cross_y = 0

var gamestate = "game";

class Button {
  constructor(x, y, width, height, color, text) {
    this.canvas = document.getElementById("canvas");

    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.color = color
    this.text = text
  }
  draw() {
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.width, this.height)

    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.textAlign = "center";
    ctx.fillText(this.text, this.x+(this.width/2), this.y+(this.height/2));
  }
}

class Paratrooper {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.image = new Image();
    this.image.src = "img/paratrooper.png";

    this.x = Math.floor(Math.random() * canvas.width-80)+80
    this.y = 0
    this.offBound = 0
  }

  move() {
    const canvas = this.canvas;
    if (this.y > canvas.height) {
      this.offBound = 1
    }

    this.y += 1
  }

  draw() {
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.drawImage(this.image, 0, -60, 60, 80)
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

    this.x = (canvas.width/2)-45
    this.y = canvas.height-73
    this.game = true
  }

  draw() {
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.drawImage(this.image, 0, 0, 90, 73)
    ctx.restore()
  }
}

class Turret {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.image = new Image();
    this.image.src = "img/turret.png";

    this.x = (canvas.width/2)-14
    this.y = canvas.height-115
    this.game = true
  }

  draw(otoc) {
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(otoc)
    ctx.drawImage(this.image, 0, 0, 28, 64)
    ctx.restore()
  }
}

//mys
class Crosshair {
  constructor(width, height) {
    this.canvas = document.getElementById("canvas");
    this.image = new Image();
    this.image.src = "img/crosshair.png";

    this.width = width;
    this.height = height;
    this.switch = true;
  }

  draw(x, y) {
    ctx.save()
    //ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(this.image, x, y, this.width, this.height)
    ctx.restore()
  }
}

cross = new Crosshair(21,21);

canvas.onmousemove = function(event) {
  var x = event.clientX - canvas.offsetLeft;
  var y = event.clientY - canvas.offsetTop;
  cross_x = x;
  cross_y = y;
};

canvas.onclick = function(event) {
  var x = event.pageX - canvas.offsetLeft
  var y = event.pageY - canvas.offsetTop

  if (gamestate == "gameover")
  {
    if ((x >= 150 && x <= 150 + 100) && (y >= 200 && y <= 200 + 50)) {
      gamestate = "game"
      animate()
    }
  }

  if (gamestate == "menu")
  {
    if ((x >= 150 && x <= 150 + 100) && (y >= 200 && y <= 200 + 50)) {
      gamestate = "game"
      animate()
    }
    if ((x >= 150 && x <= 150 + 100) && (y >= 300 && y <= 300 + 50)) {
      gamestate = "settings"
      animate()
    }
  }

  if (gamestate == "settings")
  {
    if ((x >= 150 && x <= 150 + 100) && (y >= 200 && y <= 200 + 50)) {
      cross.switch = false
    }
    if ((x >= 150 && x <= 150 + 100) && (y >= 300 && y <= 300 + 50)) {
      heliSound.stop()
    }
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

//zvuky
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }
}

heliSound = new sound("sounds/helicopter.wav");


//nacitanie objektov
//para = new Paratrooper();
heli = new Heli();
player = new Player();
turret = new Turret();

//paratroopers.push(para);
objects.push(heli);

console.log(objects);

//generovanie objektov

//cross = new Image();
//cross.src = "img/crosshair.png";

bg = new Image();
bg.src = "img/background.png";
