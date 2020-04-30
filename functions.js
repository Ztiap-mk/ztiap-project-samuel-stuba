//renderovanie objektov
function animate() {
  if (gamestate == "menu") {
    play = new Button(150, 200, 100, 50, "red", "Play Game")
    settings = new Button(150, 300, 100, 50, "red", "Settings")
    play.draw()
    settings.draw()
  }
  if (gamestate == "settings") {
    crosshair = new Button(150, 200, 100, 50, "red", "Crosshair: On")
    sound = new Button(150, 300, 100, 50, "red", "Sounds: On")
    crosshair.draw()
    sound.draw()
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

    var dx = cross_x-turret.x,
    dy = cross_y-turret.y
    otoc = Math.atan2(dy, dx)+1.5

    console.log(otoc)

    turret.draw(otoc)
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
