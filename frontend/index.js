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

        let currentData = data.current;
        let forecastData = data.forecast.daily;
        let locationData = data.location;
        
        if (currentData) {
          console.log('Current Data:', data);
        } else if (forecastData) {
          console.log('Forecast Data:', data);
        } else if (locationData) {
          console.log('Location Data:', data);
        }

        const currentDescription = weatherWidget.querySelector('#todayDescription');
        const apparentTemp = weatherWidget.querySelector('#apparentTemp');
        const currentStats = weatherWidget.querySelector('#todayStats');

        const precipitation = "precipitation_probability";
        const calculatePrecipitation = (data, n) => {
          if (!n) {
              return `${data[precipitation] * 100}%`;
          } else {
            return `${data[n][precipitation] * 100}%`;
          }
        };
        let currentPrecipitation = calculatePrecipitation(currentData);
        let humidity = currentData.humidity;

        const emoji = (dataInput) => {
            const match = descriptions.filter(description => description[0] === dataInput.weather_description)
          
            if (match.length > 0) {
              currentDescription.innerText = match[0][1];
            }
        }
        // console.log('Current Data:', emoji(currentData));
        
        // current
        apparentTemp.children[1].innerText = currentData.apparent_temperature;
        
        currentStats.children[0].innerText = `${currentData.temperature_max}° / ${currentData.temperature_min}°`;
        currentStats.children[1].innerText = `Precipitation: ${currentPrecipitation}`;
        currentStats.children[2].innerText = `Humidity: ${humidity}%`;
        currentStats.children[3].innerText = `Wind: ${currentData.wind_speed} m/s`;

        location.children[0].innerText = locationData.city;
        location.children[1].innerText = locationData.country;

        // forecast
        const nextDays = weatherWidget.querySelectorAll('.next-day');
        
        nextDays.forEach(day => {
          for (let n = 0; n < forecastData.length; n++) {
            let forecastPrecipitation = calculatePrecipitation(forecastData, n);

            console.log('Next days N children:', nextDays[n].children);
          
            day.children[1].innerText = `${forecastData[n].weather_description}`;
            day.children[2].innerText = `${forecastData[n].temperature_max}° / ${forecastData[n].temperature_min}°`;
            day.children[3].innerText = `Precipitation: ${forecastPrecipitation}`;
          }
        });
        
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
