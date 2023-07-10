import kaboom from "kaboom"
import "kaboom/global"

// initializing context
kaboom({
  background:[0, 0, 0, 1],
})

// loading assets
loadPedit("Henio", "sprites/Henio.pedit");
loadSprite("coin", "sprites/coin.jpeg");
loadSprite("bug", "sprites/bug.png");

//loading music
loadSound("score", "sounds/score.mp3");
loadSound("error", "sounds/error.mp3");
loadSound("gamemusic", "sounds/gamemusic.mp3");

// defining some game variables

const SPEED=620
const BSPEED= 4
let SCORE = 0
let scoreText;
let retryText;

//adding function to display score

const displayScore = () => {
  if (scoreText) {
    destroy(scoreText);
  }
  scoreText = add([
    text("Score: " + SCORE),
    scale(0.5),
  pos(width() - 150, height() / 7),
])
}

//adding Henio 

const Henio = add([
    sprite("Henio"),  
    pos(120, 80),
    area(),         
    scale(2),
])

// Adding events to Henio

onKeyDown("left", () => {
    Henio.move(-SPEED, 0)
})

onKeyDown("right", () => {
    Henio.move(SPEED, 0)
})

onKeyDown("up", () => {
    Henio.move(0, -SPEED)
})

onKeyDown("down", () => {
    Henio.move(0, SPEED)
})

//add bugs and coins on loops 

setInterval(() => {
  for(let i=0; i<3; i++){
    let x = rand(0, width())
    let y = height()
//bug
    let c = add([
      sprite('bug'),
      pos(x, y),
      area(),          
      scale(0.03),
      "bug"
    
    ])
c.onUpdate(() =>{
  c.moveTo(c.pos.x, c.pos.y - BSPEED)
})
    
  }

  let x = rand(0, width())
    let y = height()
  //coin
    let c = add([
      sprite('coin'),
      pos(x, y),
      area(),          
      scale(0.065),
      "coin"
    
    ])
c.onUpdate(() =>{
  c.moveTo(c.pos.x, c.pos.y - BSPEED)
})

}, 4000)

//adding game over

const retryScreen = () => { 
  
  retryText = add([
    text("Gave Over: Try again! :) "),
    scale(0.5),
  pos(width() - 900, height() / 3),
])
}

//adding functions on collisions with bugs and coins

Henio.onCollide("bug", () => {
    play('error')
    volume(0.7),
    destroy(Henio)
    addKaboom(Henio.pos)
    retryScreen()
    
})

Henio.onCollide("coin", (coin) => {
  play('score')
    volume(0.7),
  destroy(coin)
  SCORE += 1
  displayScore()
})

// Displaying the score
displayScore()

//Making music in the background
const playBackgroundMusic = () => {
  play("gamemusic", {
    loop: true,
    volume: 0.4, 
  });
};
playBackgroundMusic();