'use strict'

const express = require('express');
require('dotenv').config();
const superagent = require('superagent');
const cors = require('cors');
const weatherObject = require('./data/weather.json');
const app = express();

const PORT = process.env.PORT;

/* const apiUrl = `https://us1.locationiq.com/v1/search.php?key=${process.env.WEATHER_API_KEY}&q=${this.state.searchQuery}&format=json`;
 */
app.use(cors());

 

class Forecast {
  constructor(day) {
    this.description = day.weather.description;
    this.date = day.valid_date;
  }
}

class Movies {
  constructor(movie) {
    this.name = movie.title
  }
}

async function getWeatherHandler(request, response) {
  
  const lat = request.query.lat;
  const lon = request.query.lon;

  const key = process.env.WEATHER_API_KEY;
  const url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${key}&lat=${lat}&lon=${lon}`;

  const weatherResponse = await superagent.get(url);

  const weatherObject = JSON.parse(weatherResponse.text);
  const weatherArray = weatherObject.data;


  const weather = weatherArray.map((day) => new Forecast(day));
  response.send(weather);
} 
  


  async function getMovieHandler(request, response) {
  
  const city = request.query.city;
  const key = process.env.MOVIE_API_KEY;
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${city}`

  const movieResponse = await superagent.get(url);
  const movieObject = JSON.parse(movieResponse.text);

  const movies = movieObject.results.map(movie => new Movies(movie));

  response.send(movies);

}

app.get('/', (request, response) => {
  response.send('Home page');
});

app.get('/weather', getWeatherHandler);
app.get('/movie', getMovieHandler);

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));