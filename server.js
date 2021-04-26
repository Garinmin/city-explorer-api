'use strict'

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3002;

const getWeatherHandler = require('./modules/weather');
const getMovieHandler = require('./modules/movie');
const notFound = require('./modules/error');

app.use(cors());


app.get('/', (request, response) => {
  response.send('Home page');
});

app.get('/weather', getWeatherHandler);

app.get('/movie', getMovieHandler);

app.get('*', notFound);


app.listen(PORT, () => console.log(`Listening on ${PORT}`));