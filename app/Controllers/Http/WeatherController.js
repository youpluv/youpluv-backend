"use strict";

const fetch = require("node-fetch");

class WeatherController {
  async getWeather({ request }) {
    const query = request.get();

    const region = query.region || "Rio de Janeiro";

    const url = `http://api.openweathermap.org/data/2.5/forecast?q=${region}&appid=56d5bb6657707845fbe02c5bea0e7b83&units=metric`;

    const response = await fetch(url).then(res => res.json());
    const list = response.list.splice(0, 3);
    const listMap = list.map((item, index) => ({
      temp: item.main.temp,
      tempMin: item.main.temp_min,
      tempMax: item.main.temp_max,
      weather: item.weather.pop().main.toLowerCase()
    }));
    return listMap;
  }
}

module.exports = WeatherController;
