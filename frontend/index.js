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
  weatherWidget.style.display = 'none';

    // 2
  const dropdown = document.querySelector('#citySelect');
    // 3
  let priorCity = null;
  
  dropdown.addEventListener('change', (event) => {
    let currentIndex = event.target.selectedIndex;
    let currentCity = event.target.options[currentIndex];
    
    if (priorCity) {
      priorCity.disabled = false;
    }

    currentCity.disabled = true;

    priorCity = currentCity;

    weatherWidget.style.display = 'block';
    console.log(`City changed to ${currentCity.value}`);
  });

  // 👆 WORK WORK ABOVE THIS LINE 👆

}

// ❗ DO NOT CHANGE THE CODE  BELOW
// ❗ DO NOT CHANGE THE CODE  BELOW
// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { moduleProject4 }
else moduleProject4()
