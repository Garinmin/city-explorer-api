'use strict'

require('dotenv').config();
const superagent = require('superagent');

class Forecast {
  constructor(day) {
    this.description = day.weather.description;
    this.date = day.valid_date;
  }
}

async function getWeatherHandler(request, response) {
  try {

    const lat = request.query.lat;
    const lon = request.query.lon;
    const key = process.env.WEATHER_API_KEY;

    const url = `http://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${key}`;

    const weatherResponse = await superagent.get(url);
    const weatherObject = JSON.parse(weatherResponse.text);
    const weatherArray = weatherObject.data;
    const weather = weatherArray.map(day => new Forecast(day));

    response.send(weather);

  } catch (err) {
    response.status(err).send('error', err);
  }
}

module.exports = getWeatherHandler;