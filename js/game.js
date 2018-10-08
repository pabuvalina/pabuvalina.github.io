var cvs = document.getElementById("playground");
var ctx = cvs.getContext("2d");

// графика
var flappy_hse_logo = new Image();
var flappy_hse_bg = new Image();
var flappy_hse_fg = new Image();
var flappy_hse_pipeUp = new Image();
var flappy_hse_pipeBottom = new Image();
var iconbig = new Image();

flappy_hse_logo.src = "img/flappy_hse_logo.png";
flappy_hse_bg.src = "img/flappy_hse_bg.png";
flappy_hse_fg.src = "img/flappy_hse_fg.png";
flappy_hse_pipeUp.src = "img/flappy_hse_pipeUp.png";
flappy_hse_pipeBottom.src = "img/flappy_hse_pipeBottom.png";
iconbig.src = "img/iconbig.png";

// аудио
var fly = new Audio();
var score_audio = new Audio();
var gameover = new Audio();

fly.src = "audio/fly.mp3";
score_audio.src = "audio/score.mp3";
gameover.src = "gameover.mp3";


// зазор между блоками
var gap = 90;

// тык-тык по любой кнопке
document.addEventListener("keydown", moveUp);
function moveUp() {
  yPos -= 30;
  fly.play();
}

// блоки
var pipe = [];
pipe[0] = {
  x : cvs.width,
  y : 0
}

var score = 0;

// позиция логотипа
var xPos = 10;
var yPos = 150;
var grav = 1.5;

function draw() {
  ctx.drawImage(flappy_hse_bg, 0, 0);

  for(var i = 0; i < pipe.length; i++) {
  ctx.drawImage(flappy_hse_pipeUp, pipe[i].x, pipe[i].y);
  ctx.drawImage(flappy_hse_pipeBottom, pipe[i].x, pipe[i].y + flappy_hse_pipeUp.height + gap);

// препятствия
  pipe[i].x--;

  if(pipe[i].x == 115) {
    pipe.push({
      x : cvs.width,
      y : Math.floor(Math.random() * flappy_hse_pipeUp.height) - flappy_hse_pipeUp.height
    })
  }

  if(xPos+flappy_hse_logo.width >= pipe[i].x
  && xPos <= pipe[i].x + flappy_hse_pipeUp.width
  && (yPos <= pipe[i].y + flappy_hse_pipeUp.height
   || yPos + flappy_hse_logo.height >= pipe [i].y + flappy_hse_pipeUp.height + gap)
   || yPos + flappy_hse_logo.height >= cvs.height - flappy_hse_fg.height) {
     location.reload();
   } // пролезает ли птичка в проход, если нет - остановка


      if(pipe[i].x == 5) {
        score++;
        score_audio.play();
      }

}
  ctx.drawImage(flappy_hse_fg, 0, cvs.height - flappy_hse_fg.height);
  ctx.drawImage(flappy_hse_logo, xPos, yPos);

  yPos += grav;

// счёт
ctx.fillStyle = "#FFF";
ctx.font = "26px Verdana";
ctx.fillText("Exams passed: " + score, 10, cvs.height - 20)

  requestAnimationFrame(draw);
}

flappy_hse_pipeBottom.onload = draw; // первоначальная загрузка графики
