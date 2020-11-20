  //declairing variables

  var PLAY = 1;

  var END = 0;

  var gameState = 1;

  var sword, swordImage;

  var monster;

  var gameover;

  var fruit1;

  var fruit2;

  var fruit3;

  var fruit4;

  var fruitGroup;

  var enemyGroup;

  var  knifeSwooshSound;

  var gameOverSound;

function preload(){
  
  //loading the image in function preload
  
  swordImage = loadImage ("sword.png");
  
  monsterImage = loadAnimation("alien1.png", "alien2.png");
  
  gameOverImage = loadImage("gameover.png");
  
   fruit1= loadImage('fruit1.png');
  
   fruit2= loadImage('fruit2.png');
  
   fruit3= loadImage('fruit3.png');
  
   fruit4= loadImage('fruit4.png');
  
  knifeSwooshSound = loadSound("knifeSwooshSound.mp3");
  
  gameOverSound = loadSound("gameover.mp3");

  
}

function setup(){
  
  createCanvas(600,600);
  
  //adding my code
  
  sword = createSprite(40, 200, 20, 20);
  sword.addImage(swordImage);
  sword.scale = 0.7
  
  fruitGroup = createGroup();
  enemyGroup = createGroup();
  
  gameOver = createSprite(300, 300, 30, 30);
  gameOver.addImage(gameOverImage);
  gameOver.scale = 3;
  
  score=0;
   
}

function draw(){
  
  background('rgb(0,255,0)');
  
  text('score: '+ score, 500,50);
  
  if(gameState=== PLAY){
    
    gameOver.visible = false;
    
    sword.x= World.mouseX;
    sword.y= World.mouseY;
    
    fruits();
    enemy();
    
    if(fruitGroup.isTouching(sword)){
      knifeSwooshSound.play();
      fruitGroup.destroyEach();
      score= score+6;
    }
    
    if(enemyGroup.isTouching(sword)){
      
       gameState= END;
      
      gameOverSound.play();
     
    sword.addImage(gameOverImage);
    sword.x=200;
    sword.y=200;
      
    }
    
  }
  else if (gameState=== END){
    
    
     
    
    fruitGroup.destroyEach();
    enemyGroup.destroyEach();
     
    fruitGroup.setVelocityXEach(0);
    enemyGroup.setVelocityXEach(0);
    
  
  }
  
  drawSprites();
}

function enemy(){
  
  if(World.frameCount%200===0){
    
    monster = createSprite(400, 200, 20, 20);
    monster.addAnimation("moving", monsterImage);
    monster.y = Math.round(random(100,300));
    monster.velocityX = -(8+(score/10));
    monster.setLifeTime = 50;
     
    enemyGroup.add(monster);
     
     }
  
}

function fruits(){
  if(World.frameCount%80===0){
    position = Math.round(random(1,2));
    fruit= createSprite(400,200,20,20);
    fruit.scale= 0.2;               
    
    if(position===1){
       
       fruit.x = 400;
      fruit.velocityX = -(7+(score/4));       
       }else if(position===2){
         
         fruit.x = 0;
         fruit.velocityX = (7+(score/4));
       }
    
    var rand= Math.round(random(1,4));
    if (rand===1){
      fruit.addImage( fruit1);
    }else if (rand===2){
      fruit.addImage( fruit2);
    }else if (rand===3){
      fruit.addImage( fruit3);
    }else {
      fruit.addImage( fruit4);
    }
    
    fruit.y= Math.round(random(50,340));
    
    fruit.velocityX= -7;
    fruit.setLifetime= 100;
    
    fruitGroup.add(fruit);
   }
}
