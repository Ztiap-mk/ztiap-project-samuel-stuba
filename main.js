var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

//projektil vykreslovat po priamke

var keys = {};
var helis = [];
var main_obj = [];
var menu_obj = [];
var over_obj = [];
var paratroopers = [];
var projectiles = [];
var hp_package = [];
var bombs = [];
var time = 0;
var cross_x = 0;
var cross_y = 0;
var otoc_proj;
var vystrelil = 0;
var hp = 3;
var score = 0;
var sound = 1;
var crosshair_on = 1;
var diff = 0;

var gamestate = "main";

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
    if (this.y <= 70 || (this.x < 0 || this.x > canvas.width)) {
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
    this.y = 70
    this.offBound = 0
  }

  move() {
    const canvas = this.canvas;
    if (this.y > canvas.height) {
      this.offBound = 1
      hp--;
    }

    this.y += 1
  }

  draw() {
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.drawImage(this.image, 0, 0, 60, 80)
    ctx.restore()
  }
}

class Heli {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.image = new Image();
    this.image.src = "img/heli.png";

    this.x = 0
    this.y = 70
    this.vector = 1
    this.offBound = 0
  }

  move() {
    const canvas = this.canvas;
    if (this.x < 0 || this.x > canvas.width) {
      this.vector = this.vector*(-1)
    }

    this.x += 1*this.vector
  }

  /*drop_bomb(){
    bomb = new Bomb(this.x+70)
    bombs.push(bomb)
  }*/

  draw() {
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.drawImage(this.image, 0, 0, 157, 45)
    ctx.restore()
  }
}

class Bomb {
  constructor(x) {
    this.canvas = document.getElementById("canvas");
    this.image = new Image();
    this.image.src = "img/bomb.png";

    this.x = x
    this.y = 80
    this.offBound = 0
  }

  move() {
    const canvas = this.canvas;
    if (this.y > canvas.height) {
      this.offBound = 1
      hp--;
    }

    this.y += 1
  }

  draw() {
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.drawImage(this.image, 0, 0, 80, 36)
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

class Health {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.image = new Image();
    this.image.src = "img/health-up.png";

    this.x = Math.floor(Math.random() * canvas.width-80)+80
    this.y = 70
    this.offBound = 0
  }

  move() {
    const canvas = this.canvas;
    if (this.y > canvas.height) {
      this.offBound = 1;
    }

    this.y += 1
  }

  draw() {
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.drawImage(this.image, 0, 0, 117, 120)
    ctx.restore()
  }
}


cross = new Crosshair(21,21);

//nacitanie objektov
player = new Player();
turret = new Turret("img/turret.png");
turret_fire = new Turret("img/turret_fire.png")
health = new Object(5,5,72,56,"img/health.png")

//pozadie
bg = new Image();
bg.src = "img/background.png";

//main
banner = new Object(0,0,600,130,"img/paratrooper_banner.png");
play = new Object(160,150,280,130, "img/play.png");
menu = new Object(160,300,280,130, "img/menu.png");
exit = new Object(160,450,280,130, "img/exit.png");

main_obj.push(banner)
main_obj.push(play)
main_obj.push(menu)
main_obj.push(exit)

//menu
cross_on = new Object(0,150,600,130, "img/cross_on.png");
cross_off = new Object(0,150,600,130, "img/cross_off.png");
sound_on = new Object(55,300,490,130, "img/sound_on.png");
sound_off = new Object(55,300,490,130, "img/sound_off.png");
back = new Object(160,450,280,130, "img/back.png");

menu_obj.push(cross_on)
//menu_obj.push(cross_off)
menu_obj.push(sound_on)
//menu_obj.push(sound_off)
menu_obj.push(back)

//gameover
game_over = new Object(35,150,530,210, "img/game_over.png");
retry = new Object(130,380,340,130, "img/retry.png");
exit = new Object(160,530,280,130, "img/exit.png");

over_obj.push(game_over)
over_obj.push(retry)
over_obj.push(exit)
