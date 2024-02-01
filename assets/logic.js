console.log("hello world")
<<<<<<< HEAD
























// Streaming availability API 
const settings = {
	async: true,
	crossDomain: true,
	url: 'https://streaming-availability.p.rapidapi.com/get?output_language=en&tmdb_id=movie%2F597', // insert movie ID from TMDB API here to change what movie data gets returned
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '33f6a33b50msh44eaaaf10ff1208p1390ecjsn752ee4c6b130',
		'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
	}
};

$.ajax(settings).done(function (response) {
	console.log(response);
});
=======
const apiKey = "d1bd943fc99631774931a9f3f8646804"; //my TMDB API key site https://www.themoviedb.org/settings/api
>>>>>>> d30cafc532c6cff14fdd09454cf6436028f1dd6a
