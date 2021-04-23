'use strict'

require('dotenv').config();
const superagent = require('superagent');

class Movies {
  constructor(movie) {
    this.title = movie.title;
    this.popularity = movie.popularity;
  }
}

async function getMovieHandler(request, response) {

    const movieKey = process.env.MOVIE_API_KEY;
    const cityName = request.query.cityName;

    const url = `https://api.themoviedb.org/3/movie/550?api_key=${movieKey}&query=${cityName}`;
    
    const movieResponse = await superagent.get(url);
    const movieObject = JSON.parse(movieResponse.text);
    const movies = movieObject.results.map(movie => new Movies(movie));

    response.send(movies);
}

module.exports = getMovieHandler;