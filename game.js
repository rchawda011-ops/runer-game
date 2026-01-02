const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let player = { x:160, y:520, w:40, h:40, dy:0, jump:false };
let gravity = 0.8;
let obstacles = [];
let score = 0;

function spawnObstacle(){
  obstacles.push({ x:360, y:540, w:40, h:40 });
}
setInterval(spawnObstacle, 1500);

function loop(){
  ctx.clearRect(0,0,360,640);

  player.dy += gravity;
  player.y += player.dy;
  if(player.y > 520){ player.y=520; player.jump=false; }

  ctx.fillStyle="yellow";
  ctx.fillRect(player.x,player.y,player.w,player.h);

  ctx.fillStyle="red";
  obstacles.forEach((o,i)=>{
    o.x -= 4;
    ctx.fillRect(o.x,o.y,o.w,o.h);

    if(
      player.x < o.x+o.w &&
      player.x+player.w > o.x &&
      player.y < o.y+o.h &&
      player.y+player.h > o.y
    ){
      alert("Game Over! Score: "+score);
      location.reload();
    }

    if(o.x < -40){
      obstacles.splice(i,1);
      score++;
    }
  });

  ctx.fillStyle="#fff";
  ctx.font="20px Arial";
  ctx.fillText("Score: "+score, 20,30);

  requestAnimationFrame(loop);
}

document.addEventListener("touchstart",()=>{
  if(!player.jump){
    player.dy=-14;
    player.jump=true;
  }
});

loop();
