console.log("hello world")
const apiKey = "d1bd943fc99631774931a9f3f8646804"; //my TMDB API key site https://www.themoviedb.org/settings/api
 main

STREAMING_API
// Streaming availability API 
var movieID = "movie%2F597" //This is the movie ID - in this case, Titanic

const settings = {
	async: true,
	crossDomain: true,
	url: 'https://streaming-availability.p.rapidapi.com/get?output_language=en&tmdb_id=' + movieID, // insert movie ID from TMDB API here to change what movie data gets returned
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '33f6a33b50msh44eaaaf10ff1208p1390ecjsn752ee4c6b130',
		'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
	}
};

$.ajax(settings).done(function (response) {
	console.log(response);
    console.log("The movie titanic can be streamed on:")
    console.log(response.result.streamingInfo.gb[0].service)
    console.log(response.result.streamingInfo.gb[1].service)
    console.log(response.result.streamingInfo.gb[2].service)
})
$(document).ready(function() {

    // Element references
    const searchForm = $("#movieForm");
    const movieList = $("#movie-list");

    function fetchMovies(criteria) {
        const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`;

        // Build the query string with criteria
        const queryString = Object.entries(criteria)
            .map(([key, value]) => `${key}=${value}`)
            .join("&");

        const fullUrl = `${url}&${queryString}`;

        fetch(fullUrl)
            .then(response => response.json())
            .then((data) => {

                displayMovies(data.results)
            })

        .catch(error => console.error("Error fetching movies:", error));
    }
    fetchMovies("Fast and Furios")

    function displayMovies(moviedata) {
        console.log(moviedata)

    }
    // to make displayMovies function 

    //     // Handle form submission
    //     searchForm.submit(function(event) {
    //         event.preventDefault(); // Prevent default form submission

    //         const criteria = {
    //             genre: $(this).find("#genre").val(),
    //             primary_release_year: $(this).find("#year").val(),
    //             //Gather other criteria from form fields
    //         };

    //         fetchMovies(criteria);
    //     });

});



$("#backbutton").click(function(){
	window.location.href = "index.html";
});

$("#mymoviesbutton").click(function(){
	window.location.href = "my_movies.html";
});
