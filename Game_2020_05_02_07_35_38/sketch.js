var rex, reximg, ground,groundimg,invisibleground,cloudimg,ob1,ob2,ob3,ob4,ob5,ob6,clgroup,obgroup,score,gamestate,rexlose,reset,resetimg,game, gameimg;

function preload (){
  reximg = loadAnimation ("trex1.png","trex3.png","trex4.png");
  groundimg = loadImage ("ground2.png");
  cloudimg = loadImage ("cloud.png");
  gameimg = loadImage ("gameOver.png");
  resetimg = loadImage ("restart.png");
  ob1 = loadImage ("obstacle1.png");
  ob2 = loadImage ("obstacle2.png");
  ob3 = loadImage ("obstacle3.png");
  ob4 = loadImage ("obstacle4.png");
  ob5 = loadImage ("obstacle5.png");
  ob6 = loadImage ("obstacle6.png");
  rexlose = loadImage ("trex_collided.png");
}

function setup() {
  createCanvas(2400,200);
  rex = createSprite (20,190,10,10);
  game = createSprite (600,50,10,10);
  reset = createSprite (600,100,5,5);
  rex.addAnimation("running",reximg);
  rex.addAnimation("trex_collided",rexlose);
  game.addImage (gameimg);
  reset.addImage (resetimg);
  reset.scale = 0.4;
  game.visible = false;
  reset.visible = false;
  rex.scale = 0.4;
  ground = createSprite (1200, 190, 2400, 10);
  ground.addImage (groundimg);
  invisibleground = createSprite (1200, 196, 2400, 10);
  invisibleground.visible = false;
  clgroup = new Group ();
  obgroup = new Group ();
  score = 0;
  gamestate = "play";
}

function draw() {
  background(255,255,255);
  drawSprites();
  if (gamestate === "play"){
    if (keyDown("space")&&rex.y >= 172.2){
    rex.velocityY = -12;
  }

  rex.velocityY = rex.velocityY +1;
  ground.velocityX = -7;
  if (ground.x <=0){
    ground.x=ground.width/2;
  }
  spawnclouds ();
  spawnobstacles ();
  score = score +1;
  text (score,595,10);
    if (obgroup.isTouching(rex)){
      gamestate = "stop";
    }
  }
  else if (gamestate==="stop"){
    ground.velocityX = 0;
    obgroup.setVelocityXEach (0);
    clgroup.setVelocityXEach (0);
    rex.velocityY = 0;
    rex.changeAnimation ("trex_collided",rexlose);
    game.visible = true;
    reset.visible = true;
  }
  if (mousePressedOver(reset)){
    clgroup.destroyEach();
    obgroup.destroyEach();
    rex.changeAnimation("running",reximg);
    reset.visible = false;
    game.visible = false;
    gamestate = "play";
    score = 0;
  }
  rex.collide (invisibleground);
}
function spawnclouds (){
  if (frameCount%50 === 0){
    var cloud = createSprite (2400,random(25,102),10,10);
    cloud.addImage (cloudimg);
    cloud.scale = 0.4;
    cloud.velocityX = -5;
    clgroup.add(cloud);
  }
}
function spawnobstacles (){
  if (frameCount%50=== 0){
    var obstacle = createSprite (2400,180,10,10);
    var r = Math.round(random(1,6));
    switch (r){
      case 1: obstacle.addImage (ob1);
      break;
      case 2: obstacle.addImage (ob2);
      break;
      case 3: obstacle.addImage (ob3);
      break;
      case 4: obstacle.addImage (ob4);
      break;
      case 5: obstacle.addImage (ob5);
      break;
      case 6: obstacle.addImage (ob6);
      break;
      default: break;
    }
    obstacle.scale = 0.4;
    obstacle.velocityX = -7;
    obgroup.add(obstacle);
  }
}