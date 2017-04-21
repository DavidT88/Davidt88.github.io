//Connect the squares is a tic tac toe clone except the play area can be increased to add
//to the challenge

//bug list
//after starting another game, the canvas doesn't clear all of the graphics from 
//the canvas properly. It does not affect the gameplay.  
//I couldn't figure out how to change the size of the play area in the game, so the only
//way to change the size is by changing the grid value just below this comment

var grid = 3; //size of the grid 
var canvas = document.getElementById("canvas")
var c = canvas.getContext("2d");
c.lineWidth = 4;
var sizeOfSquare = canvas.width / grid;
var	currentPlayer = 1;
var playArray = new Array(grid);
canvas.addEventListener("click", start, false);
var x;
var y;
var illegalPlay = false;
//keep count of the player's wins
var player1Wins = 0;
var player2Wins = 0;

//draw grid for the first time and get a new gridArray
drawGrid();
getGridArray();

//the main part of the game
//first gets the coordinates of mouse
//second sets the player's move is the move is legal
//third refresh's the game by redrawing the grid with the plays by each player
//fourth switches the player if they have made a legal move
//finally checks to see who won or if the game is a draw
function start(event) {  
	x = event.clientX - canvas.offsetLeft;
  	y = event.clientY - canvas.offsetTop; 
  	setPlayerMove();
  	reDrawGrid();
  	switchPlayer();
  	checkGrid();
}

//creates an array reflecting the grid size 
//stores the moves of the players
function getGridArray()
{
	for (var i = 0; i < grid; i++) 
	{
		playArray[i] = new Array(grid);
		for (var j = 0; j < grid; j++) 
		{
			playArray[i][j] = 0;
		}
	}
}

//checks if the player has made a move that doesn't already have a play in it and sets
// a x or o depending on which player's turn.
function setPlayerMove()
{
	if (playArray[Math.floor(y / sizeOfSquare)][Math.floor(x / sizeOfSquare)] != 0) 
	{
		illegalPlay = true;
	}	
	else
	{
		illegalPlay = false;
  		playArray[Math.floor(y / sizeOfSquare)][Math.floor(x / sizeOfSquare)] = currentPlayer;	
	}
}

//switches the player if they have made a legal move
function switchPlayer()
{	 	
  	 if (currentPlayer == 1 && !illegalPlay) 
  	 {
  	 	document.getElementById("move").innerHTML = "Player 2's Turn";
  	 	currentPlayer = 2;
  	 	
  	 }
     else if (currentPlayer == 2 && !illegalPlay)
     { 
  	 	document.getElementById("move").innerHTML = "Player 1's Turn";
     	currentPlayer = 1;
     }
}

//draw out the grid 
function drawGrid() 
{
	var xGrid = 0;
	var yGrid = 0;
	for (var i = 0; i < grid; i++) 
	{
		for (var j = 0; j < grid; j++) 
		{
			c.rect(xGrid, yGrid, canvas.width / grid, canvas.height / grid);
			xGrid += canvas.width / grid;
		}
		xGrid = 0;
		yGrid += canvas.height / grid;
		c.stroke();
	}
}

//draw where the players played their moves
function drawMoves()
{
	for (var i = 0; i < playArray.length; i++)
	{
		for (var j = 0; j < playArray[i].length; j++)
		{
			if (playArray[i][j] == 1)
			{
				drawO(j, i);
			}
			if (playArray[i][j] == 2)
			{
				drawX(j, i);
			}
		}	
	}
}

//draw the O
function drawO(aXOffset, aYOffset) {
	c.beginPath();
	c.arc(aXOffset * sizeOfSquare + sizeOfSquare / 2, aYOffset * sizeOfSquare
	 + sizeOfSquare / 2, sizeOfSquare * .40,0,2 * Math.PI);
	c.stroke();
}

