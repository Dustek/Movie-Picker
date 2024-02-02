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

$.ajax(settings).done(function(response) {
    console.log(response);
    console.log("The movie titanic can be streamed on:")
    console.log(response.result.streamingInfo.gb[0].service)
    console.log(response.result.streamingInfo.gb[1].service)
    console.log(response.result.streamingInfo.gb[2].service)
})

// const movieID = "597"; // Movie ID for Titanic

// // Construct the TMDB API URL
// const url = `https://api.themoviedb.org/3/movie/${movieID}?api_key=${apiKey}`;

// // Use fetch instead of jQuery's $.ajax
// fetch(url)
//     .then(response => response.json())
//     .then(data => {
//         console.log(data);

//         // Access movie information directly
//         console.log("Movie title:", data.title);
//         console.log("Release date:", data.release_date);
//         console.log("Overview:", data.overview);
//         // Access other movie details as needed
//     })
//     .catch(error => console.error("Error fetching movie data:", error));