
var player = document.getElementById("player");
var computer = document.getElementById("computer");
var footer = document.getElementById("footer");
var rockImage = document.getElementById("rock");
var paperImage = document.getElementById("paper");
var scissorImage = document.getElementById("scissor");
var newMatch = document.getElementById("matches");
var endMessage = document.getElementById("message");
var form = document.getElementById("userForm");

var rockButton;
var paperButton;
var scissorButton;

var rockImage1 = document.getElementById("rock1");
var paperImage1 = document.getElementById("paper1");
var scissorImage1 = document.getElementById("scissor1");

var playerScore = document.getElementById("playerScore");
var computerScore = document.getElementById("computerScore");
var tie = document.getElementById("tie");
var round = document.getElementById("round");

var restart = false;
var formExist = false;
var buttonExist = false;
var roundNumber = 0;
var playerHiScore = 0;
var computerHiScore = 0;
var tieScore = 0;
var maxMatches = 0;


var newGame = function () {
	//starting a new game 
	if (restart) {
		endMessage.innerHTML = "";
		form.appendChild(newMatch);
		restart = false;
	}
		//gets the max number of games
		maxMatches = document.getElementById("maxMatches").value;
	//running the game for the first time prompts this message
	if (!formExist) {
		form.innerHTML = "<p>Select Your First Throw</p>";
		formExist = true;
		
	}
	//reset the counters 
	round.innerHTML = roundNumber = 0;
	playerScore.innerHTML = playerHiScore = 0;
	computerScore.innerHTML = computerHiScore = 0;
	tie.innerHTML = tieScore = 0;
	
	//creates the rock, paper, and scissor button
	if (!buttonExist) {
		rockButton = document.createElement("button");
		paperButton = document.createElement("button");
		scissorButton = document.createElement("button");
	
		var rockText = document.createTextNode("ROCK!!");
		var paperText = document.createTextNode("PAPER!!");
		var scissorText = document.createTextNode("SCISSOR!");
	
		footer.appendChild(rockButton);
		footer.appendChild(paperButton);
		footer.appendChild(scissorButton);
	
		rockButton.appendChild(rockText);
		paperButton.appendChild(paperText);
		scissorButton.appendChild(scissorText);
		
		rockButton.setAttribute("onclick", "rock()");
		paperButton.setAttribute("onclick", "paper()");
		scissorButton.setAttribute("onclick", "scissor()");
		
		buttonExist = true;
	}
	//clear the screen
	player.innerHTML = "";
	computer.innerHTML = "";
	
	
	
};

function rock () {
	round.innerHTML = ++roundNumber; //increase the round
	
	//clears the screen of any images or forms
	form.innerHTML = "";
	player.innerHTML = ""; 
	computer.innerHTML = "";
	
	var computerThrow = computerPlay(); //get the random throw from comp
	var playerThrow = "rock"; //player's move
	
	//get the images for both the computer and the player
	player.appendChild(rockImage);
	computer.appendChild(computerPlayImage(computerThrow));
	
	//update the counters
	rules(playerThrow, computerThrow);
	
	//end the game
	if (roundNumber == maxMatches)
		game();
		
	restart = true;
	
	
}

function paper () {
	round.innerHTML = ++roundNumber; //increase the round
	
	//clears the screen of any images or forms
	form.innerHTML = "";
	player.innerHTML = ""; 
	computer.innerHTML = "";
	
	var computerThrow = computerPlay(); //get the random throw from comp
	var playerThrow = "paper"; //player's move
	
	//get the images for both the computer and the player
	player.appendChild(paperImage);
	computer.appendChild(computerPlayImage(computerThrow));
	
	//update the counters
	rules(playerThrow, computerThrow);
	
	//end the game
	if (roundNumber == maxMatches)
		game();
		
	restart = true;
	
}

function scissor () {
	round.innerHTML = ++roundNumber; //increase the round
	
	//clears the screen of any images or forms
	form.innerHTML = "";
	player.innerHTML = ""; 
	computer.innerHTML = "";
	
	var computerThrow = computerPlay(); //get the random throw from comp
	var playerThrow = "scissor"; //player's move
	
	//get the images for both the computer and the player
	player.appendChild(scissorImage);
	computer.appendChild(computerPlayImage(computerThrow));
	
	//update the counters
	rules(playerThrow, computerThrow);
	
	//end the game
	if (roundNumber == maxMatches)
		game();
		
	restart = true;
	
	
}

function rules (playerThrow, computerThrow) {
	//tie
	if (playerThrow == computerThrow) {
		tie.innerHTML = ++tieScore;
	}
		
	//player wins
	else if (playerThrow == "rock" && computerThrow == "scissor" || 
			playerThrow == "paper" && computerThrow == "rock" ||
			playerThrow == "scissor" && computerThrow == "paper") {
		playerScore.innerHTML = ++playerHiScore;		
	}
		
	//player loses
	else
		computerScore.innerHTML = ++computerHiScore;
	
}

function computerPlay () {
	//get a random throw for the computer
	var randomComputerThrow = Math.floor(Math.random() * 3);	
	if (randomComputerThrow === 0)
		return "rock";
	else if (randomComputerThrow == 1)
		return "paper";
	else
		return "scissor";
}

function computerPlayImage(x) {
	//get the appropriate image for the throw
	if (x == "rock")
		return rockImage1;
	else if (x == "paper")
		return paperImage1;
	else
		return scissorImage1;
}

function game () {	
	//player wins
	if (playerHiScore > computerHiScore)
		endMessage.innerHTML = "The Player Wins!";
	//tie
	else if (playerHiScore === computerHiScore)
		endMessage.innerHTML = "Draw!!";
	//computer wins
	else
		endMessage.innerHTML = "The Computer Wins!";
	//remove the button and get the game ready to restart	
	restart = true;
	footer.removeChild(rockButton);
	footer.removeChild(paperButton);
	footer.removeChild(scissorButton);
	buttonExist = false;
}