const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const path = require('path')
const express = require('express');
const app = express();

//Define path for engine config
const viewsDirectoryPath = path.join(__dirname, '../templates')
const PublicDirectoryPath = path.join(__dirname, '../public')

//Setup handlebars engine and views location 
app.set('view engine', 'hbs')
app.set('views', viewsDirectoryPath)

//Setup static directory to serve
app.use(express.static(PublicDirectoryPath));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'WeatherApp',
    owner: 'Created by Shah Raza'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Shah Raza',
    profession: 'Web Developer',
    hobbies: 'Programming'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Page',
    EmergencyNumber: '+22 44784597',
    SOS: '220'
  })
})

// app.get('/products', (req, res) => {
//   if (!req.query.search) {
//     return res.send({
//       error: 'You must provide a search term'
//     })
//   }
//   console.log(req.query);
//   res.send({
//     products: []
//   })

// })


app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Please provide address'
    })
  } else {
    geoCode(req.query.address, (error, { longitude, latitude, location } = {}) => {
      if (error) {
        return res.send({ error })
      }

      forecast(longitude, latitude, (error, { temperature, time }) => {
        if (error) {
          return res.send({ error })
        }
        res.send({
          location,
          temperature,
          time,
          // forecast: forecastData,
          // location,
          // address: req.query.address,

        })
      })
    })
  }
})

app.listen(3000, () => {
  console.log('Server is up and running on http://localhost3000');
})
