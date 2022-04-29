var x = 25; //Posicion x de la pelota
var y = 250; //Posicion y de la pelota
var dx = 1.5; //Direccion en x de la pelota
var dy = -4; // direccion en y de la pelota
var ctx; //Usado para almacenar el contexto 2d de canvas
var WIDTH; //Variable que almacena el ancho de la pantalla
var HEIGHT; //Variable que almacena el alto de la pantalla
var paddlex; //Posicion X de la barra
var paddleh = 10; //Alto de la barra
var paddlew = 75; //Ancho de la barra
var rightDown = false; //Variable que almacena si se pulsa la flecha de direccion derecha
var leftDown = false; //Variable que almacena si se pulsa la flecha de direccion izquierda
var canvasMinX = 0; //Menor posicion de X en canvas
var canvasMaxX = 0; //Mayor posicion de X del canvas
var intervalId = 0; //Usado para almacenar la partida
var bricks; //Variable usada para crear los cuadrados
var NROWS = 3; //Numero de filas de cuadrados
var NCOLS = 5; //Numero de columnas de cuadrados
var BRICKWIDTH; //variable usada para almacenar el ancho de los cubos
var BRICKHEIGHT = 15; //Alto de los cubos
var PADDING = 1; //Distancia entre bloques
var marcador=0; //Variable usada para almacenar los puntos
var restantes = NROWS * NCOLS; // Numero de bloques totales, usada para restarle 1 cada vez que se rompe un bloque y asi saber los restantes
var nivel = 1; //Almacena el nivel en el que estamos jugando
var vidas = 3;
var puedoReiniciar = false; //Variable que regula cuando se puede reiniciar (solo permitido entre pantallas)
var cambioNick = false; //Variable que regula cuando se puede cambiar el nick(solo disponible entre distintas partidas)
var nick = prompt("Introduce tu nick"); //Variable que almacena el nick del usuario que esta jugando

function init() {
  canvas = document.getElementById("canvas");
  canvas.width = 300;
  canvas.height = 500;
  ctx = canvas.getContext("2d");
  WIDTH = $("#canvas").width();
  HEIGHT = $("#canvas").height();
  paddlex = WIDTH / 2;
  BRICKWIDTH = (WIDTH/NCOLS) - 1;
  canvasMinX = $("#canvas").offset().left;
  canvasMaxX = canvasMinX + WIDTH;
  //aqui construimos los ladrillos
  initbricks();
  intervalId = setInterval(draw, 10);
  return intervalId;
}

function circle(x,y,r) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI*2, true);
  ctx.closePath();
  ctx.fill();
}

function rect(x,y,w,h) {
  ctx.beginPath();
  ctx.rect(x,y,w,h);
  ctx.closePath();
  ctx.fill();
}

function clear() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  rect(0,0,WIDTH,HEIGHT);
		
}

function ajustarDificultad(cols, rows, ndx, ndy){
	NCOLS = cols; //Cambiamos el numero de columnas
	NROWS = rows; //Cambiamos el numero de columnas
  dx = ndx; //Añadimos velocidad en el eje x
	dy = ndy; //Añadimos velocidad en el eje y
}

function onKeyDown(evt) {
    if (evt.keyCode == 39) rightDown = true; //Pulsar flecha de direccion derecha
    else if (evt.keyCode == 37) leftDown = true; //Pulsar flecha de direccion izquierda
    else if (evt.keyCode == 80 && puedoReiniciar == true) { // Pulsar "P"
    	ctx.fillStyle = "000000" // Ponemos el fondo en negro
    	clearInterval(intervalId); //Finalizamos el juego anterior
    	if (nivel == 1) {
			ajustarDificultad(5, 3, 1.5, -4);
    	} else if (nivel == 2) {
    		ajustarDificultad(5, 4, 2, -4.5);
    	} else if (nivel == 3) {
    		ajustarDificultad(6, 6, 2.7, -5.2);
    	}
    	//Reestablezemos valores a valores por defecto
		x = 25; 
		y = 250;
		restantes = NROWS * NCOLS;

			puedoReiniciar = false;
			cambioNick = false;


    	init(); //Lanzamos de nuevo el juego con las nuevas filas y columnas
    }
    else if (evt.keyCode == 76 && cambioNick == true) { // Pulsar "P"
    	nick = prompt("Introduce tu nuevo nick");
    }

}

function onKeyUp(evt) {
  if (evt.keyCode == 39) rightDown = false;
  else if (evt.keyCode == 37) leftDown = false;
}

$(document).keydown(onKeyDown);
$(document).keyup(onKeyUp);

function onMouseMove(evt) {
  if (evt.pageX > canvasMinX && evt.pageX < canvasMaxX) {
    paddlex = Math.max(evt.pageX - canvasMinX - (paddlew/2), 0);
    paddlex = Math.min(WIDTH - paddlew, paddlex);
  }
}

$(document).mousemove(onMouseMove);

//Crea un array booleano, donde 1 significa que ese cuadrado esta sin golpear
function initbricks() {
    bricks = new Array(NROWS);
    for (i=0; i < NROWS; i++) {
        bricks[i] = new Array(NCOLS);
        for (j=0; j < NCOLS; j++) {
            bricks[i][j] = 1;
        }
    }
}

//Dibuja los cuadrados que tengan valor 1
function drawbricks() {

	for (i=0; i < NROWS; i++) {
		ctx.fillStyle = rowcolors[i];
		for (j=0; j < NCOLS; j++) {
		  if (bricks[i][j] == 1) {
		    rect((j * (BRICKWIDTH + PADDING)) + PADDING, //
		         (i * (BRICKHEIGHT + PADDING)) + PADDING,
		         BRICKWIDTH, BRICKHEIGHT);
		  }
		}
	}
}

