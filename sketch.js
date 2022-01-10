var hypnoticBall, database;
//declarar position para consertar o erro
var position;


function setup(){
  database = firebase.database();
  console.log(database);
  createCanvas(500,500);

  hypnoticBall = createSprite(250,250,10,10);
  hypnoticBall.shapeColor = "red";

//.ref é para localizar
  var hypnoticBallPosition = database.ref('bola/position');
//.on é para acompanhar as mudanças, um ouvinte
  hypnoticBallPosition.on("value", readPosition, showError);
}

function draw(){
  background("white");
  if(position !== undefined)
  {
    if(keyDown(LEFT_ARROW)){
      writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
      writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
      writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
      writePosition(0,+1);
    }

  }
  
    drawSprites();
  
}

//as aspas é para dizer que o x e o y foram tirados do database ball/position
function writePosition(x,y){
  database.ref('bola/position').set({
    'x': position.x + x ,
    'y': position.y + y 
  })
}

//ler a posição da bola para o sprite no banco de dados
function readPosition(data){
  //ler a posição do valor no banco de dados
  position = data.val();
  console.log(position.x);
  hypnoticBall.x = position.x;
  hypnoticBall.y = position.y;
}

function showError(){
  console.log("Error in writing to the database");
}
