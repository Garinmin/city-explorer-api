'use strict'

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const weather = require('./data/weather.json');
const app = express();

app.use(cors());

function Forecast(day) {
    this.description = day.weather.description;
    this.date = day.valid_date;
}

app.get('/weather', (request, response) => {
const weather = weatherObject.data.map(day => new Forecast(day));
response.send(weather);
});

app.get('*', (request, response) => {
    response.status(500).send('Something went wrong.');
  });








  