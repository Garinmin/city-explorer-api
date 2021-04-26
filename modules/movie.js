'use strict'

require('dotenv').config();
const superagent = require('superagent');

const inMemoryDB = {};

class Movies {
  constructor(movie) {
    this.title = movie.title;
    this.popularity = movie.popularity;
  }
}

async function getMovieHandler(request, response) {

    const key = process.env.MOVIE_API_KEY;
    const cityName = request.query.cityName;
    const dataAlreadyFound = inMemoryDB[cityName] !== undefined;

  try {

    if (dataAlreadyFound) {
      const movies = inMemoryDB[cityName].movies;
      response.status(200).send(movies);
    } else {
      const url = `https://api.themoviedb.org/3/search/movie?query=${cityName}&api_key=${key}`;
      const query = {
        query: cityName  
      };
      const movieResponse = await superagent
        .get(url)
        .query(query)
        .then(response => {
          const movieObject = JSON.parse(movieResponse.text);
          const movies = movieObject.results.map(movie => new Movies(movie));
          inMemoryDB[cityName] = { 
            movies, 
            timestamp: Date.now() 
          };
          response.send(movies);
        });
    }
  }

  catch (err) {
    response.status(err).send('error', err);
  }   
}

module.exports = getMovieHandler;