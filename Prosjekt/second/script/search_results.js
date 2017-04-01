/* Her kan dere implementere en søkefunksjon. For eksempel:
function search_for_X() {
}
*/

function search_for_title(searchTitle, movieDict){
	for (key in movieDict){
		movieDetails = movieDict[key];
		if (movieDetails.otitle.toLowerCase() === searchTitle.toLowerCase()){
			return movieDetails;
		}		
	}
	return null;
}

/* Her kan dere implementere en display function som viser resulatetene av søket. For eksempel:
function display_X() {
}
*/

var movie = {}

// Implementerer "handlebars"-aktige HTML-templater/databinding
function display(){
	// Hent alle noder fra DOM
	var dom = document.getElementsByTagName("*"); 
	
	for (var i = 0; i < dom.length; i++) {
		text = dom[i].textContent;
		length = text.length;

		// Evaluer cmd fra alle div-noder som har tekst på formen {{ cmd }}
		// og erstatt med resultatet av eval
		if (length > 4 
		    && (text[0] === "{")
			&& (text[1] === "{")
			&& (text[length-1] === "}")
			&& (text[length-2] === "}")) {
			innerCode = text.substring(2, length-2)
			result = eval(innerCode)
			dom[i].textContent = eval(innerCode)
		}
	}
}

window.onload = function() {
	query_params = get_query_string_parameters();

	search_results = movies_object;

	// denne variablen lagres moviedetaljer fra søkefunksjonen.
	var foundMovie;
	
	if (query_params.film_title) {
     	film_title = document.getElementById("film_title");
		//Her kan dere for eksempel kalle en søkefunksjon som søker for tittel.

		foundMovie = search_for_title(query_params.film_title, search_results);
	//	display_movie(movieFound);
    }
	
	if (query_params.actor) {
        actor = document.getElementById("actor");
		actor.innerHTML = query_params.actor;
    }
	
	if (query_params.director) {
		director = document.getElementById("director");
		director.innerHTML = query_params.director;
    }
	
	if (query_params.genre) {
        genre = document.getElementById("genre");
		genre.innerHTML = query_params.genre;
    }
	
	if (query_params.country) {
        country = document.getElementById("country");
		country.innerHTML = query_params.country;
    }
	
	//Her kan dere for eksempel kalle en (display) funksjon som viser søkeresultater 
	movie = foundMovie
	display()
}