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
  const today = document.querySelector('#today');
  // console.log('Today:', today);
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
        
        // today
        const todayData = data.current;
        // forecast
        const forecastData = data.forecast;
        // location
        const locationData = data.location;
        console.log('Location data:', locationData);

        location.children[0].innerText = locationData.city;
        location.children[1].innerText = locationData.country;

        weatherWidget.style.display = 'block';
        console.log(`Current city: ${currentCity}`);
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
