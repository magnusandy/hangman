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
    function createDisplayString(passedString)
    {  
        var text= passedString;
        var regex=/[a-zA-Z]/g;//matches any letter
        var display = text.replace(regex, "_")
        return display;
    }
