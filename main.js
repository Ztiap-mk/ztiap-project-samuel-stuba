var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

//projektil vykreslovat po priamke

var keys = {};
var objects = [];
var paratroopers = [];
var projectiles = [];
var time = 0;
var cross_x = 0;
var cross_y = 0;
var otoc_proj;
var vystrelil = 0;

var gamestate = "game";

class Object {
  constructor(x, y, width, height, src) {
    this.canvas = document.getElementById("canvas");
    this.image = new Image();
    this.image.src = src;

    this.x = x
    this.y = y
    this.width = width
    this.height = height
  }
  draw() {
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.drawImage(this.image, 0, 0, this.width, this.height)
    ctx.restore()
  }
}

class Projectile {
  constructor(x, y, width, height, rot, c_x, c_y) {
    this.canvas = document.getElementById("canvas");
    this.image = new Image();
    this.image.src = "img/projectile.png";

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.rot = rot;
    this.c_x = c_x;
    this.c_y = c_y;
    this.offBound = 0
  }
  move() {
    const canvas = this.canvas;
    if (this.y <= 0 || (this.x < 0 || this.x > canvas.width)) {
      this.offBound = 1
    }
    this.y -= (canvas.height-turret.y)/50
    this.x += (this.c_x-turret.x)/50
  }

  draw() {
    ctx.save()
    ctx.translate(this.x+7, this.y)
    ctx.rotate(this.rot*Math.PI/180)
    ctx.drawImage(this.image, -this.width/2, -this.height/2, this.width, this.height)
    ctx.restore()
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
    ctx.translate(this.x, this.y-60)
    ctx.drawImage(this.image, 0, 0, 60, 80)
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
  constructor(src) {
    this.canvas = document.getElementById("canvas");
    this.image = new Image();
    this.image.src = src;//"img/turret.png";

    this.x = (canvas.width/2)-14
    this.y = canvas.height-115
    this.game = true
    this.show = 0
  }

  draw(otoc) {
    ctx.save()
    ctx.translate(this.x+14, this.y+60)
    ctx.rotate(otoc*Math.PI/180)
    ctx.drawImage(this.image, -28/2, -64, 28, 64)
    ctx.restore()
  }
}

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

//nacitanie objektov
heli = new Heli();
player = new Player();
turret = new Turret("img/turret.png");
turret_fire = new Turret("img/turret_fire.png")

//pozadie
bg = new Image();
bg.src = "img/background.png";
