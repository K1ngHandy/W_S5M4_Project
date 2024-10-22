// import axios from "axios"

async function moduleProject4() {

  // 👇 WORK WORK BELOW THIS LINE 👇
  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

  let descriptions = [
    ["Sunny", "☀️"],
    ["Cloudy", "☁️"],
    ["Rainy", "🌧️"],
    ["Thunderstorm", "⛈️"],
    ["Snowy", "❄️"],
    ["Partly Cloudy", "⛅️"]
  ]

  // 👉 Tasks 1 - 5 go here
    // 1
  const weatherWidget = document.querySelector('#weatherWidget');
  const current = document.querySelector('#today');
  const forecast = document.querySelector('#forecast');
  const location = document.querySelector('#location');

  weatherWidget.style.display = 'none';

    // 2
  const dropdown = document.querySelector('#citySelect');

    // 3
  dropdown.addEventListener('change', (event) => {
    let currentCity = event.target.value;
    const info = document.querySelector('.info');

    if (typeof axios !== 'undefined') {
      info.innerText = 'Fetching weather data...';
      dropdown.style.disabled = true;
      weatherWidget.style.display = 'none';

      axios.get(`http://localhost:3003/api/weather?city=${currentCity}`)
      .then(res => {
        currentCity.disabled = true;
        const data = res.data;
        console.log('Fetch data:', data);
        
        // current
        const currentData = data.current;
        const apparentTemp = weatherWidget.querySelector('#apparentTemp');
        const currentDescription = weatherWidget.querySelector('#todayDescription');
        const currentStats = weatherWidget.querySelector('#todayStats');
        let precipitation = (currentData.precipitation_probability * 100);
        let humidity = currentData.humidity;
        // forecast
        const forecastData = data.forecast;
        // location
        const locationData = data.location;

        apparentTemp.children[1].innerText = currentData.apparent_temperature;
        descriptions.forEach(description => {
          if (description[0] === currentData.weather_description) {
            console.log('Description:', description[1]);
            currentDescription.innerText = `${description[1]}`;
          }
        })
        currentStats.children[0].innerText = `${currentData.temperature_max} / ${currentData.temperature_min}`;
        currentStats.children[1].innerText = `Precipitation: ${precipitation}%`;
        currentStats.children[2].innerText = `Humidity: ${humidity}%`;
        currentStats.children[3].innerText = `Wind: ${currentData.wind_speed} m/s`;

        location.children[0].innerText = locationData.city;
        location.children[1].innerText = locationData.country;

        weatherWidget.style.display = 'block';
      })
      .catch((error) => {
        console.error(`Error fetching selected city: ${currentCity}`, error)
      })
      .finally(() => {
        info.innerText = '';
        currentCity.disabled = false;
      })
    } else {
      console.error('Axios is undefined');
    }
  });

  // 👆 WORK WORK ABOVE THIS LINE 👆

}

// ❗ DO NOT CHANGE THE CODE  BELOW
// ❗ DO NOT CHANGE THE CODE  BELOW
// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { moduleProject4 }
else moduleProject4()
