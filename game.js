//setting up canvas
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

//main variables
let score = 0;
let dir;
let timeLeft = 6;
let game;
let timer;
let toBeat = 0;

//defining object images
const playerImg = new Image();
playerImg.src = 'player.png'

const foodImg = new Image();
foodImg.src = 'potato.png';

//defining objects
let player = {
  x: 100,
  y: 100
}
let food = {
  x: Math.floor(Math.random() * 900),
  y: Math.floor(Math.random() * 400)
}

//movement
document.addEventListener('keydown', direction);
function direction(event){
  if(event.keyCode == 37)
    dir = 'left';
  else if(event.keyCode == 38)
    dir = 'up';
  else if(event.keyCode == 39)
    dir = 'right';
  else if(event.keyCode == 40)
    dir = 'down';
}

//instructions
ctx.fillStyle = "black";
ctx.font = "60px Arial";
ctx.fillText("press space to start", 220, 280);

//if space is pressed the game will start
document.addEventListener('keydown', start);

function start(event){
  if(event.keyCode == 32){
    timeLeft = 6;
    score = 0;
    dir = "";

    food = {
      x: Math.floor(Math.random() * 900),
      y: Math.floor(Math.random() * 400)
    }
    player = {
      x: 100,
      y: 100
    }

    timer = setInterval(timerF, 1000);
    game = setInterval(drawGame, 1);
  }
}

//defines a timer
function timerF(){
  timeLeft -= 1;
}

//main game code. Function is called every 100 milliseconds
function drawGame(){
  //erasing previous frame
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //drawing game objects
  ctx.drawImage(foodImg, food.x, food.y);
  ctx.drawImage(playerImg, player.x, player.y);

  //moving food to random position if you eat it
  if(player.x <= food.x + 20 && player.x >= food.x - 60 && player.y <= food.y + 30 && player.y >= food.y - 90){
    score++;
    food = {
      x: Math.floor(Math.random() * 900),
      y: Math.floor(Math.random() * 400)
    }
    timeLeft = 5;
  }

  //moving the player
  let speed = 1 + score / 10;

  if(dir == "left")
    player.x -= speed;
  if(dir == "right")
    player.x += speed;
  if(dir == "down")
    player.y += speed;
  if(dir == "up")
    player.y -= speed;

  //displaying the score
  ctx.fillStyle = "black";
  ctx.font = "60px Arial";

  ctx.fillText(score, 20, 50);
  ctx.fillText(timeLeft, 950, 50);

  ctx.font = "40px Arial";
  ctx.fillText("record: " + toBeat, 390, 40);

  //game over
  if(timeLeft <= 0){
    //writing game over
    ctx.font = "70px Arial";
    ctx.fillText("Game over", 280, 280);

    //finishing the game
    clearInterval(game);
    clearInterval(timer);

    // checking if the record was beaten
    if(toBeat < score){
      toBeat = score;
    }
  }
}
