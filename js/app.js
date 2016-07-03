
$(document).ready(function(){
	
	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);

  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});

  	//create a new game button which starts a new game

  	var gameCounter = 0;
  	var counter = 0;


  	$(".new").click(function() {

  		newGame();
  		//set the counter to 0 for guess count
  		gameCounter++;
  		counter = 0;
  		$("#count").text(counter);
  		$("#feedback").text("Make a guess!");
  	});

  	//generate a secret number between 1 and 100 (has to be function)

  	computerNum = guessGenerator(1, 100);
  	//take in a user guess and check it
  
 	
  	$("form").submit(function(event) {

  		userGuess = $("#userGuess").val();
  		if (checker(userGuess) == false) {

  			alert("Sorry, thats not a valid input, guess again!");
  			event.preventDefault();
  		}

  		userGuess = $("#userGuess").val();
  		event.preventDefault();  		

  		//make list of numbers that have been guessed (put in ul#guessList)

  		if (userGuess != computerNum) {
  		$("ul#guessList").append("<li class='guesses'>"+userGuess+"</li>");
  		//make counter increment on the screen
  		counter++;
  		$("#count").text(counter);
  		//put guesses into an array
  		var guessList = [];
  		$("li.guesses").each(function(i,elem) {
  			guessList.push($(elem).text());
  		});
  		//go to the list index-1 and store that as "old guess" to compare for relative checker
  		
  		 //give feedback about each guess -- too high, too low, etc (goes into h2#feedback)

  			var temp = tempChecker(userGuess, computerNum);
  			$("#feedback").text(temp);
  			
  		
		}
		//reset the input after each submission
		$("#form").each(function() {
			this.reset();
		});

		//on correct guess, disable new guesses until new game
  		if (userGuess == computerNum) {
  			$("#feedback").text("You got it!");
  			formSwitch(1);
  			userGuess = 0;

  		}
  		});

  	$("form").on("click", "#userGuess", function() {

  		$(this).val(" ");
  	});
});

//make a function that generates guesses for the computer

function guessGenerator(min, max) {
	return Math.floor(Math.random()*(max-min)) + min;
}


//make function to check for valid inputs (e.g. between 1 and 100)

function checker(x) {
	var y = parseInt(x);
	if (isNaN(parseInt(x)) == true) {
		return false;
	}
	else if (y % 1 != 0) {
		return false;
	}
	else if (x >= 100) {
		return false;
	}
	else {
		return true;
	}
}


//make a function that gives feedback
//*optional* feedback relative to last guess

function tempChecker (uGuess, cNum) {
		if (uGuess == cNum) {
			return "You got it!";
			}
		else if ((Math.abs(uGuess - cNum) <= 5)) {
			return "You're red hot!";
			}
		else if ((Math.abs(uGuess - cNum) <= 15)) {
			return "You're warm, I guess";
			}
		else if ((Math.abs(uGuess - cNum) <= 25)) {
			return "You're room temperature, at best";
			}
		else if ((Math.abs(uGuess - cNum) <= 40)) {
			return "Cold";
			}
		else {
			return "You're an ice box!";
			}
	
	}

/*
function relativeChecker (nGuess, oGuess, cNum) {

	var newDiff = nGuess - cNum;
	var oldDiff = oGuess - cNum;
	if (nGuess == cNum) {

		return "You got it!";
	}

	else if (newDiff < oldDiff) {

		return "Don't go down that road!";

	}

	else {

		return "You're approaching the destination!";
	}

}
*/



function formSwitch (x) {

if (x==1) {

	$("#form input").prop("disabled", true);

}

else {

	$("#form input").prop("disabled", false);

}

}

function newGame() {
  		computerNum = guessGenerator(1,100);
  		formSwitch(2);
  		$("ul#guessList").empty();
  		console.log(computerNum);
  		$("#userGuess").val("Make a guess!");
 }