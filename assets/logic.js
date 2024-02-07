var apiKey = "d1bd943fc99631774931a9f3f8646804"; //my TMDB API key site https://www.themoviedb.org/settings/api

// Streaming availability API 
// Streaming availability API 
// Streaming availability API 
$(document).ready(function() {
    $('.streamButton').click(function() {
        $('#streamingOptions').empty(); // Clears current options displayed
        var movieID = $(this).closest('.movie').data('movieid'); // Finds the ID from the movieid data attribute

        // Make the API call with the retrieved movie ID
        const url = 'https://streaming-availability.p.rapidapi.com/get?output_language=en&tmdb_id=movie%2F' + movieID;
        const headers = {
            'X-RapidAPI-Key': '33f6a33b50msh44eaaaf10ff1208p1390ecjsn752ee4c6b130',
            'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
        };

        fetch(url, { method: 'GET', headers: headers })
            .then(response => response.json())
            .then(response => {
                const addedOptions = new Set(); // To store unique options
                if (!response.result.streamingInfo.gb || response.result.streamingInfo.gb.length === 0) {
                    console.log("no options");
                    $('#streamingOptions').text('Sorry, no streaming options available :(');
                } else {
                    response.result.streamingInfo.gb.forEach(function(option, index) {
                        const optionKey = option.service.toLowerCase(); // Consider option case-insensitive
                        if (!addedOptions.has(optionKey)) { // Check if option is already added
                            var title = $("<h3>").text(response.result.title);
                            var optionElement = $("<h4>").text("Option " + (index + 1) + ": " + option.service);
                            $('#streamingOptions').append(title, optionElement);
                            addedOptions.add(optionKey); // Add option to the set
                        }
                    });
                }
            })
            .catch(error => console.error('Error fetching streaming info:', error));
    });
});




