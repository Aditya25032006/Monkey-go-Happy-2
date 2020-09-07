var PLAY = 1;
var END = 0 ;
var gameState = 1;



var Monkey, Monkey_running ;

var scene , sceneImage ;

var invisbleGround ;

var bananaGroup , bananaImage ; 

var stoneGroup , stoneImage ;

var count ;

function preload() {
  
   sceneImage = loadImage("jungle.jpg");
  
  Monkey_running = loadAnimation("Monkey_01.png" , "Monkey_02.png" , "Monkey_03.png" , "Monkey_04.png" , "Monkey_05.png" , "Monkey_06.png" , "Monkey_07.png" , "Monkey_08.png" , "Monkey_09.png" , "Monkey_10.png");
  

  
  stoneImage = loadImage("stone.png");
  
  bananaImage = loadImage("banana.png");
  
}


function setup() {
  createCanvas(400, 400);
  
   Monkey = createSprite(50, 360, 20, 50);
  Monkey.addAnimation("running",Monkey_running);
  
  Monkey.scale = 0.11;
  
  scene = createSprite(400,200,800,400);
  scene.addImage("scene",sceneImage);
  
  scene.velocityX = -2 ;
  scene.scale = 1;
  scene.x = scene.width / 2;
  scene.depth = Monkey.depth;
  Monkey.depth = Monkey.depth+1;
  
  
  invisibleGround = createSprite(200,360,400,10);
  invisibleGround.visible= false ;
  
  bananaGroup = new Group();
  
  stoneGroup = new Group();
  
  count = 0 ;
  
}

function draw() {
  background("white");
  
  if(scene.x < 0) {
    scene.x = scene.width/2 ;
     }
  
  
  
  if(gameState === 1) {
    
    
     if(keyWentDown("space") && Monkey.y >300) {
    Monkey.velocityY = -10;
     }
  
  if(Monkey.isTouching(bananaGroup)) {
    Monkey.scale = Monkey.scale +0.02;
    bananaGroup.destroyEach();
     }
  
  count = count+(Math.round(getFrameRate()/60));
    
    spawnFruit();
  spawnObstacle();
    
    if(stoneGroup.isTouching(Monkey)  ) {
      gameState = 0;
    }
    
     }else if(gameState === 0 ) {
     
       count = 0;
       
       Monkey.changeAnimation();
       
     scene.velocityX = 0;
     stoneGroup.setVelocityXEach(0);  
     stoneGroup.setLifetimeEach(-1);
       
     bananaGroup.setVelocityXEach(0);
     bananaGroup.setLifetimeEach(-1); 
       
       if(keyDown("R")) {
       reset();
       }
       textSize(20);
       stroke ("white");
       
     }
  
  
  
 
  
  Monkey.velocityY = Monkey.velocityY + 0.8; 
  
  
  
  console.log(Monkey.scale);
  
  Monkey.collide(invisibleGround);
  
  
  drawSprites();
  
  if(gameState === 0) {
  text("PRESS R to RESTART THE GAME",50,200);
  }
  
  textSize(20);
  stroke("black");
  text("Score : "+count,280,50);
}

function spawnFruit() {
  if(frameCount % 60 === 0) {
    var banana = createSprite(400,320,40,10);
    banana.y = Math.round(random(200,280));
    banana.addImage(bananaImage);
    banana.scale = 0.05; 
    banana.velocityX = -3;
    
    bananaGroup.add(banana);
     }
}


function spawnObstacle() {
 if(frameCount % 150 === 0 ) {
   var stone = createSprite(400,350,40,10);
   stone.addImage(stoneImage);
   stone.velocityX = -3;
   stone.scale = 0.15;
   
   stoneGroup.add(stone);
 }
}


function reset() {

  gameState = 1;
  scene.velocityX=-3;
  bananaGroup.setVelocityXEach (-3);
  bananaGroup.setLifetimeEach(0);
  stoneGroup.setVelocityXEach(-3);
  stoneGroup.setLifetimeEach(0);
  
}




