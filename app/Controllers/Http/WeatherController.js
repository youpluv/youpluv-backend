"use strict";

const fetch = require("node-fetch");

class WeatherController {
  async getWeather({ response }) {
    const query = response.get();
    const url = `http://api.openweathermap.org/data/2.5/forecast?zip=${query.zip}&id=56d5bb6657707845fbe02c5bea0e7b83`;
    const response = await fetch(url).then(res => res.json());
    return response;
  }
}

module.exports = WeatherController;
