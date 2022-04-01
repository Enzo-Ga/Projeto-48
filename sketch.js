var canvas;
var player,monster,ghost,background,gameOver, reset;
var playerImg,backgroundImg,monsterImg,ghostImg, gameOverImg, resetImg, playerCollided;
var monsterGroup;
var Play = 0;
var End = 1;
var gameState = Play;
var score = 0;
var solo;


function preload(){
    playerImg = loadAnimation('link-01.png','link-02.png','link-03.png','link-04.png','link-05.png','link-06.png','link-07.png','link-08.png','link-09.png','link-10.png')
    playerCollided = loadAnimation('link-morte.png');
    backgroundImg = loadImage('background.png');
    gameOverImg = loadImage('gameOver.png');
    resetImg = loadImage('reset.png');
    monsterImg = loadAnimation('monster_01.png','monster_02.png','monster_03.png','monster_04.png','monster_05.png')
    ghostImg = loadAnimation('ghost01.png','ghost02.png','ghost03.png','ghost04.png','ghost05.png','ghost06.png','ghost07.png','ghost08.png',)
}


function setup(){
    canvas = createCanvas(windowWidth, windowHeight)
    background = createSprite(windowWidth/2,-100);
    background.addImage(backgroundImg);
    background.scale = 4;

    background.velocityX = -6;

    solo = createSprite(windowWidth/2, windowHeight-40,windowWidth,10);
    solo.visible = false;

    gameOver = createSprite(windowWidth/2,windowHeight/2);
    gameOver.addImage(gameOverImg);
    gameOver.visible = false;

    reset = createSprite(windowWidth/2, windowHeight/2+70);
    reset.addImage(resetImg);
    reset.scale = 0.15;
    reset.visible = false;

    monsterGroup = new Group();
    
    //criando o player 
    player = createSprite(windowWidth/5,windowHeight-100,50,50)
    player.addAnimation('link',playerImg);
    player.addAnimation('morte',playerCollided)
    player.scale = 2;
    player.debug = false;
    player.setCollider('rectangle',0,0,40,50)
}


function draw(){
if(gameState == Play){
    if(background.x < 0){
        background.x = windowWidth/2;
    }
    background.velocityX = -(6 + 3*score/300);

    if(keyDown("SPACE") && player.y > windowHeight-100 ){
        player.velocityY = -17;
    }

    player.velocityY = player.velocityY+ 0.65;


    player.collide(solo);

    spawnMonster();

    if(player.isTouching(monsterGroup)){
        gameState = End;
    }

    score = score+Math.round(frameCount/400);


}else if(gameState == End){
    background.velocityX = 0;
    player.velocityY = 0;
    player.changeAnimation("morte",playerCollided);

    monsterGroup.setVelocityXEach(0);
    monsterGroup.destroyEach();

    

    gameOver.visible = true;
    reset.visible = true;

    if(mousePressedOver(reset)){
        restart();
    }
}
    fill("white");
    drawSprites();
    textSize(30);
    text("Pontuação: "+ score,windowWidth -1350, windowHeight-600);
    
}

function spawnMonster(){
  if(frameCount % 100 == 0){ 
    var monster = createSprite(windowWidth+20,windowHeight-100,50,50);
    monster.velocityX = -6;
    monster.lifetime = 300;
    monster.debug = false;
    var num = Math.round(random(1,2));
    switch(num){
        case 1:monster.addAnimation('monster',monsterImg);
        monster.setCollider("rectangle",0,0,70,100);
        break;
        case 2:monster.addAnimation('ghost',ghostImg);
        monster.setCollider("rectangle",0,0,80,140);
        break;
        default: break;
    }
    monsterGroup.add(monster);

  }
}

function restart(){
    gameState = Play;

    player.changeAnimation("link",playerImg);

    monsterGroup.destroyEach();

    gameOver.visible = false;
    reset.visible = false;

    score = 0
}