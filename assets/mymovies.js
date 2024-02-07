$(document).ready(function() {
    const data = JSON.parse(window.localStorage.getItem("savedMovies"));

    // Handle cases where data is null or empty
    if (!data || data.length === 0) {
        // Display appropriate message, e.g., "No saved movies yet"
        $("#myMoviesContainer").html("<p>No saved movies found.</p>");
        return;
    }

    // Dynamically create HTML elements using a loop
    let htmlContent = "";
    for (const movie of data) {
        const movieTitle = movie.title;
        const genreType = movie.genre;
        const movieImage = movie.imageUrl;

        htmlContent += `
        <div class="movie-card">
          <img src="${movieImage}" alt="Poster Image">
          <h5>${movieTitle}</h5>
          <p>${genreType}</p>
        </div>
      `;
    }

    $("#myMoviesContainer").html(htmlContent);
    //Posible
    // buttons for delete here
});