var width = 520;
var height = 520;

var canvas ;
var ctx ;

var N = 20;
var cellsize = width/N;

let snakebody = []; 
snakebody.push([1+N/2 , N/2]);
snakebody.push([N/2 , N/2]);
snakebody.push([-1+N/2 , N/2]);

var state = 0;

var foodX = 0;
var foodY = 0;
var foodImage ;

var scores = 0;
var scoreBoard;

var gameInterval;

function init()
{
	scoreBoard = document.getElementById("score-board");
	canvas = document.getElementById("mycanvas");
	ctx = canvas.getContext("2d");

	loadImage();
	setBackground();
	generateFood();
	updateScore();
	
	document.onkeydown = handleKey;
	gameInterval = setInterval(update , 300);
}

function loadImage()
{

	// var eyeImage = new Image();
	// eyeImage.src = "";
	 foodImage = new Image()
	 foodImage.src = "https://pluspng.com/img-png/apple-png-apple-png-2040.png";
}

function drawCell(i,j)
{
	if((i+j)%2==0)
			ctx.fillStyle = "#0cdde8";
		else
			ctx.fillStyle = "#0ab9c2";

		ctx.fillRect(i*cellsize,j*cellsize,cellsize,cellsize);
	
}

function setBackground()
{	
	ctx.fillStyle = "#0cdde8";
	ctx.fillRect(0,0,width,height);

	for(var i = 0 ; i<N; i++)
	{
		for(var j = 0 ; j<N; j++)
		{
			drawCell(i,j);
		}
	}
}

function drawSnakePart(snakePart)
{
	 ctx.fillStyle = '#FFFF66';  

	 ctx.fillRect(snakePart[0]*cellsize, snakePart[1]*cellsize, cellsize, cellsize);  
	 //ctx.strokeRect(snakePart[0]*cellsize, snakePart[1]*cellsize, cellsize, cellsize);
}

function drawSnake()
{

	snakebody.forEach(drawSnakePart);
}

function updateSnake(increase) 
{  
	var x = 0;
	var y = 0;
    if(state==0)  	x++;
	else if(state==1) 	y++;
	else if(state==2) 	x--;
	else if(state==3)	y--;

	var head = [ snakebody[0][0] + x, snakebody[0][1] + y];

	for(var i = 0 ; i<snakebody.length ; i++)
	{
		if(head[0] == snakebody[i][0] && head[1] == snakebody[i][1]) 
			endGame();
	}

	if(head[0] < 0 ||head[1] < 0 || head[0] >= N || head[1] >= N) 
		endGame();
	//snakebody.unshift(head);
	snakebody.splice(0,0, head);
	if(!increase) snakebody.pop();
}

function generateFood()
{
	var success = false;
	while(!success)
	{
		foodX = parseInt(Math.random()*N);
		foodY = parseInt(Math.random()*N);

		success = true;
		//so that food doesnt collide with the body
		for(var i = 0 ; i< snakebody.length ; i++)
		{
			if(snakebody[i][0] == foodX && snakebody[i][1] == foodY)
			{
				success = false;
			}
		}
	}
}

function handleKey(e) 
{
	e = e || window.event;
	var play = false;

	if (e.keyCode == '38' && state!=1 && state!=3) 
	{
		// up arrow
		state = 3;
		play = true;

	}
	else if (e.keyCode == '40' && state!=1 && state!=3) 
	{
		// down arrow
	    state = 1;
	    play = true;
	}
	else if (e.keyCode == '37' && state!=0 && state!=2) 
	{
		// left arrow
		state = 2;
		play = true;
	}
	else if (e.keyCode == '39' && state!=0 && state!=2) 
	{
		// right arrow
	    state = 0;
	    play = true;
    }
	
	if(play)	    playAudio();	    
}


function playAudio()
{
	var audio = new Audio('https://www.soundjay.com/switch/sounds/switch-3.mp3');
	audio.play();
}

function playConsume()
{
	var audio = new Audio('https://www.soundjay.com/button/sounds/button-7.mp3');
	audio.play();
}

function drawFood()
{
	ctx.drawImage(
		foodImage, 
		foodX*cellsize, 
		foodY*cellsize, 
		cellsize,cellsize
		);
}

function updateScore()
{

	scoreBoard.innerHTML = scores;
}

function update()
{
	var increase = false;

	if(snakebody[0][0]==foodX && snakebody[0][1] == foodY)
	{
		generateFood();
		playConsume();
		scores++;

		updateScore();
		increase = true;
	}

	setBackground();
	drawFood();
	updateSnake(increase);
	drawSnake();
}

function endGame()
{
	clearInterval(gameInterval);
	//alert("Game Over! \n Your score is" + scores);
}

init();
