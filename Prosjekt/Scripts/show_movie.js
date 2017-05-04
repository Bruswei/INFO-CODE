function panic(message) {
    // window.history.back();
    alert(message);
}

// Modellen 
var displayMovie = {};

var displayReview = [];

var reviewStats = {
    average: null, 
    numReviews: 0
};

function add_row(table, left, right) {
    new_row = document.createElement("TR");
    left_cell = document.createElement("TD");
    left_cell.appendChild(left);
    new_row.appendChild(left_cell);
    
    right_cell = document.createElement("TD");
    right_cell.appendChild(right);
    new_row.appendChild(right_cell);
    
    table.appendChild(new_row);
}

window.onload = function() {
    query_params = get_query_string_parameters();
    if (!query_params.id) {
        panic("No id given");
        return;
    }
    
    // get the movie_object from the "database" movies_object
    movie_object = movies_object[query_params.id];
    displayMovie = movie_object;
    review_object = reviews_object[query_params.id];

    // Hvis filmen har en review.
    if (review_object){
        var ratingSum = 0, numReviews = 0;
        for (key in review_object){
            displayReview.push(review_object[key])
            ratingSum += review_object[key].rating;
            numReviews++;
        }
        // Oppdaterer global.
        reviewStats.average = ratingSum / numReviews;
        reviewStats.numReviews = numReviews;
    }

    if (!movie_object) {
	panic("Could not retrieve movie_object!");
	return;
    }
    
    // get the genre info (if it exists)
    genre_object = genres_object[query_params.id];
    // get the review info (if it exists)
    review_object = reviews_object[query_params.id];
    
    
    // render page
    var title_element = document.getElementById("otitle");
    // title_element.appendChild(document.createTextNode(movie_object["otitle"]));    
    title_element.innerHTML = movie_object["otitle"];
    
    // add a "debug-table" on the bottom showing all elements from movie_object
    stats_table = document.getElementById("movie_stat_table");
    for (key in movie_object) {
        if (!movie_object[key] == "") {
            left = document.createTextNode(key);
            right = document.createTextNode(movie_object[key]);
            add_row(stats_table, left, right);
        }
    }
    
    // add a "debug-table" on the bottom showing all genre info
    for (var i in genre_object) {
           document.getElementById('div_test').innerHTML += (genre_object[i]) + ", ";
    }
    

    // review object debug-table
    review_table = document.getElementById("review_stat_table");
    for (key in review_object) {
	left = document.createTextNode(key);
	right = document.createTextNode(review_object[key]);
	add_row(review_table, left, right);
	for (subkey in review_object[key]) {
	    left = document.createTextNode(" -> " + subkey);
	    right = document.createTextNode(review_object[key][subkey]);
	    add_row(review_table, left, right);
	}
    }

    display();
};
