var visibleArray; //this object hold a true/false value for every character in the puzzleString, if the value is true, the character will be visible/revealed in the game.
var triesCounter = 5;
//PUZZLE PAGE FUNCTIONS
//https://css-tricks.com/snippets/javascript/get-url-variables/
/*
used to grab the base64 encoded value from the url of the page to create the puzzle
*/
	function getQueryVariable(variable)
	{
		   var query = window.location.search.substring(1);
		   var vars = query.split("&");
		   for (var i=0;i<vars.length;i) {
				   var pair = vars[i].split("=");
				   if(pair[0] == variable){return pair[1];}
		   }
		   return(false);
	}
	
	/*decodes the puzzlestring from the url and returns it*/
	function getFullPuzzleString()
	{
		var x = getQueryVariable("string")//get the value from the url
		var decode = window.atob(x)//decode value from url
		return decode
	}
	

    /*
        Initialize the visibleArray, setting values to true for spaces, everything else is false     
    */
    function initializeVisibleCharacterArray()
    {
		var fullPuzzleString = getFullPuzzleString();
        visibleArray = Array(fullPuzzleString.length)//make array same length as the puzzle String
        for(i=0;i<fullPuzzleString.length;i++)
        {
            if(fullPuzzleString[i]==" ")
            {
                visibleArray[i]=true;
            }
            else//keep only spaces as visible at the start
            {
                visibleArray[i]=false;
            }
        }
        //console.log(visibleArray)
    }
    
    /*Updates the global array visibleArray, which holds a boolean value for each character in the puzzle String,
if  the value is true, the character will be displayed, if false, it will be a underscore*/
    function updateVisibleCharacterArray(guessedChar)
    {   
		var fullPuzzleString = getFullPuzzleString();
        var correctGuess = false;
        for(i=0;i<fullPuzzleString.length;i++)
        {
            if(fullPuzzleString[i]==guessedChar)
            {
                visibleArray[i]=true;
                //console.log(visibleArray)
                correctGuess = true;
            }
		}
            if(correctGuess == false)//no correct characters were found
            {
                triesCounter=triesCounter-1;
				console.log(triesCounter)
				document.getElementById("tries").innerHTML = "Tries left: "+triesCounter
            }
        
        //console.log(visibleArray)
    }

    /*
        Creates the display string based on the visibleArray and returns the new string
    */
    function createDisplayString()
    {    
		var fullPuzzleString = getFullPuzzleString();
        var displayString = fullPuzzleString;
                //console.log(visibleArray)
           for(i=0;i<visibleArray.length;i++)
            {   
                if(visibleArray[i]==false)
                {
                    displayString = displayString.substr(0, i) + '_' + displayString.substr(i + 1);
                    //console.log(displayString)
                }
            }
            return displayString;
    }
	
	/*
		takes the user input from the text box and validates it, if invalid, an error will be displayed
		if the character is valid, the puzzle will be updated accordingly, letters will be revealed or a try
		removed.
	*/
	function pressGuessButton()
	{
		var fullPuzzleString = getFullPuzzleString();
		var guessString = document.getElementById("userGuess").value;
		var cleanGuess = sanatizeGuess(guessString);
		var isValid = validateGuess(cleanGuess);
		if(isValid)
		{
			updateVisibleCharacterArray(cleanGuess)
			var disp = createDisplayString()
			document.getElementById("header").innerHTML = disp;
			warning = document.getElementById("guessWarning");
			if (warning.className.indexOf("w3-hide") == -1)//If the warning is NOT hidden, then hide it
			{
				warning.className += " w3-hide";//hide the warning
			}
			document.getElementById("userGuess").value = ""//empty out the guess textbox
			if(triesCounter == 0)//GAME OVER
			{
				gameOver();
			}
			//need to check if the game has been won
			var didWin = didYouWin()
			if(didWin)
			{
				youWin()
			}
				
		}
		else
		{	
			warning = document.getElementById("guessWarning");
			warning.className = warning.className.replace(" w3-hide", "");
		}
		
	}
	
	/*Calls the pressGuessButton() function when enter is pressed on the guess textbox*/
	function onEnterGuess(event)
{
    if (event.keyCode == 13)
    { 
        pressGuessButton();
    }
}
	
	/*trim the guess String and change to uppercase then return clean value*/
	function sanatizeGuess(uncleanGuess)
	{
		uncleanGuess = uncleanGuess.toUpperCase();
		uncleanGuess = uncleanGuess.trim();
		return uncleanGuess;	
	}
	
	/*
		Guess should only be a single uppercase letter, true if so, false if not
	*/
	function validateGuess(cleanString)
	{	
		if(cleanString.length != 1)
		{
			return false;
		}
		else//only one character, need to make sure its a capital Letter
		{ 
			var regex=/[A-Z]/;//checks to see if the character is a letter
			return cleanString.match(regex)
		}
	}
	
	function gameOver()
	{
		//TODO show a popup window, should allow you to try puzzle again, quickstart or homepage
		alert("game OVER")
	}
	
	function youWin()
	{
		//todo reveal winning window
		alert("YOU Win! YAY")
	}
	
	/*checks the status of the game by looping through the visibleArray, if there is any false values,
	it means that there is still unrevealed letters and the game is still not over*/
	function didYouWin()
	{
		var didWin = true
		for(i=0;i<visibleArray.length;i++)
		{
			if(visibleArray[i] == false)//there are still blanks in the puzzle
			{
				didWin = false;
			}
		}
		return didWin;
	}
	
