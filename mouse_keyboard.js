var index;

canvas.onmousemove = function(event) {
  var x = event.clientX - canvas.offsetLeft;
  var y = event.clientY - canvas.offsetTop;
  cross_x = x;
  cross_y = y;
};

canvas.onclick = function(event) {
  var x = event.pageX - canvas.offsetLeft
  var y = event.pageY - canvas.offsetTop
  var i;
  if (gamestate == "game")
  {
    proj = new Projectile(turret.x, turret.y, 6, 14, otoc_proj, cross_x, cross_y)
    projectiles.push(proj)
    vystrelil = 1
    gunshot.play();
  }
  if (gamestate == "gameover") {
      for (index of over_obj) {
        if (x >= index.x && x <= index.x+index.width && y >= index.y && y <= index.y+index.height) {
          if (index == retry) {
            gamestate = "game";
            time = 0
            hp = 3
            score = 0
            paratroopers = []
            projectiles = []
            diff = 0
            helis = []
            animate();
          }
          if (index == exit) {
            window.close()
          }
        }
      }
    }
    if (gamestate == "main") {
        for (index of main_obj) {
          if (x >= index.x && x <= index.x+index.width && y >= index.y && y <= index.y+index.height) {
            if (index == play) {
              gamestate = "game"
              animate()
            }
            if (index == menu) {
              console.log("klik")
              gamestate = "menu"
              menu()
            }
            if (index == exit) {
              window.close()
            }
          }
        }
      }
  if (gamestate == "menu") {
      for (index of menu_obj)
      {
        if (x >= index.x && x <= index.x+index.width && y >= index.y && y <= index.y+index.height) {
          if (index == back) {
            gamestate = "main";
            main();
          }
          if (index == cross_on) {
            crosshair_on = 0;
          }
          if (index == cross_off) {
            crosshair_on = 1;
          }
          if (index == sound_off) {
            sound = 1;
          }
          if (index == sound_on) {
            sound = 0;
          }
        }
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
