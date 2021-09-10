var path, pathImg;
var mainPlayer, playerRunImg, playerLoseImg;
var opp;
var oppP, oppPRunImg, oppPLoseImg;
var oppY, oppYRunImg, oppYLoseImg;
var oppR, oppRRunImg, oppRLoseImg;
var pGroup, yGroup, rGroup;
var gameOver, gameOverImg, restart, restartImg, cyclebell;

var END = 0;
var PLAY = 1;
var gameState = PLAY;

var score = 0;

function preload() {
  pathImg = loadImage("Road.png");
  playerRunImg = loadAnimation("mainPlayer1.png", "mainPlayer2.png");
  playerLoseImg = loadAnimation("mainPlayer3.png");

  oppPRunImg = loadAnimation("opponent1.png", "opponent2.png");
  oppPLoseImg = loadAnimation("opponent3.png");

  oppYRunImg = loadAnimation("opponent4.png", "opponent5.png");
  oppYLoseImg = loadAnimation("opponent6.png");

  oppRRunImg = loadAnimation("opponent7.png", "opponent8.png");
  oppRLoseImg = loadAnimation("opponent9.png");

  cycleBell = loadSound("bell.mp3");
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {

  createCanvas(1200, 300);

  path = createSprite(100, 150);
  path.addImage(pathImg);
  path.velocityX = -5;

  mainPlayer = createSprite(70, 150);
  mainPlayer.addAnimation("pr", playerRunImg);
  mainPlayer.addAnimation("pl", playerLoseImg);
  mainPlayer.scale = 0.07;

  oppR = createSprite(70, 150);
  oppR.addAnimation("or", oppRRunImg);
  oppR.addAnimation("rl", oppRLoseImg);
  oppR.visible = false;

  oppP = createSprite(70, 150);
  oppP.addAnimation("op", oppPRunImg);
  oppP.addAnimation("pl", oppPLoseImg);
  oppP.visible = false;

  oppY = createSprite(70, 150);
  oppY.addAnimation("oy", oppYRunImg);
  oppY.addAnimation("yl", oppYLoseImg);
  oppY.visible = false;


  gameOver = createSprite(500, 100);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.6;
  gameOver.visible = false;

  restart = createSprite(500, 190);
  restart.addImage(restartImg);
  restart.scale = 0.5;
  restart.visible = false;

  rGroup = new Group();
  yGroup = new Group();
  pGroup = new Group();

}

function draw() {
  background(0);
  textSize(20);
  fill(255);
  score = score+Math.round(frameCount/60);
  if (gameState == PLAY) {
    path.velocityX = -6;
    if (path.x < 0) {
      path.x = width / 2;
    }
    mainPlayer.y = mouseY;

    if (keyDown("space")) {
      cycleBell.play();
    }

    if (frameCount % 100 == 0) {
      createOpponent();
    }

    if (rGroup.isTouching(mainPlayer)) {
      oppR.changeAnimation("rl", oppRLoseImg);
      oppR.velocityX = 0;
      pGroup.destroyEach();
      yGroup.destroyEach();
      gameState = END;
    }

    if (pGroup.isTouching(mainPlayer)) {
      oppP.changeAnimation("pl", oppPLoseImg);
      oppP.velocityX = 0;
      rGroup.destroyEach();
      yGroup.destroyEach();
      gameState = END;
    }

    if (yGroup.isTouching(mainPlayer)) {
      oppY.changeAnimation("yl", oppYLoseImg);
      oppY.velocityX = 0;
      pGroup.destroyEach();
      rGroup.destroyEach();
      gameState = END;
    }

  } else if (gameState == END) {
    gameState = END;
    score = 0;
    mainPlayer.changeAnimation("pl", playerLoseImg);
    path.velocityX = 0;
    mainPlayer.velocityY = 0;
    gameOver.visible = true;
    restart.visible = true;
    if(mousePressedOver(restart)){
      gameRestart();
    }
  }

  drawSprites();
  text("Distance: " + score, 900, 30);
}

function createOpponent() {
  var r = Math.round(random(1, 3));
  console.log(r);

  switch (r) {
    case 1:
      oppP.visible = true;
      oppP.x = Math.round(random(300, 1000));
      oppP.y = Math.round(random(80, 260));
      oppP.scale = 0.07;
      oppP.changeAnimation("op", oppPRunImg);
      oppP.velocityX = -6;
      pGroup.add(oppP);
      break;

    case 2:
      oppY.visible = true;
      oppY.x = Math.round(random(300, 1000));
      oppY.y = Math.round(random(80, 260));
      oppY.scale = 0.07;
      oppY.changeAnimation("op", oppYRunImg);
      oppY.velocityX = -6;
      yGroup.add(oppY);
      break;

    case 3:
      oppR.visible = true;
      oppR.x = Math.round(random(300, 1000));
      oppR.y = Math.round(random(80, 260));
      oppR.scale = 0.07;
      oppR.changeAnimation("or", oppRRunImg);
      oppR.velocityX = -6;
      rGroup.add(oppR);
      break;
  }
}

function gameRestart(){
  console.log("Reset");
  gameState = PLAY;
  score = 0;
  mainPlayer.changeAnimation("pr",playerRunImg);
  rGroup.destroyEach();
  yGroup.destroyEach();
  pGroup.destroyEach();
  gameOver.visible = false;
  restart.visible = false;
}


