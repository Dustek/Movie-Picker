    var apiKey = "d1bd943fc99631774931a9f3f8646804"; //my TMDB API key site https://www.themoviedb.org/settings/api

    $(document).ready(function() {

        $("#mymoviesbutton").click(function() {
            window.location.href = "my_movies.html";
        });

        $("#backbutton").click(function() {
            window.location.href = "index.html";
        });

        let formSubmissionCount = 0
        // Streaming availability API 
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

        const searchForm = $("#movieForm");
        searchForm.submit(function(event) {
            $(".movie").each(function() {
                $(this).find(".movie-info h3").text(""); // Clear movie title
                $(this).find(".movie-info p").text("");  // Clear genre
                $(this).find("img").attr("src", "").show(); // Clear image source and show hidden image
            });
            event.preventDefault();
            formSubmissionCount++;

            if (formSubmissionCount === 2) {
                // Reload the page
                location.reload();
            }   


            // finding criteria based on input in form
            const genre = $(this).find("#genre").val();
            const originalLanguage = $(this).find("#original-language").val();

            // constructed criteria
            const criteria = {
                sort_by: "popularity.desc",
                with_genres: genre,
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

            fetch(fullUrl)
                .then(response => response.json())
                .then((data) => {
                    console.log(data.results);
                    displayMovies(data.results)
                })
                .catch(error => console.error("Error fetching movies:", error));
        }

        function displayMovies(movies) {
            // Clear existing movie info before displaying new ones
            $(".movie-info h3, .movie-info p").text("");
            $(".movie img").attr("src", "").hide();
        
            movies.forEach((movie, index) => {
                const movieCard = $(`#movie${index + 1}`);
                const movieInfo = movieCard.find(".movie-info");
        
                movieInfo.find("h3").text(movie.title);
                movieInfo.find("p").text(`Genre: ${getGenre(movie.genre_ids[0])}`);
                movieInfo.find("p").after(`<p>${movie.overview}</p>`);  
        
                movieCard.attr("data-movieid", movie.id);
        
                if (movie.backdrop_path) {
                    const imageUrl = `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`;
                    movieCard.find("img").attr("src", imageUrl).show();
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

        $(document).ready(function() {
            $('.saveButton').click(function() {
                // Retrieve movie information from the clicked button's parent element
                var movieElement = $(this).closest('.movie');
                var movieTitle = movieElement.find('h3').text();
                var genre = movieElement.find('p').text();
                var imageUrl = movieElement.find('img').attr('src');
        
                // Create a movie object with the retrieved information
                var movie = {
                    title: movieTitle,
                    genre: genre,
                    imageUrl: imageUrl
                };
        
                // Retrieve existing saved movies from local storage
                var savedMovies = localStorage.getItem('savedMovies');
        
                // Parse the JSON data or initialize an empty array if no movies are saved
                var moviesArray = savedMovies ? JSON.parse(savedMovies) : [];
        
                // Add the new movie to the array
                moviesArray.push(movie);
        
                // Convert the updated array back to JSON and save it in local storage
                localStorage.setItem('savedMovies', JSON.stringify(moviesArray));
            });
        });})
