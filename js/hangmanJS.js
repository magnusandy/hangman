//GLOBAL VARIABLES

var visibleArray; //this object hold a true/false value for every character in the puzzleString, if the value is true, the character will be visible/revealed in the game.
var triesCounter = 6;
var usedLetters = [];

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
    //console.log("Linux Link: file:///home/magnusandy/Documents/Github/hangman/puzzle.html?string="+encodedPuzzle);
    //console.log("Win Link: file:///C:/Users/Andrew%20Magnus/git/hangman/puzzle.html?string="+encodedPuzzle);
    var puzzleLink = "http://magnusandy.github.io/hangman/puzzle.html?string="+encodedPuzzle;
    return puzzleLink
  }

  /*Add a generated puzzle link to the link textbox*/
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
    pull a random phrase and make it for play
  */
  function pullRandomPhrase()
  {
    randomNum = Math.floor((Math.random() * 3608));
    return phrases[randomNum].word
  }

  /*pulls the user into a randomly generated game when button is pressed*/
  function playRandomGame()
  {
    var phrase = pullRandomPhrase()
    link = generateLink(phrase)
    location.href=link;
  }

/*add functionality so that when enter is pressed on the phrase box, the generate button is pressed*/
function onEnterGenerate(event)
{
    if (event.keyCode == 13)
    {
        pressGenerateButton();
    }
}

//-----------------------------------------PUZZLE PAGE


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
            if(fullPuzzleString[i]==" ")//set the index of spaces to true in the visible array so they are shown right away
            {
                visibleArray[i]=true;
            }
            else//keep only spaces as visible at the start
            {
                visibleArray[i]=false;
            }
        }
    }

/*Updates the global array visibleArray based on the guessedChar, which holds a boolean value for each character in the puzzle String,
if  the value is true, the character will be displayed, if false, it will be a underscore
This function also updates the hangman image on the page and lowers the tries counter if the guessedChar is not found in the puzzleString
*/
    function updateVisibleCharacterArray(guessedChar)
    {
    var fullPuzzleString = getFullPuzzleString();
                var used = isGuessUsed(guessedChar)//check guess against array, update

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
                if(used == false)//character hasent been used
                {
                    triesCounter=triesCounter-1;
                    document.getElementById("tries").src = "images/hangman"+triesCounter+".png"
                }
}

        //console.log(visibleArray)
    }

    /*
        Creates the display string based on the visibleArray and returns the new string
        this will create a string based on the puzzleString and the visible array, if the value at index i of the visible array
        is true then the character at index i of the puzzle string will be displayed or else it will be an underscore
    */
    function createDisplayString()
    {
    var fullPuzzleString = getFullPuzzleString();
        var displayString = fullPuzzleString;
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
            updateVisibleCharacterArray(cleanGuess)//update display  based on guess, updates tries
            var disp = createDisplayString()
            document.getElementById("header").innerHTML = disp;
            warning = document.getElementById("guessWarning");
            if (warning.className.indexOf("w3-hide") == -1)//If the warning is NOT hidden, then hide it
            {
                warning.className += " w3-hide";//hide the warning
            }
            document.getElementById("userGuess").value = ""//empty out the guess textbox
            document.getElementById("letterList").innerHTML = createUsedCharList();
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
        else//guess is invalid
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
        document.getElementById("modalHeader").innerHTML = "Game Over";
        document.getElementById("modalText").innerHTML = "Great try, but you were not able to solve the puzzle";
        showEndingModal()
    }

    function youWin()
    {
        document.getElementById("modalHeader").innerHTML = "You Win!";
        document.getElementById("modalText").innerHTML = "Great job, you are a puzzle master!";
        showEndingModal();
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

    //display modal
    function showEndingModal()
    {

        document.getElementById('endingModal').style.display='block';
        document.getElementById('userGuess').blur();
    }

/*
This function will check the guessed char against the list of other used characters
if the character is in the list, then return true, if the character is not in the list,
then add it to the list and return false
*/
function isGuessUsed(guessedChar)
{
   if(usedLetters.length == 0)
   {
    usedLetters.push(guessedChar)
    return false
    }
   for(i=0;i<usedLetters.length;i++)
   {
      if(guessedChar == usedLetters[i])//if the character is used already
      {
        return true
      }
   }
       usedLetters.push(guessedChar)
        console.log(usedLetters)
        return false
}

/*Returns a string of used characters*/
function createUsedCharList()
{
    var usedLetterString = usedLetters[0];
    for(i=1;i<usedLetters.length;i++)
    {
        usedLetterString = usedLetterString+", "+usedLetters[i]
    }
    return usedLetterString
}
