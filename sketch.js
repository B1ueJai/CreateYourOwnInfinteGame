var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0, score = 0;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var cashG,diamondsG,jwelleryG,swordGroup,treasureGroup;
var endImg;
var edges;


//Game States
var PLAY = 1;
var END = 0;
var gameState = 1;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg = loadAnimation("gameOver.png");

  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("Obstacle8.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("Obstacle7.png");
  obstacle6 = loadImage("obstacle6.png");
  
}

function setup(){
  
  createCanvas(400,600);
  // Moving background
  path=createSprite(200,200);
  path.addImage(pathImg);
  path.velocityY = 4;


  //creating boy running
  boy = createSprite(70,580,20,20);
  boy.addAnimation("SahilRunning",boyImg);
  boy.scale = 0.08;
  
  cashG=new Group();
  diamondsG=new Group();
  jwelleryG=new Group();
  swordGroup=new Group();
  obstaclesGroup = new Group();
  treasureGroup = new Group();

}

function draw() {

  if(gameState === PLAY){
  
    background(0);
    boy.x = World.mouseX;
  
    edges= createEdgeSprites();
    boy.collide(edges);
  
  //code to reset the background
    if(path.y > 400 ){
      path.y = height/2;
    }
    
    spawnObstacles();
    spawnTreasure();

    if (treasureGroup.isTouching(boy)) {
      treasureGroup.destroyEach();
      score = score + 100;
    }

    if (obstaclesGroup.isTouching(boy)) {
      gameState = END;
      treasureGroup.destroyEach();
      obstaclesGroup.destroyEach();    
      boy.x = 200;
      boy.y = 300;
      boy.addAnimation("SahilRunning", endImg);
      boy.scale = 1;
      path.velocityY = 0;
    }
  }
  drawSprites();
  fill(255);
  text("Score: "+ score,300,30);
}


function spawnObstacles(){
  if (World.frameCount % 200 == 0){
    var obstacle = createSprite(Math.round(random(50, 350),40, 10, 10));
    obstacle.velocityY =  Math.round(random(5, 10)); //-(6 + Math.round(random(-500, 500))/100);
    
    //assign scale and lifetime to the obstacle           
    obstacle.lifetime = 150;
        
     //generate random obstacles
     var rand = Math.round(random(1,6));
     switch(rand) {
       case 1: obstacle.addImage(swordImg);
               obstacle.scale = 0.2;
               break;
       case 2: obstacle.addImage(obstacle1);
               obstacle.scale = 0.25;
               break;
       case 3: obstacle.addImage(obstacle2);
               obstacle.scale = 0.5;
               break;
       case 4: obstacle.addImage(obstacle3);
               obstacle.scale = 0.3;
               break;
       case 5: obstacle.addImage(obstacle4);
               obstacle.scale = 0.3;
               break;
       case 6: obstacle.addImage(obstacle6);
                obstacle.scale = 0.7;
               break;
       default: break;
     }
  
    //add each obstacle to the group
     obstaclesGroup.add(obstacle);
     
    obstacle.setCollider("rectangle",5,5,obstacle.width,obstacle.height);
    obstacle.debug = false;
  }
 }

 function spawnTreasure(){
  if (World.frameCount % 250 == 0){
    var treasure = createSprite(Math.round(random(50, 300),40, 10, 10));
    treasure.velocityY =  Math.round(random(5, 10)); //-(6 + Math.round(random(-500, 500))/100);
    
    //assign scale and lifetime to the obstacle           
    treasure.scale = 0.13;
    treasure.lifetime = 150;    
    //generate random obstacles
    var rand = Math.round(random(1,3));
    switch(rand) {
       case 1: treasure.addImage(jwelleryImg);
               break;
       case 2: treasure.addImage(diamondsImg);
               treasure.scale = 0.03;
               break;
       case 3: treasure.addImage(cashImg);
               break;
       default: break;
     }
    
    //add each obstacle to the group
     treasureGroup.add(treasure);
  }
 }