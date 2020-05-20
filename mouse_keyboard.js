canvas.onmousemove = function(event) {
  var x = event.clientX - canvas.offsetLeft;
  var y = event.clientY - canvas.offsetTop;
  cross_x = x;
  cross_y = y;
  //console.log(x, y);
  //console.log(turret.x, turret.y);
};

canvas.onclick = function(event) {
  var x = event.pageX - canvas.offsetLeft
  var y = event.pageY - canvas.offsetTop
  if (gamestate == "game")
  {
    proj = new Projectile(turret.x, turret.y, 6, 14, otoc_proj, cross_x, cross_y)
    projectiles.push(proj)
    vystrelil = 1
  }
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
