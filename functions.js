//renderovanie objektov

function animate() {
  }
  if (gamestate == "game"){
    //heliSound.play();
    var i;

    time++;

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(bg, 0, 0)

    //generovanie
    if (time % 300 == 0) {
      para = new Paratrooper();
      paratroopers.push(para);
    }

    //vykreslovanie
    for (i of paratroopers) {
      i.draw();
      i.move();
      if (i.offBound == 1) {
        paratroopers.shift();
      }
    }

    var proj_i = 0;

    for (i of projectiles) {
      var para_i = 0;
      if (i.offBound == 1) {
        projectiles.shift();
      }
      for (j of paratroopers) {
        if (i.x >= j.x+10 && i.x <= j.x+50 && i.y >= j.y+10 && i.y <= j.y+70){
          projectiles.splice(proj_i, 1);
          paratroopers.splice(para_i, 1);
        }
        para_i++;
      }
      i.draw();
      i.move();
      proj_i++;
    }

    //vypocitanie uhla na otacanie dela
    var dx = cross_x-turret.x-14, dy = turret.y+60 - cross_y
    otoc = (Math.atan2(dy, dx)*(180/Math.PI)*-1)+90
    otoc_proj = otoc

    turret.draw(otoc)
    if (vystrelil == 1)
      turret_fire.draw(otoc);
    vystrelil = 0
    player.draw()
    cross.draw(cross_x-10, cross_y-10)

    if (player.game){
      requestAnimationFrame(animate)
    }
  }
  if (gamestate == "gameover") {
    gameover()
  }
};

function gameover() {
  ctx.fillStyle = "red";
  ctx.fillRect(150, 200, 100, 50);
  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.textAlign = "center";
  ctx.fillText("Play Again", 200, 230);
}
animate();
