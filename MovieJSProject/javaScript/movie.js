var fCall, horse, xmlFile;
var url = "https://www.finnkino.fi/xml/TheatreAreas/"; // Where to get  xml-info

// Making api call for xml file
fCall = new XMLHttpRequest();
fCall.open("GET", url, true);
fCall.send();

fCall.onreadystatechange = function() {
	if (fCall.readyState == 4 && fCall.status == 200) {
		xmlFile = fCall.responseXML;
		horse = xmlFile.getElementsByTagName("TheatreArea");
		mtTable = "<tr><th> Movie theaters </th></th>"; // Creating a table for the movie theaters

		// Fetching movie theaters by id
		for (i = 2; i < horse.length; i = i + 1) {
			var id = horse[i].getElementsByTagName("ID")[0].childNodes[0].nodeValue;
			mtTable += "<tr onclick='show(" + id + ")'><td>";
			mtTable = mtTable + horse[i].getElementsByTagName("Name")[0].childNodes[0].nodeValue; // Add movie theaters to the table in alphabetical order
		}
		document.getElementById("theaters").innerHTML = mtTable; // Creating a table into the "theaters" section
	}
}

//  Triggering functions when clicking the list
function show(i) {
	$("#textField").show(2000);
	document.getElementById('textField').innerHTML = "";
	//  Calling the second xml file, Title and EventLargeImagePortrait
	var sCall = new XMLHttpRequest();
	var sUrl = "https://www.finnkino.fi/xml/Schedule/?area=" + i;
	var result = document.getElementById('textField');
	var xmlFile, goat;
	sCall.open("GET", sUrl, true);
	sCall.send();
	sCall.onreadystatechange = function() {
    if (sCall.readyState == 4 && sCall.status == 200) {
		xmlFile = sCall.responseXML;
		goat = xmlFile.getElementsByTagName("Show");   // Creating a variable that looks for the Show tag
		for (sheep = 0; sheep < goat.length; sheep = sheep + 1) {
			var image = goat[sheep].getElementsByTagName("EventSmallImagePortrait"); // Creating variable 'image', which has EventSmallImagePortrait
			var snake = image[0];
			// Creating a variable with a link to the picture
			var picLink = snake.childNodes[0].nodeValue;
			var picture = '<img src="' + picLink + '">';
			// Adding start times
			var textImage = goat[sheep].getElementsByTagName("dttmShowStart"); 
			var snake2 = textImage[0]; //
			textImage = snake2.childNodes[0].nodeValue;
			// Adding movie titles
			var movieName = goat[sheep].getElementsByTagName("Title");
			var snake3 = movieName[0];
			movieName = snake3.childNodes[0].nodeValue;
			// Adding movie genres
			var movieGenre = goat[sheep].getElementsByTagName("Genres");
			var snake4 = movieGenre[0];
			movieGenre = snake4.childNodes[0].nodeValue;
			// Adding movie lenghts
			var movieDuration = goat[sheep].getElementsByTagName("LengthInMinutes");
			var snake5 = movieDuration[0];
			movieDuration = snake5.childNodes[0].nodeValue;
			// Adding movie locations
			var movieLocation = goat[sheep].getElementsByTagName("TheatreAndAuditorium");
			var snake6 = movieLocation[0];
			movieLocation = snake6.childNodes[0].nodeValue;
			// Making the start time look simpler
			var date = Date.parse(textImage);
			var newDate = new Date(date);
			textImage = newDate;

			// Creating a table and inserting data 
			result.innerHTML += '<table id="content"><td>' +
			picture + '</td><td>' +
			"<b>Title: </b>" + movieName + "<br>" +
			"<b>Showtime: </b>" + textImage + "<br>" +
			"<b>Duration: </b>" + movieDuration + " min" + "<br>" +
			"<b>Genre: </b>" + movieGenre + "<br>" +
			"<b>Location: </b>" + movieLocation + "<br>" +
			'</table></td>';
			}
		}
	}
}
