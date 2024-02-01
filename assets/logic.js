console.log("hello world")
























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