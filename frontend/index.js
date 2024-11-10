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

  dropdown.addEventListener('change', async (event) => {
    info.textContent = 'Fetching weather data...';
    dropdown.disabled = true;

    let currentCity = event.target.value;
    console.log('Current City:', currentCity);

    const fetch = async () => {
      axios.get(`http://localhost:3003/api/weather?city=${currentCity}`)
        .then(res => {
          const data = res.data;

          let currentData = data.current;
          let forecastData = data.forecast.daily;
          let locationData = data.location;
        
          // current
          const todayDescription = currentData.weather_description;
          const currentPrecipitation = calculatePrecipitation(currentData);
          const currentHumidity = currentData.humidity;

          today.textContent = emoji(todayDescription);
          
          apparentTemp.children[1].textContent = `${currentData.apparent_temperature}°`;
          currentStats.children[0].textContent = `${currentData.temperature_min}°/${currentData.temperature_max}°`;
          currentStats.children[1].textContent = `Precipitation: ${currentPrecipitation}`;
          currentStats.children[2].textContent = `Humidity: ${currentHumidity}%`;
          currentStats.children[3].textContent = `Wind: ${currentData.wind_speed}m/s`;
          location.children[0].textContent = locationData.city;
          location.children[1].textContent = locationData.country;
          
          // forecast
          forecast.forEach((day, index) => {
            if (forecastData[index]) {
              const forecastPrecipitation = calculatePrecipitation(forecastData[index]);
              const forecastDescription = forecastData[index].weather_description;
              const forecastEmoji = emoji(forecastDescription);

              // day of the week
              const date = new Date(forecastData[index].date);
              const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000); // time zone adjust
              const options = { weekday: 'long' };
              const dayOfWeek = utcDate.toLocaleDateString('en-US', options);
            
              day.children[0].textContent = `${dayOfWeek}`;
              day.children[1].textContent = `${forecastEmoji}`;
              day.children[2].textContent = `${forecastData[index].temperature_min}°/${forecastData[index].temperature_max}°`;
              day.children[3].textContent = `Precipitation: ${forecastPrecipitation}`;
            }
          });
        })
        .catch((error) => {
          console.error(`Error fetching selected city: ${currentCity}`, error);
        })
        .finally(() => {
          dropdown.disabled = false;
          weatherWidget.style.display = 'block';
          info.textContent = '';
        })
      };

      if (typeof axios !== 'undefined') {
        weatherWidget.style.display = 'none';
        await fetch();
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
