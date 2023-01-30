var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var restart
var gameover
var cloud, cloudImage;
var score = 0
var obsitcal 
var rand
var newImage;
var PLAY = 1
var gamestate = PLAY
var END = 0
var obstaclegroup
var cloudgroup
var background_sky
function preload(){
  trex_running = loadAnimation("Snake.png");
  trex_collided = loadAnimation("Snake.png");
  
  groundImage = loadImage("ground2.png");
  restart = loadImage("restart.png")
  gameover = loadImage("gameOver.png")
  cloudImage = loadImage("cloud.png");
  obstacleImage = loadImage("beartrap.png")
  obstacleImage2 = loadImage("beartrap.png")
  obstacleImage3 = loadImage("beartrap.png")
  obstacleImage4 = loadImage("beartrap.png")
  obstacleImage5 = loadImage("beartrap.png")
  obstacleImage6 = loadImage("beartrap.png")
  background_sky = loadImage("background.jpeg")
}

function setup() {
  createCanvas(600, 200);

  trex = createSprite(50,145,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided)
  trex.scale = 0.1;
  //trex.debug = true
  restartbutton = createSprite(300,100)
  restartbutton.addImage(restart)
  restartbutton.scale = .5

  gameovertext = createSprite(300,20)
  gameovertext.addImage(gameover)
  gameovertext.scale = .5

  trex.setCollider("circle",0,0,30)
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  ground.visible = false
  
  invisibleGround = createSprite(200,180,400,10);
  invisibleGround.visible = false;
  
  console.log("Hello"+ 5)
  obstaclegroup = new Group()
    cloudgroup = new Group()
  
}

function draw() {
  background(500);
  textSize(24)
  background(background_sky)
  text ("Score = "+ score, 50, 20)
  
  
  
  trex.collide(invisibleGround);

  if (gamestate===PLAY) {
    if(keyDown("space")&& trex.y >= 150) {
      trex.velocityY = -14;
      
    }
    gameovertext.visible = false
    restartbutton.visible = false
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
    
  }
  score = score + Math.round(frameCount / 60)
  spawnClouds();
  spawnObstacle();
  if (trex.isTouching(obstaclegroup)) {

gamestate = END

  }
  
  }



  else if (gamestate===END) {
    gameovertext.visible = true
    restartbutton.visible = true
ground.velocityX = 0
cloudgroup.setVelocityXEach(0)
obstaclegroup.setVelocityXEach(0)
trex.velocityY = 0
cloudgroup.setLifetimeEach(-1)
obstaclegroup.setLifetimeEach(-1)
trex.changeAnimation("collided", trex_collided)

  }
  //spawn the clouds
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,100,40,10);
    cloud.addImage(cloudImage)
    cloud.y = Math.round(random(10,60))
    cloud.scale = 0.4;
    cloud.velocityX = -3;
    cloudgroup.add(cloud)
    
    //assigning lifetime to the variable
    cloud.lifetime = 200
    
    //adjust the depth  
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1;
    }
}

function spawnObstacle() {
if (frameCount % 80 === 0) {
  obstacle = createSprite(600, 160, 30, 30 )
  obstacle.scale = .13
obstacle.velocityX = -4
rand = Math.round(random(1,6))
switch(rand){
case 1: obstacle.addImage(obstacleImage)
break;
case 2: obstacle.addImage(obstacleImage2)
break;
case 3: obstacle.addImage(obstacleImage3)
break;
case 4: obstacle.addImage(obstacleImage4)
break;
case 5: obstacle.addImage(obstacleImage5)
break;
case 6: obstacle.addImage(obstacleImage6)
break;
default:break
}
obstacle.lifetime = 200
obstaclegroup.add(obstacle)
}

}

