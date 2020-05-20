//renderovanie objektov

function animate() {
  if (gamestate == "game"){
    var i;
    var j = 0;
    var k = 0;
    var heli_shift = [];
    var para_shift = [];
    var proj_shift = [];

    time++;
    console.log(diff)

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(bg, 0, 0)

    //generovanie
    if (time % 300-diff == 0) {
      para = new Paratrooper();
      paratroopers.push(para);
    }

    if (time % 1000 == 0) {
      heli = new Heli();
      helis.push(heli);
      diff += 2;
    }

    if (time % 2500 == 0) {
      hp_pack = new Health();
      hp_package.push(hp_pack);
    }

    //vykreslovanie
    health.draw()
    ctx.font = "30px Courier";
    ctx.fillText(hp, 33,40);

    //score
    ctx.font = "30px Courier"
    ctx.fillText("Score:"+score, 400, 40)

    if (hp == 0){
      gamestate = "gameover"
      gameover_s.play();
      gameover()
    }

    for (i of paratroopers) {
      i.draw();
      i.move();
      if (i.offBound == 1) {
        paratroopers.shift();
        damage.play();
      }
    }

    for (i of projectiles) {
      if (i.offBound == 1) {
        projectiles.splice(k, 1);
      }
      k++;
      i.draw();
      i.move();
    }

    for (i of helis) {
      i.draw();
      i.move();
    }

    for (i of hp_package) {
      i.draw();
      i.move();
    }

    var proj_i = 0;

    for (i of projectiles) {
      var para_i = 0;
      var heli_i = 0;
      for (j of paratroopers) {
        if (i.x >= j.x+10 && i.x <= j.x+50 && i.y >= j.y+10 && i.y <= j.y+70){
          proj_shift.push(proj_i)
          para_shift.push(para_i)
          para_death.play();
          score += 10;
        }
      }
      para_i++;

      for (j of helis) {
        if (i.x >= j.x && i.x <= j.x+157 && i.y >= j.y && i.y <= j.y+45){
          proj_shift.push(proj_i)
          heli_shift.push(heli_i)
          score += 50;
        }
      }
      heli_i++;

      for (j of hp_package) {
        if (i.x >= j.x && i.x <= j.x+117 && i.y >= j.y && i.y <= j.y+120){
          hp++;
          hp_package.shift();
          hp_up.play();
        }
      }

      proj_i++;
    }

    for (i of proj_shift){
      projectiles.splice(i, 1);
    }

    for (i of heli_shift){
      helis.splice(i, 1);
    }

    for (i of para_shift){
      paratroopers.splice(i, 1);
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
}

function main() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(bg, 0, 0)
  var i;
  for (i of main_obj) {
    i.draw()
  }
  if (gamestate == "main") {
    requestAnimationFrame(main)
  }
}

function menu() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(bg, 0, 0)
  var i;
  for (i of menu_obj) {
    if (i == sound_on || i == sound_off) {
      if (sound == 1) {
        sound_on.draw()
      }
      if (sound == 0) {
        sound_off.draw()
      }
    }
    if (i != sound_on || i != sound_off) {
      i.draw()
    }
  }
  if (gamestate == "menu") {
    requestAnimationFrame(menu)
  }
}

function gameover() {
  var i;
  for (i of over_obj) {
    i.draw()
  }
  ctx.font = "30px Courier"
  ctx.fillText(score, 400, 300)
  if (gamestate == "gameover") {
    requestAnimationFrame(gameover)
  }
}

main()
//animate();