$(document).ready(function() {

    var criteria = {
        sort_by: "popularity.desc", // Sorting by popularity in descending order
        // "release_date.gte": "1999-12-31",
        // "release_date.lte": "2001-12-31",
        with_genres: "18", // Genre ID for Action (you can replace this with the desired genre)
        // release_country: "US", // Specify the country code (e.g., "US" for United States)
        // with_runtime_gte: 60,  // Movies with a runtime greater than or equal to 60 minutes (1 hour)
        // with_runtime_lte: 120, // Movies with a runtime less than or equal to 120 minutes (2 hours)
        // with_cast: "123,456",  // Replace with actual actor IDs (you can provide multiple IDs)
        // with_keywords: "cowboy"
        with_original_language: "en"
    };

    $(document).ready(function() {

        const searchForm = $("#movieForm");
        searchForm.submit(function(event) {
            event.preventDefault();

            // finding criteria based on input in form
            const originalLanguage = $(this).find("#original-language").val();

            // constructed criteria
            const criteria = {
                sort_by: "popularity.desc",
                with_genres: "18",
                with_original_language: originalLanguage
            };
            fetchMovies(criteria); // Pass criteria object to fetchMovies
        });

        function fetchMovies(criteria) {
            var url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`;
            // Build the query string with criteria
            var queryString = Object.entries(criteria)
                .map(([key, value]) => `${key}=${value}`)
                .join("&");
            var fullUrl = `${url}&${queryString}`;
            //console.log(fullUrl)

            fetch(fullUrl)
                .then(response => response.json())
                .then((data) => {
                    console.log(data.results);
                    displayMovies(data.results)
                })

            .catch(error => console.error("Error fetching movies:", error));
        }
    });

    function displayMovies(movies) {
        movies.forEach((movie, index) => {
            const movieCard = $(`#movie${index + 1}`);
            const movieInfo = movieCard.find(".movie-info");

            movieInfo.find("h3").text(movie.title);
            movieInfo.find("p").text(`Genre: ${getGenre(movie.genre_ids[0])}`);
            movieInfo.find("p").after(`<p>${movie.overview}</p>`);

            movieCard.attr("data-movieid", movie.id);

            if (movie.backdrop_path) {
                const imageUrl = `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`;
                movieCard.find("img").attr("src", imageUrl);
            } else {
                movieCard.find("img").hide();
            }
        });
    }



    function getGenre(genreId) {
        // Function to retrieve genre name based on genre ID
        // You can replace this function with a lookup table or API call to fetch genre names
        switch (genreId) {
            case 28:
                return "Action";
            case 12:
                return "Adventure";
            case 16:
                return "Animation";
            case 35:
                return "Comedy";
            case 80:
                return "Crime";
            case 99:
                return "Documentary";
            case 18:
                return "Drama";
            case 10751:
                return "Family";
            case 14:
                return "Fantasy";
            case 36:
                return "History";
            case 27:
                return "Horror";
            case 10402:
                return "Music";
            case 9648:
                return "Mystery";
            case 10749:
                return "Romance";
            case 878:
                return "Science Fiction";
            case 10770:
                return "TV Movie";
            case 53:
                return "Thriller";
            case 10752:
                return "War";
            case 37:
                return "Western";
            default:
                return "Unknown";
        }
    }


    // Functionality for save buttons
    $('.saveButton').click(function() {
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

            $.each(movies, function(index, movie) {
                var movieElement = $('<div class="savedMovie">');
                movieElement.append('<img src="' + movie.imageUrl + '" alt="' + movie.title + '">');
                movieElement.append('<h3>' + movie.title + '</h3>');
                movieElement.append('<p>Genre: ' + movie.genre + '</p>');

                var deleteButton = $('<button class="deleteButton">Delete</button>');
                deleteButton.click(function() {
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
    $(document).on('DOMContentLoaded', function() {
        console.log("hello world");
        displaySavedMovies();
    });

    // Event listener for the back button
    $("#backbutton").click(function() {
        window.location.href = "index.html";
    });

    // Event listener for navigating to the my_movies.html page
    $("#mymoviesbutton").click(function() {
        window.location.href = "my_movies.html";
    });



    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer d1bd943fc99631774931a9f3f8646804'
        }
    };

    fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
})

// Streaming availability API 
// Streaming availability API 
// Streaming availability API 
$(document).ready(function() {
    $('.streamButton').click(function() {
        $('#streamingOptions').empty(); // Clears current options displayed
        var movieID = $(this).closest('.movie').data('movieid'); // Finds the ID from the movieid data attribute

        // Make the API call with the retrieved movie ID
        const url = 'https://streaming-availability.p.rapidapi.com/get?output_language=en&tmdb_id=movie%2F' + movieID;
        const headers = {
            'X-RapidAPI-Key': '33f6a33b50msh44eaaaf10ff1208p1390ecjsn752ee4c6b130',
            'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
        };
        
        fetch(url, { method: 'GET', headers: headers })
            .then(response => response.json())
            .then(response => {
                const addedOptions = new Set(); // To store unique options
                if (!response.result.streamingInfo.gb || response.result.streamingInfo.gb.length === 0) {
                    console.log("no options");
                    $('#streamingOptions').text('Sorry, no streaming options available :(');
                } else {
                    response.result.streamingInfo.gb.forEach(function(option, index) {
                        const optionKey = option.service.toLowerCase(); // Consider option case-insensitive
                        if (!addedOptions.has(optionKey)) { // Check if option is already added
                            var title = $("<h3>").text(response.result.title);
                            var optionElement = $("<h4>").text("Option " + (index + 1) + ": " + option.service);
                            $('#streamingOptions').append(title, optionElement);
                            addedOptions.add(optionKey); // Add option to the set
                        }
                    });
                }
            })
            .catch(error => console.error('Error fetching streaming info:', error));
    });
});




$(document).ready(function() {

    // var criteria = {
    //     sort_by: "popularity.desc",  // Sorting by popularity in descending order
    //     // "release_date.gte": "1999-12-31",
    //     // "release_date.lte": "2001-12-31",
    //     with_genres: "18",  // Genre ID for Action (you can replace this with the desired genre)
    //     // release_country: "US", // Specify the country code (e.g., "US" for United States)
    //     // with_runtime_gte: 60,  // Movies with a runtime greater than or equal to 60 minutes (1 hour)
    //     // with_runtime_lte: 120, // Movies with a runtime less than or equal to 120 minutes (2 hours)
    //     // with_cast: "123,456",  // Replace with actual actor IDs (you can provide multiple IDs)
    //     // with_keywords: "cowboy"
    //     with_original_language: "en"
    // };

    $(document).ready(function() {

        const searchForm = $("#movieForm");
        searchForm.submit(function(event) {
            event.preventDefault();
            clearMovies()

            // finding criteria based on input in form
            const originalLanguage = $(this).find("#original-language").val();

            // constructed criteria
            const criteria = {
                sort_by: "popularity.desc",
                with_genres: "18",
                with_original_language: originalLanguage
            };
            fetchMovies(criteria); // Pass criteria object to fetchMovies
        });

    function fetchMovies(criteria) {
        const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`;
        // Build the query string with criteria
        const queryString = Object.entries(criteria)
            .map(([key, value]) => `${key}=${value}`)
            .join("&");
        const fullUrl = `${url}&${queryString}`;
        //console.log(fullUrl)

        fetch(fullUrl)
            .then(response => response.json())
            .then((data) => {
                console.log(data.results);
                displayMovies(data.results)
            })

        .catch(error => console.error("Error fetching movies:", error));
    }
});

function displayMovies(movies) {
    movies.forEach((movie, index) => {
        const movieCard = $(`#movie${index + 1}`);
        const movieInfo = movieCard.find(".movie-info");
        
        movieInfo.find("h3").text(movie.title);
        movieInfo.find("p").text(`Genre: ${getGenre(movie.genre_ids[0])}`);
        movieInfo.find("p").after(`<p>${movie.overview}</p>`);
        
        movieCard.attr("data-movieid", movie.id);
        
        if (movie.backdrop_path) {
            const imageUrl = `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`;
            movieCard.find("img").attr("src", imageUrl);
        } else {
            movieCard.find("img").hide();
        }
    });
}



function getGenre(genreId) {
    // Function to retrieve genre name based on genre ID
    // You can replace this function with a lookup table or API call to fetch genre names
    switch (genreId) {
        case 28:
            return "Action";
        case 12:
            return "Adventure";
        case 16:
            return "Animation";
        case 35:
            return "Comedy";
        case 80:
            return "Crime";
        case 99:
            return "Documentary";
        case 18:
            return "Drama";
        case 10751:
            return "Family";
        case 14:
            return "Fantasy";
        case 36:
            return "History";
        case 27:
            return "Horror";
        case 10402:
            return "Music";
        case 9648:
            return "Mystery";
        case 10749:
            return "Romance";
        case 878:
            return "Science Fiction";
        case 10770:
            return "TV Movie";
        case 53:
            return "Thriller";
        case 10752:
            return "War";
        case 37:
            return "Western";
        default:
            return "Unknown";
    }
}


// Functionality for save buttons
$('.saveButton').click(function() {
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

        $.each(movies, function(index, movie) {
            var movieElement = $('<div class="savedMovie">');
            movieElement.append('<img src="' + movie.imageUrl + '" alt="' + movie.title + '">');
            movieElement.append('<h3>' + movie.title + '</h3>');
            movieElement.append('<p>Genre: ' + movie.genre + '</p>');

            var deleteButton = $('<button class="deleteButton">Delete</button>');
            deleteButton.click(function() {
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
$(document).on('DOMContentLoaded', function() {
    console.log("hello world");
    displaySavedMovies();
});

// Event listener for the back button
$("#backbutton").click(function() {
    window.location.href = "index.html";
});

// Event listener for navigating to the my_movies.html page
$("#mymoviesbutton").click(function() {
    window.location.href = "my_movies.html";
});



const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer d1bd943fc99631774931a9f3f8646804'
    }
  };
  
  fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err)); } )



    function clearMovies(){
        
    }