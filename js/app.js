
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

  	$(".new").click(function() {

  		computerNum = guessGenerator(1,100);
  		formSwitch(2);
  		//i cant get the input box to reset afterwards
  		$("ul#guessList").empty();
  		console.log(computerNum);
  		$("#userGuess").val("Make a guess!");
  		

  	});

  	//generate a secret number between 1 and 100 (has to be function)

  	var computerNum = guessGenerator(1, 100);
  	//take in a user guess and check it
  	var counter = 0;
  
 	
  	$("form").submit(function(event) {

  		userGuess = $("#userGuess").val();
  		if (checker(userGuess) == false) {

  			alert("Sorry, thats not a valid input, guess again!");
  			event.preventDefault();
  		}

  		userGuess = $("#userGuess").val();
  		event.preventDefault();

  		 //give feedback about each guess -- too high, too low, etc (goes into h2#feedback)

  		var temp = tempChecker(userGuess, computerNum);
  		$("#feedback").text(temp);

  		//make list of numbers that have been guessed (put in ul#guessList)

  		if (userGuess != computerNum) {
  		$("ul#guessList").append("<li>"+userGuess+"</li>");
  		//make counter increment on the screen
  		counter++;
  		$("#count").text(counter);
		}
		$("#userGuess").val("Another Guess?");
		//on correct guess, disable new guesses until new game
  		if (userGuess == computerNum) {

  			formSwitch(1);
  			userGuess = 0;

  		}
  	$("form").on("click", "#userGuess", function() {

  		$(this).val(" ");

  	});
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

function formSwitch (x) {

if (x==1) {

	$("#form input").prop("disabled", true);

}

else {

	$("#form input").prop("disabled", false);

}

}