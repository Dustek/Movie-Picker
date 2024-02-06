const apiKey = "d1bd943fc99631774931a9f3f8646804"; //my TMDB API key site https://www.themoviedb.org/settings/api

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


});