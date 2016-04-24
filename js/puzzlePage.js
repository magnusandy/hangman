var visibleArray;
var triesCounter;
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

    /*
    takes a string value and creates a new string where all characters are replaced with underscore
    spaces are left intact
    */
    function createDisplayString(fullPuzzleString)
    {  
        var  text= fullPuzzleString;
        var regex=/[a-zA-Z]/g;//matches any letter
        var display = text.replace(regex, "_")
        return display;
    }

    /*
        Initialize the visibleArray, setting values to true for spaces, everything else is false     
    */
    function initializeVisibleCharacterArray(fullPuzzleString)
    {
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
    function updateVisibleCharacterArray(fullPuzzleString, guessedChar)
    {   
        var correctGuess = false;
        for(i=0;i<fullPuzzleString.length;i++)
        {
            if(fullPuzzleString[i]==guessedChar)
            {
                visibleArray[i]=true;
                //console.log(visibleArray)
                correctGuess = true;
            }
            if(correctGuess == false)//no correct characters were found
            (
                triesCounter=triesCounter-1
            )
        }
        //console.log(visibleArray)
    }

    /*
        Creates the display string based on the visibleArray and returns the new string
    */
    function updateDisplayString(fullPuzzleString)
    {    
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