//fin de la libreria
var ballr = 10;
var rowcolors = ["#FF1C0A", "#FFFD0A", "#00A308", "#0008DB", "#EB0093", "#FFFFFF"];
var paddlecolor = "#FFFFFF";
var ballcolor = "#FFFFFF";
var backcolor = "#000000";


function draw() {
  if (restantes != 0) {
    //Fija el color de fondo
    ctx.fillStyle = backcolor;
    
    //Borra lo pintado anteriormente
    clear();

    //dibuja la pelota
    ctx.fillStyle = ballcolor;
    circle(x, y, ballr);

    //Capta la pulsacion de teclas de direccion y mueve el Pad
    if (rightDown == true && paddlex < (canvasMaxX - paddlew)) paddlex += 5;
    else if (leftDown == true && paddlex > canvasMinX) paddlex -= 5;

    //Dibuja la paleta
    ctx.fillStyle = paddlecolor;
    rect(paddlex, HEIGHT-paddleh, paddlew, paddleh);

    //Pinta los bloques
    drawbricks();

    //Pintamos el marcador de puntos
    ctx.fillStyle = "#FFFFFF"; //Ponemos el color del texto en banco
    ctx.font="bold 10px verdana, sans-serif";
    ctx.textAlign="left";
    ctx.fillText(nick + ": " + marcador ,5,10);

    //Pintamos las vidas
    ctx.textAlign="left";
    ctx.fillText("Vidas: " + vidas ,WIDTH - 60,10);

    //Calcula el alto y ancho de la pantalla
    rowheight = BRICKHEIGHT + PADDING;
    colwidth = BRICKWIDTH + PADDING;
    row = Math.floor(y/rowheight);
    col = Math.floor(x/colwidth);
    //reverse the ball and mark the brick as broken
    if (y < NROWS * rowheight && row >= 0 && col >= 0 && bricks[row][col] == 1) { //Detecta colision con bloques
      dy = -dy;
      bricks[row][col] = 0; //Marcamos el bloque golpeado para no pintarlo en el proximo frame
      var multPuntos = [6,5,4,3,2,1]; //Dependiendo de la fila en la que esten los bloques cambiara esta variable
  	  marcador += 10 * (multPuntos[row]); //Sumamos 10 * fila en la que este puntos
  	  restantes -= 1; //Restamos un bloque a los restantes

  	  setPoints4Player(); //Guardamos la nueva puntuacion en la memoria local cuando se rompe un bloque


  	  //Añadimos un poco de velocidad a la bola
  	  if (dx > 0){
  	  	dx += 0.2;
  	  }else{
  	  	dx -= 0.2;
  	  }
  	  if (dy > 0) {
  	  	dy += 0.2;
  	  }	else{
  	  	dy -= 0.2;
  	  }
    }
   
    if (x + dx + ballr > WIDTH || x + dx - ballr < 0){ //Detecta colision con paredes
    	dx = -dx;
    }
    if (y + dy - ballr < 0) {
      dy = -dy;
    } else if (y + dy + ballr > HEIGHT - paddleh) { 
      if (x > paddlex && x < paddlex + paddlew) {//Cuando toca la barra
        //move the ball differently based on where it hit the paddle
        dx = 8 * ((x-(paddlex+paddlew/2))/paddlew);
        dy = -dy;
      }
      else if (y + dy + ballr > HEIGHT){
        vidas -= 1;
        printFinal("Game Over", 75); //Imprimimos en pantalla "winner"
        puedoReiniciar = true;

        setPoints4Player(); //Guardamos la nueva puntuacion en la memoria local cuando nos matan, indiferentemente de las vidas que nos queden

        getAllPoints4Players();//Mostramos los puntos de todos los jugadores.

        if (vidas <= 0) {
        	nivel = 1;
        	marcador = 0;
        	vidas = 3;
        	cambioNick = true;
        }
      }
    }
   
    x += dx; //Le sumamos a x la diferencia
    y += dy; //le sumamos a y ka diferencia

  } else { //En caso de que no queden bloques
      nivel += 1;  //Cambiamos de nivel para aumentar la dificultad		
      puedoReiniciar = true;
      printFinal("Winner", 50); //Imprimimos en pantalla "winner"
  }

}

function setPoints4Player() {
	var valor = sessionStorage.getItem(nick);
	if(marcador > valor){
		localStorage.setItem(nick,marcador);
		//console.log(nick +"-"+ marcador); //Mostramos los puntos por nick por consola.
	}


}

function getAllPoints4Players() {
	for(var i=0;i<sessionStorage.length;i++){ //Recuperamos todos los users
		var clave = sessionStorage.key(i);
		var valor = sessionStorage.getItem(clave);
		console.log(clave +"-"+ valor);//Mostramos los puntos por nick por consola de todos.
	}
}

//Pinta las pantallas finales (muestra el texto en mitad de la pantalla)
function printFinal(texto , separacionX){
  ctx.fillStyle = "#000000"; //Cambiamos el color de fondo a negro
  clear(); //Boraamos todo
  ctx.fillStyle = "#27CA14"; //Ponemos el color del texto en verde
  // como fon de cssp
  ctx.font="bold 24px verdana, sans-serif";
  // donde empieza el texto .. admite start, end, left, right
  ctx.textAlign="start";
  //texto relleno
  ctx.fillText(texto,WIDTH/2 - separacionX,HEIGHT/2);

  ctx.font="bold 10px verdana, sans-serif";
  ctx.textAlign="start";
  ctx.fillText("Tu puntuacion es: " + marcador,WIDTH/2 - 60,HEIGHT/2 + 30);
  clearInterval(intervalId);
}