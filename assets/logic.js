const apiKey = "d1bd943fc99631774931a9f3f8646804"; //my TMDB API key site https://www.themoviedb.org/settings/api

// // Streaming availability API 
// var movieID = "movie%2F597" //This is the movie ID - in this case, Titanic

// const settings = {
// 	async: true,
// 	crossDomain: true,
// 	url: 'https://streaming-availability.p.rapidapi.com/get?output_language=en&tmdb_id=' + movieID, // insert movie ID from TMDB API here to change what movie data gets returned
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': '33f6a33b50msh44eaaaf10ff1208p1390ecjsn752ee4c6b130',
// 		'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
// 	}
// };


// $.ajax(settings).done(function (response) {
// 	console.log(response);
//     console.log("The movie titanic can be streamed on:")
//     console.log(response.result.streamingInfo.gb[0].service)
//     console.log(response.result.streamingInfo.gb[1].service)
//     console.log(response.result.streamingInfo.gb[2].service)
// })


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
                console.log(data.results);

                displayMovies(data.results)
            })

        .catch(error => console.error("Error fetching movies:", error));
    }
    fetchMovies("Fast and Furios")

    function displayMovies(moviedata) {

    }

// Movie search criteria

const criteria = {
    sort_by: "popularity.desc",  // Sorting by popularity in descending order
    release_date_gte: "2000-01-01",  // Movies released on or after January 1, 2000
    release_date_lte: "2022-12-31", // Movies released on or before December 31, 2022
    with_genres: "28",  // Genre ID for Action (you can replace this with the desired genre)
    release_country: "US", // Specify the country code (e.g., "US" for United States)
    with_runtime_gte: 60,  // Movies with a runtime greater than or equal to 60 minutes (1 hour)
    with_runtime_lte: 120, // Movies with a runtime less than or equal to 120 minutes (2 hours)
    with_cast: "123,456",  // Replace with actual actor IDs (you can provide multiple IDs)
};

};



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


// Functionality for save buttons
$('.saveButton').click(function () {
    console.log("click");
    var movieElement = $(this).closest('.movie');
    var movieTitle = movieElement.find('h3').text();
    var genre = movieElement.find('p').text();
    var imageUrl = movieElement.find('img').attr('src');

    var movie = {
        title: movieTitle,
        genre: genre,
        imageUrl: imageUrl
    };

    // Retrieve existing saved movies from local storage
    var savedMovies = localStorage.getItem('savedMovies');

    // Check if there are already saved movies
    if (savedMovies) {
        // Parse the JSON data
        var moviesArray = JSON.parse(savedMovies);

        // Add the new movie to the array
        moviesArray.push(movie);

        // Convert the updated array back to JSON and save it
        localStorage.setItem('savedMovies', JSON.stringify(moviesArray));
    } else {
        // If no saved movies exist, create a new array with the current movie
        localStorage.setItem('savedMovies', JSON.stringify([movie]));
    }
});

// Functionality for displaying saved movies
function displaySavedMovies() {
    console.log("movies displayed");
    var myMoviesContainer = $('#myMoviesContainer');
    myMoviesContainer.empty();
    var savedMovies = localStorage.getItem('savedMovies');

    if (savedMovies) {
        var movies = JSON.parse(savedMovies);

        $.each(movies, function (index, movie) {
            var movieElement = $('<div class="savedMovie">');
            movieElement.append('<img src="' + movie.imageUrl + '" alt="' + movie.title + '">');
            movieElement.append('<h3>' + movie.title + '</h3>');
            movieElement.append('<p>Genre: ' + movie.genre + '</p>');

            var deleteButton = $('<button class="deleteButton">Delete</button>');
            deleteButton.click(function () {
                // Remove the movie from the array
                movies.splice(index, 1);
                // Update local storage with the modified array
                localStorage.setItem('savedMovies', JSON.stringify(movies));
                // Update the displayed movies
                displaySavedMovies();
            });
            movieElement.append(deleteButton);

            myMoviesContainer.append(movieElement);
        });
    } else {
        myMoviesContainer.html('<p>No movies saved yet.</p>');
    }
}

    // Event listener for when the my_movies.html page is loaded
    $(document).on('DOMContentLoaded', function () {
        console.log("hello world");
        displaySavedMovies();
    });

// Event listener for the back button
$("#backbutton").click(function () {
    window.location.href = "index.html";
});

// Event listener for navigating to the my_movies.html page
$("#mymoviesbutton").click(function () {
    window.location.href = "my_movies.html";
});