//draw the X
function drawX(aXOffset, aYOffset) {
	//major diagonal 
	c.beginPath();
	c.moveTo(aXOffset * sizeOfSquare + sizeOfSquare * .10 , sizeOfSquare * .10 + aYOffset * sizeOfSquare );
	c.lineTo(aXOffset * sizeOfSquare + sizeOfSquare - sizeOfSquare * .10, sizeOfSquare - sizeOfSquare * .10 + aYOffset * sizeOfSquare);
	c.stroke();
	
	//minor diagonal
	c.beginPath();
	c.moveTo(sizeOfSquare - sizeOfSquare * .10 + aXOffset * sizeOfSquare, sizeOfSquare * .10 + aYOffset * sizeOfSquare);
	c.lineTo(sizeOfSquare * .10 + aXOffset * sizeOfSquare, sizeOfSquare - sizeOfSquare * .10 + aYOffset * sizeOfSquare);

	c.stroke();
	
}
//redraw the grid after the user's input
function reDrawGrid() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();
    drawMoves();
}
//check the grid by columns, rows, major and minor diagonal to find out who wins
function checkGrid()
{
	//only check grid if the play is legal
	if (!illegalPlay)
	{
		//initialize player 1 array to check for win
		var player1Array = new Array(grid);
		var player2Array = new Array(grid);
		
		for (var i = 0; i < grid; i++) 
		{
			player1Array[i] = new Array(grid);
			for (var j = 0; j < grid; j++) 
			{
				player1Array[i][j] = false;
			}
		}
		
		//initialize player 2 array to check for win
		for (var i = 0; i < grid; i++) 
		{
			player2Array[i] = new Array(grid);
			for (var j = 0; j < grid; j++) 
			{
				player2Array[i][j] = false;
			}
		}
	
		//fill in the arrays of player 1 and player 2 of which squares they 
		//clicked on.
		for (var i = 0; i < playArray.length; i++) 
		{
			for (var j = 0; j < playArray[i].length; j++)
			{
				if (playArray[i][j] == 1)
					player1Array[i][j] = true;
				if (playArray[i][j] == 2)
					player2Array[i][j] = true;
			}	 
		}
		
		//check rows of player 1
		var player1Row = true;
		for (var i = 0; i < player1Array.length; i++)
		{ 
			player1Row = true;
			for (var j = 0; j < player1Array[i].length; j++) 
			{
				if (!player1Array[i][j])
				{
					player1Row = false;
					break;
				}
			}	
			if (player1Row)
					break;	
		}
		
		//check rows of player 2
		var player2Row = true;
		for (var i = 0; i < player1Array.length; i++)
		{ 
			player2Row = true;
			for (var j = 0; j < player2Array[i].length; j++) 
			{
				if (!player2Array[i][j])
				{
					player2Row = false;
					break;
				}
			}	
			if (player2Row)
					break;	
		}
		
		//check columns of player 1
		var player1Column = true;
		
		for (var col = 0; col < player1Array.length; col++)
		{ 
			player1Column = true;
			for (var row = 0; row < player1Array[col].length; row++) 
			{
				if (!player1Array[row][col])
				{
					player1Column = false;
					break;
				}
			}	
			if (player1Column)
					break;	
		}
		
		//check columns of player 2
		var player2Column = true;
		for (var col = 0; col < player2Array.length; col++)
		{ 
			player2Column = true;
			for (var row = 0; row < player2Array[col].length; row++) 
			{
				if (!player2Array[row][col])
				{
					player2Column = false;
					break;
				}
			}	
			if (player2Column)
					break;	
		}
		
		
		//check major diagonal of player 1 
		var player1MajorDiagonal = true;
		
		for (var row = 0, col = 0; row < player1Array.length; row++, col++)
		{
			if (!player1Array[row][col])
			{
				player1MajorDiagonal = false;
				break;
			}
		}
		
		//check major diagonal of player 2
		var player2MajorDiagonal = true;
		
		for (var row = 0, col = 0; row < player2Array.length; row++, col++)
		{
			if (!player2Array[row][col])
			{
				player2MajorDiagonal = false;
				break;
			}
		}
		
		//check minor diagonal of player 1
		var player1MinorDiagonal = true;
		
		for (var row = 0, col = player1Array.length - 1; row < player1Array.length; row++, col--)
		{
			if (!player1Array[row][col])
			{
				player1MinorDiagonal = false;
				break;
			}
		}
		
		//check minor diagonal of player 2
		var player2MinorDiagonal = true;
		
		for (var row = 0, col = player2Array.length - 1; row < player2Array.length; row++, col--)
		{
			if (!player2Array[row][col])
			{
				player2MinorDiagonal = false;
				break;
			}
		}
		
		//a draw match when the grid is filled up
		var draw = true;
		for (var i = 0; i < playArray.length; i++) 
		{
			for (var j = 0; j < playArray[i].length; j++)
			{
				if (playArray[i][j] == 0)
				{
					draw = false;
					break;
				}
			}	 
		}
		//check if player 1 or player 2 wins or if it is a draw
		if (draw)
			endGame("t");
		else if (player1Row || player1Column || player1MajorDiagonal || player1MinorDiagonal)
			endGame("1");
		else if (player2Row || player2Column || player2MajorDiagonal || player2MinorDiagonal)
			endGame("2");
	}
}		
//checks who wins and displays the win or tie message
//asks if the player wants to play again
function endGame(condition)
{
	if(condition == "1")
	{
		player1Wins++;
		alert("Player 1 wins!");
	}
	else if (condition == "2")
	{	
		player2Wins++;
		alert("Player 2 wins!");
	}
	else if (condition == "t")
		alert("Draw!");
	//ask user if he/she would like to play again
	var r = confirm("Do you want to play again?");
	if (r) 
		playAgain();
	//display the scores between the players
	else
	{	
		document.getElementById("move").innerHTML = "Player 1 has won: " + player1Wins + " time(s) " 
  	 		+ "<br>Player 2 has won: " + player2Wins + " time(s)";
  	}	
}

//play the game again
function playAgain()
{
	c.clearRect(0, 0, canvas.width, canvas.height);
	currentPlayer = 1;
    getGridArray();
    reDrawGrid();
   
}