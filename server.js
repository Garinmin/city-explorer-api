'use strict'

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();
const superagent = require('superagent');

const PORT = process.env.PORT || 3001;

const getWeatherHandler = require('./weather');
const getMovieHandler = require('./movie');


app.use(cors());

app.get('/', (request, response) => {
  response.send('Home page');
});

app.get('/weather', getWeatherHandler);

app.get('/movies', getMovieHandler);


app.get('*', (request, response) => {
  response.status(400, 404, 500).send('error');
});


app.listen(PORT, () => console.log(`Listening on ${PORT}`));