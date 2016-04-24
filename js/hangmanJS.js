//INDEX PAGE JS FUNCTIONS
  /*
  Function will generate a puzzle link and place it in the below box if the user input is valid, if not, the warning will be displayed. Or if the input is blank, any links will be removed
  */
  function pressGenerateButton()
  {
    var puzzleText = document.getElementById("userPuzzle").value;
    var valid = validateUserInput(puzzleText);
	if(puzzleText == "")//if there is nothing in the box, clear the generated link box
	{
		document.getElementById("generatedLink").value = ""
		return
	}
    if(valid)//the string contains only letters
    {
      //reset the warning if it is shown
      warning = document.getElementById("validationWarning");
      if (warning.className.indexOf("w3-hide") == -1)//If the warning is NOT hidden, then hide it
      {
        warning.className += " w3-hide";//hide the warning
      } 
      cleanPuzzle = cleanPuzzleString(puzzleText);
      addGeneratedLinkToPage(cleanPuzzle)
    }
    else//string contains invalid characters, reveal the warning label
    {
      warning = document.getElementById("validationWarning");
      warning.className = warning.className.replace(" w3-hide", "");
    }
    
  }
    /*
  Validates the submitted string by checking to make sure that the characters of the string are 
  only letters (a-z, A-Z) or spaces. 
  */
  function validateUserInput(userInput)
  {
    var regex=/^[a-zA-Z ]+$/;//checks to see if the character is a letter
    for(i=0;i<userInput.length;i++)
    {
    var inputChar = userInput[i]
      if (!inputChar.match(regex))//if the input character in not a letter then false
      {
          console.log("input failed at this character ( "+ userInput[i]+" )")
          return false;
      }
    }
    return true
  }
  
  /*
    Cleanse the input string, trim away leading/trailing spaces as well as change all to UPPERCASE
  */
  function cleanPuzzleString(puzzleString)
  {
   puzzleString = puzzleString.toUpperCase();
   puzzleString = puzzleString.trim();
   return puzzleString;
  }
  
  /*
  Based on the given string "puzzleText" generate a base64 encoded value and use it to create a puzzle link, return the link
  */
  function generateLink(puzzleText)
  {
    encodedPuzzle = window.btoa(puzzleText)
    console.log("Linux Link: file:///home/magnusandy/Documents/Github/hangman/puzzle.html?string="+encodedPuzzle);
	var puzzleLink = "http://magnusandy.github.io/hangman/puzzle.html?string="+encodedPuzzle;
    console.log(puzzleLink)
	return puzzleLink
  }
  
  /*Add a generated puzzle link to the page*/
  function addGeneratedLinkToPage(puzzleText)
  {
	puzzleLink = generateLink(puzzleText)
	document.getElementById("generatedLink").value = puzzleLink;
  }
  
  /*
	Highlight the text in the generated link field and copy to clipboard
  */
  function pressCopyButton()
  {
	var copyTextarea = document.getElementById("generatedLink");
	copyTextarea.select();
	document.execCommand("copy");
  }
  
  /*
	Direct the user to the puzzle page for their generated game
  */
  function pressGeneratedPlayButton()
  {
	  var link = document.getElementById("generatedLink").value;
	  if(link != "")
	  {
		location.href=link;
	  }
  }
  /*
	TODO: this function will pull a random phrase from the Wheel of fortune stuff and return it
  */
  function pullRandomPhrase()
  {
	return "This is TODO"
  }
  
  /*pulls the user into a randomly generated game when button is pressed*/
  function playRandomGame()
  {
	var phrase = pullRandomPhrase()
	link = generateLink(phrase)
	location.href=link;
  }

  
