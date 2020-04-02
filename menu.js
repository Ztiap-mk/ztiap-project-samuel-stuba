var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var rect = {x: 150, y: 200, w: 100, h: 50};

canvas.onclick = function(event) {
  var x = event.pageX - canvas.offsetLeft
  var y = event.pageY - canvas.offsetTop
  if ((x >= rect.x && x <= rect.x + rect.w) && (y >= rect.y && y <= rect.y + rect.h)) {
    window.open("paratrooper.html")
  }
}

ctx.fillStyle = "red";
ctx.fillRect(rect.x, rect.y, rect.w, rect.h);

ctx.fillStyle = "black";
ctx.font = "20px Arial";
ctx.textAlign = "center";
ctx.fillText("Play Game", rect.x+50, rect.y+30);
