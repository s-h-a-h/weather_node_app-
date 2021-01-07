console.log('js is connected');
const appWrap = document.querySelector('form')
const search = document.querySelector('input')
const city = document.querySelector('.city')
const date = document.querySelector('.date')
const temp = document.querySelector('.temp')
const weather = document.querySelector('.weather')

appWrap.addEventListener('submit', (e) => {
  e.preventDefault()
  const location = search.value
  city.textContent = ''
  date.textContent = ''
  temp.textContent = ''
  weather.textContent = ''
  fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        city.textContent = data.error
      } else {
        city.textContent = data.location
        temp.textContent = `It is currently ${data.temperature} degress out.`
        date.textContent = data.time
        // weather.textContent = data.weatherImage
      }
    })
  })
})

