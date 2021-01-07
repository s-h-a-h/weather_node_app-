const request = require('request');

const forecast = (longitude, latitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=ce0fc86e83a8e0d8e07a31fd355faa41&query=${longitude},${latitude}`;
  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback('Unable to connect to weather service', undefined)
    }
    else if (body.error) {
      callback('unable to find location. Try another search!', undefined)
    } else {
      callback(undefined, {
        temperature: body.current.temperature,
        time: body.location.localtime,
        // weatherImage: body.current.weather_icons
      });
    }
  })
}

module.exports = forecast;
