
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

  		var userGuess = 0;
  		computerNum = guessGenerator(1,100);
  		alert(computerNum);
  		formSwitch(2);
  		
  		

  	});

  	//generate a secret number between 1 and 100 (has to be function)

  	var computerNum = guessGenerator(1, 100);
  	alert(computerNum);  	
  	//take in a user guess and check it
  
 	
  	$("form").submit(function(event) {

  		userGuess = $("#userGuess").val();
  		while (checker(userGuess) == false) {

  			alert("Sorry, thats not a valid input, guess again!");
  			event.preventDefault();
  			$("form")[0].reset();
  		}

  		userGuess = $("#userGuess").val();
  		event.preventDefault();

  		 //give feedback about each guess -- too high, too low, etc (goes into h2#feedback)

  		var temp = tempChecker(userGuess, computerNum);
  		$("#feedback").text(temp);

  		//make list of numbers that have been guessed (put in ul#guessList)

  		$("ul#guessList").append("<li>"+userGuess+"</li>");

  		if (userGuess == computerNum) {

  			formSwitch(1);
  			userGuess = 0;

  		}


  	});
  	

  
  	//on correct guess, disable new guesses until new game

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
	else if ((Math.abs(uGuess - cNum) <= 10)) {
		return "You're red hot!";
	}
	else if ((Math.abs(uGuess - cNum) <= 20)) {
		return "You're warm, I guess";
	}
	else if ((Math.abs(uGuess - cNum) <= 40)) {
		return "You're room temperature, at best";
	}
	else if ((Math.abs(uGuess - cNum) <= 60)) {
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