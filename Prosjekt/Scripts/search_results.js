/* Her kan dere implementere en søkefunksjon. For eksempel:
function search_for_X() {
}
*/

function search_for_title(searchTitle, movieDict){
	results = [];

	for (key in movieDict){
		movieDetails = movieDict[key];
		if (movieDetails.otitle.toLowerCase().match(searchTitle.toLowerCase()))	{
			 results.push(movieDetails);
		}
	
	}
	return results;
}

/* Her kan dere implementere en display function som viser resulatetene av søket. For eksempel:
function display_X() {
}

Se template_engine.js
*/

function advanced_search(title, actor, director, genre, country, movieDict, genreDict){
	results = [];
 
	for (key in movieDict){
		if (key in genreDict) {
			movieDict[key].genre = genreDict[key]
		}
	}

	for (key in movieDict){
		results.push(movieDict[key]);
	}

	if (title) {
		results = results.filter(function(movie) {
			if (movie.otitle) {
				return movie.otitle.toLowerCase().match(title.toLowerCase())
			} else {
				return false;
			}
		})
	}

	if (actor) {
		results = results.filter(function(movie) {
			if (movie.folk) {
				return movie.folk.toLowerCase().match(actor.toLowerCase());
			} else {
				return false;
			}
		})
	}

	if (director) {
		results = results.filter(function(movie) {
			if (movie.dir) {
				return movie.dir.toLowerCase().match(director.toLowerCase());
			} else {
				return false;
			}
		})
	}

	if (genre) {
		results = results.filter(function(movie) {
			if (movie.genre) {
				return movie.genre.indexOf(genre.toLowerCase()) > -1;
			} else {
				return false;
			}
		})
	}

	if (country) {
		results = results.filter(function(movie) {
			if (movie.country) { 
			return movie.country.toLowerCase().match(country.toLowerCase());
			} else {
				return false;
			}
		})
	}

	return results;

}

var searchResults = []

window.onload = function() {
	qp = get_query_string_parameters();

	// denne variablen lagres moviedetaljer fra søkefunksjonen.
	
	//if (query_params.film_title) {
    // 	film_title = document.getElementById("film_title");
    //}
	//
	//if (query_params.actor) {
    //    actor = document.getElementById("actor");
	//	  actor.innerHTML = query_params.actor; 
    //}
	//
	//if (query_params.director) {
	//	director = document.getElementById("director");
	//	director.innerHTML = query_params.director; 
    //}
	//
	//if (query_params.genre) {
    //    genre = document.getElementById("genre");
	//	  genre.innerHTML = query_params.genre; 
    //}
	//
	//if (query_params.country) {
    //    country = document.getElementById("country");
	//	  country.innerHTML = query_params.country; 
    //}


	searchResults = advanced_search(qp.film_title, qp.actor, qp.director, qp.genre, qp.country, movies_object, genres_object)

	//Her kan dere for eksempel kalle en (display) funksjon som viser søkeresultater 

	display();
}