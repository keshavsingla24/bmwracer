var road,roadImage;
var barricade,barricadeImage,barricadeGroup;
var pothole,potholeImage,potholeGroup;
var BMW, BMWImage;
var ivBlock, ivBlockgroup


var gameState="play";

function preload() {
  roadImage = loadImage("road.png");
  barricadeImage = loadImage("barricade.png");
  potholeImage = loadImage("pothole.png");
  BMWImage = loadImage("BMW.png");
 
}

function setup() {
  createCanvas(600,600);
  
  road = createSprite(275,475);
  road.addImage(roadImage);
  road.velocityY=1;
  road.scale=3;

  barricadeGroup = new Group();
  potholeGroup = new Group();
  ivBlockgroup = new Group();
  
  BMW = createSprite(200,200,50,50);
  BMW.addImage(BMWImage);
  BMW.scale=0.3;
}

function draw() {
  background(0);
  
  if(gameState==="play") {
     
  if(road.y > 275) {
    road.y=300;
  }
  
  if(keyDown("space")) {
    BMW.velocityY=-5;
  }
   
  if(keyDown("left")) {
    BMW.x=BMW.x-3;
  }
  
  if(keyDown("right")) {
    BMW.x=BMW.x+3;
  }
  BMW.velocityY=BMW.velocityY+0.8;
   
  if(potholeGroup.isTouching(BMW)) {
     BMW.velocityY=0;
     }
  
   if(ivBlockgroup.isTouching(BMW) || BMW.y > 600) {
     BMW.destroy();
     gameState="end";
     }
  
  spawnbarricade();
  drawSprites();
  }
  if(gameState==="end") {
     textSize(30);
     text("GAME OVER",230,250);
     }
  
}

function spawnbarricade() {

  if(frameCount % 240===0) {
    barricade = createSprite(200,-50)
    barricade.addImage(barricadeImage);
    barricade.scale=0.3;
    
    pothole = createSprite(200,10)
    pothole.addImage(potholeImage);
    pothole.scale=0.5;

    ivBlock = createSprite(200,15)
    ivBlock.width=pothole.width;
    ivBlock.height=2;
    ivBlock.visible=false;
    barricade.x= Math.round(random(120,400))
    pothole.x=barricade.x;
    barricade.velocityY=1;
    ivBlock.x=barricade.x;
    ivBlock.velocityY=1;
    pothole.velocityY=1;
    barricade.lifetime=800;
    pothole.lifetime=800;
    ivBlock.lifetime=800;
    BMW.depth=barricade.depth
    BMW.depth+=1;
    
    
    
    barricadeGroup.add(barricade);
    potholeGroup.add(pothole);
    ivBlockgroup.add(ivBlock);
     }
  
}