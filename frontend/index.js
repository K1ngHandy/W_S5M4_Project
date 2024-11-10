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
    // queries
  const weatherWidget = document.querySelector('#weatherWidget');
  const today = document.querySelector('#todayDescription');
  const location = document.querySelector('#location');
  const dropdown = document.querySelector('#citySelect');
  const apparentTemp = weatherWidget.querySelector('#apparentTemp');
  const currentStats = weatherWidget.querySelector('#todayStats');
  const forecast = weatherWidget.querySelectorAll('.next-day');
  const info = document.querySelector('.info');

  weatherWidget.style.display = 'none';

    // precipitation
  const calculatePrecipitation = (data) => {
    const precipitation = "precipitation_probability";

    return `${data[precipitation] * 100}%`;
  };

    // weather emoji
  const emoji = (weatherDescription) => {
    if (typeof weatherDescription !== 'string') return "🌡️";

    const match = descriptions.find(description => 
      description[0].toLowerCase() === weatherDescription.toLowerCase()
    )
    return match ? match[1] : "🌡️";
  };

  dropdown.addEventListener('change', (event) => {
    info.textContent = '';
    dropdown.disabled = true;

    let currentCity = event.target.value;
    console.log('Current City:', currentCity);

    const fetch = () => {
      // dropdown.disabled = true;
      info.textContent = 'Fetching weather data...';
      weatherWidget.style.display = 'none';

      axios.get(`http://localhost:3003/api/weather?city=${currentCity}`)
        .then(res => {
          currentCity.disabled = true;
          const data = res.data;

          let currentData = data.current;
          let forecastData = data.forecast.daily;
          let locationData = data.location;
        
          // current
          const todayDescription = currentData.weather_description;
          const currentPrecipitation = calculatePrecipitation(currentData);
          const currentHumidity = currentData.humidity;

          today.innerText = emoji(todayDescription);
          
          apparentTemp.children[1].innerText = `${currentData.apparent_temperature}°`;
          currentStats.children[0].innerText = `${currentData.temperature_min}°/${currentData.temperature_max}°`;
          currentStats.children[1].innerText = `Precipitation: ${currentPrecipitation}`;
          currentStats.children[2].innerText = `Humidity: ${currentHumidity}%`;
          currentStats.children[3].innerText = `Wind: ${currentData.wind_speed} m/s`;
          location.children[0].innerText = locationData.city;
          location.children[1].innerText = locationData.country;
          
          // forecast
          forecast.forEach((day, index) => {
            if (forecastData[index]) {
              const forecastPrecipitation = calculatePrecipitation(forecastData[index]);
              const forecastDescription = forecastData[index].weather_description;
              const forecastEmoji = emoji(forecastDescription);

              // day of the week
              const date = new Date(forecastData[index].date);
              const options = { weekday: 'long' };
              const dayOfWeek = date.toLocaleDateString('en-US', options);
            
              day.children[0].innerText = `${dayOfWeek}`;
              day.children[1].innerText = `${forecastEmoji}`;
              day.children[2].innerText = `${forecastData[index].temperature_min}°/${forecastData[index].temperature_max}°`;
              day.children[3].innerText = `Precipitation: ${forecastPrecipitation}`;
            }
          });
        
          // weatherWidget.style.display = 'block';
        })
        .catch((error) => {
          console.error(`Error fetching selected city: ${currentCity}`, error);
        })
        .finally(() => {
          dropdown.disabled = false;
          weatherWidget.style.display = 'block';
          info.textContent = '';
          currentCity.disabled = false;
        })
      };

      if (typeof axios !== 'undefined') {
        fetch();
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
