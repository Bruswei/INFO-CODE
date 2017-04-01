/* Her kan dere implementere en søkefunksjon. For eksempel:
function search_for_X() {
}
*/

function search_for_title(searchTitle, movieDict){
	results = [];

	for (key in movieDict){
		movieDetails = movieDict[key];
		if (movieDetails.otitle.toLowerCase() === searchTitle.toLowerCase()){
			 results.push(movieDetails);
		}		
	}
	return results;
}

/* Her kan dere implementere en display function som viser resulatetene av søket. For eksempel:
function display_X() {
}
*/

var searchResults = [
{"year": 1957, "otitle": "Ni liv", "youtube trailer id": "", "ntitle": "Ni liv", "mod_date": null, "length": 91, "id": 1080, "keywords": null, "reg_date": null, "description": "Jan Baalsrud er p\u00e5 et sabotasjeoppdrag fra England til Norge med 11 andre vinteren 1943, da fiskeb\u00e5ten deres angripes av en tysk patruljeb\u00e5t. Som eneste overlevende lykkes det Baalsrud \u00e5 unnslippe og en farefull reise mot n\u00f8ytrale Sverige begynner. Etter flere uker i sn\u00f8massene i de steile norske fjellene blir han sn\u00f8blind og m\u00e5 til slutt skj\u00e6re av seg sine frostskadde t\u00e6r for \u00e5 overleve. \n\nDen mest fremtredende norske filmregiss\u00f8r etter 2. verdenskrig, Arne Skouen, har med denne filmen laget et mesterverk, som ble nominert til Oscar for beste utenlandske film i 1957, og siden k\u00e5ret til Norges beste film gjennom tidene. Det vidunderlige norske landskapet danner bakgrunn for den sanne historien om Jan Baalsruds utrolige flukt fra den tyske h\u00e6r. Jack Fjeldstad (Gull Og Gr\u00f8nne Skoger) spiller Baalsrud med imponerende overbevisning, og ble i 1985 sl\u00e5tt til ridder av St. Olavordenen for sitt fremragende arbeid i norsk filmkunst. ", "dir": "Arne Skouen", "etitle": "Nine Lives", "country": "NOR", "imdb_id": "", "folk": "Jack Fjeldstad, Henny Moan, Alf Malland, Joachim Holst-Jensen, Lydia Op\u00f8ien, Edvard Drabl\u00f8s"},
{"year": 2003, "otitle": "Villmark", "youtube trailer id": "", "ntitle": "Villmark", "mod_date": null, "length": 84, "id": 1637, "keywords": null, "reg_date": null, "description": "De d\u00f8des tjern m\u00f8ter Blair Witch Project.\n\nTV-sjefen Gunnar tar fire nyansatte med p\u00e5 tur til hytta der han tilbragte mange somre som barn. Hytta ligger langt fra folk, inne i en dyp skog. Der skal de fem klare seg en helg med mat de finner i naturen, og uten goder som mobiltelefon og sigaretter.\nDa to av dem finner et lik i et tjern n\u00e6r hytta, settes den lille gruppa p\u00e5 en hard pr\u00f8ve. Ved \u00e5 r\u00f8re ved tjernet har de tr\u00e5dd inn i noe de ikke aner konsekvensene av.\nSkogen lukker dem inne og n\u00e5r m\u00f8rket faller p\u00e5 begynner skremmende ting \u00e5 skje. Redde og paranoide mistenker de hverandre. Marerittet har s\u00e5 vidt begynt...\n\nOriginal tale, mulighet for teksting p\u00e5 engelsk, dansk, svensk og finsk.", "dir": "P\u00e5l \u00d8ie", "etitle": "Villmark", "country": "NOR", "imdb_id": "", "folk": "Bj\u00f8rn Floberg, Sampda Sharma, Kristoffer Joner, Marko Kanic, Eva R\u00f6se,"}
]

// Implementerer "handlebars"-aktige HTML-templater/databinding
//function display(){
//	// Hent alle noder fra DOM
//	var dom = document.getElementsByTagName("*"); 
//	
//	for (var i = 0; i < dom.length; i++) {
//		text = dom[i].textContent;
//		length = text.length;
//
//		// Evaluer cmd fra alle div-noder som har tekst på formen {{ cmd }}
//		// og erstatt med resultatet av eval
//		if (length > 4 
//		    && (text[0] === "{")
//			&& (text[1] === "{")
//			&& (text[length-1] === "}")
//			&& (text[length-2] === "}")) {
//			innerCode = text.substring(2, length-2)
//			result = eval(innerCode)
//			dom[i].textContent = eval(innerCode)
//		}
//	}
//}

function recurse_dom(node) {
	var children = node.childNodes;
	
	text = node.textContent;
	length = text ? text.length || 0 : 0;
	repeatAttr = node.attributes ? node.attributes.getNamedItem("data-repeat") || null : null;
	repeatVal = repeatAttr ? repeatAttr.value : null; 

	if (repeatVal) {
		child = node.children ? node.children.length > 0 ? node.children[0] : null : null;
		arr = eval(repeatVal)

		if (!child) { return; }
		tagName = child.nodeName;
		text = child.textContent;	

		for (var i = 0; i < arr.length; i++) {
			newNode = child.cloneNode(true);
			node.appendChild(newNode)
			newNode.innerHTML = newNode.innerHTML.replace(new RegExp('\\$elt', 'g'), repeatVal + "[" + i + "]")
			console.log(newNode.innerHTML)
		}

		node.removeChild(child);
	}

	if (!node.hasChildNodes() 
		&&length > 4 
		&& (text[0] === "{")
		&& (text[1] === "{")
		&& (text[length-1] === "}")
		&& (text[length-2] === "}")) {
		innerCode = text.substring(2, length-2)
		result = eval(innerCode)
		node.textContent = eval(innerCode)
	}
	
	children.forEach(recurse_dom)
}

function display() {
	recurse_dom(document)
}


window.onload = function() {
	query_params = get_query_string_parameters();

	search_results = movies_object;

	// denne variablen lagres moviedetaljer fra søkefunksjonen.
	var foundMovies;
	
	if (query_params.film_title) {
     	film_title = document.getElementById("film_title");
		//Her kan dere for eksempel kalle en søkefunksjon som søker for tittel.

		foundMovies = search_for_title(query_params.film_title, search_results);
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
	//searchResults = foundMovies;
	display()
}