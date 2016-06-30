
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

  	//generate a secret number between 1 and 100 (has to be function)

  	var guess = guessGenerator(1, 100);

  	//take in a user guess and check it or store it
  	//take in a user guess

  	$("form").submit(function(event) {

  		var userGuess = $("#userGuess").val();
  		while (checker(userGuess) == false) {

  			alert("Sorry, thats not a valid input, guess again!");
  			event.preventDefault();
  			document.getElementByName("form").reset();
  		}

  		var userGuess = $("#userGuess").val();
  		alert(userGuess);
  		event.preventDefault();

  	});



  	//give feedback about each guess -- too high, too low, etc (goes into h2#feedback)

  	//make list of numbers that have been guessed (put in ul#guessList)

  	//make function to check for valid inputs (e.g. between 1 and 100)

  	//*optional* feedback relative to last guess

});

function guessGenerator(min, max) {

	return Math.floor(Math.random()*(max-min)) + min;

}

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


