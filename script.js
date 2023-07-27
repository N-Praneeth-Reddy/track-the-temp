const weatherForm = document.getElementById('weatherForm');
const locationInput = document.getElementById('locationInput');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const iconElement = document.getElementById('weatherIcon');

const weatherConditions = {
  '01d': { icon: '☀️', description: 'Clear sky' },
  '01n': { icon: '🌙', description: 'Clear sky' },
  '02d': { icon: '⛅', description: 'Few clouds' },
  '02n': { icon: '⛅', description: 'Few clouds' },
  '03d': { icon: '☁️', description: 'Scattered clouds' },
  '03n': { icon: '☁️', description: 'Scattered clouds' },
  '04d': { icon: '☁️', description: 'Broken clouds' },
  '04n': { icon: '☁️', description: 'Broken clouds' },
  '09d': { icon: '🌧️', description: 'Rain' },
  '09n': { icon: '🌧️', description: 'Rain' },
  '10d': { icon: '🌦️', description: 'Showers' },
  '10n': { icon: '🌦️', description: 'Showers' },
  '11d': { icon: '⛈️', description: 'Thunderstorm' },
  '11n': { icon: '⛈️', description: 'Thunderstorm' },
  '13d': { icon: '🌨️', description: 'Snow' },
  '13n': { icon: '🌨️', description: 'Snow' },
  '50d': { icon: '🌫️', description: 'Mist' },
  '50n': { icon: '🌫️', description: 'Mist' },
};

weatherForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const location = locationInput.value;
  const weatherData = await getWeatherData(location);

  if (weatherData.error) {
    locationElement.textContent = '';
    temperatureElement.textContent = '';
    descriptionElement.textContent = weatherData.error;
    iconElement.textContent = '';
  } else {
    locationElement.textContent = `Location: ${weatherData.location}`;
    temperatureElement.textContent = `Temperature: ${weatherData.temperature}°C`;
    descriptionElement.textContent = `Description: ${weatherConditions[weatherData.icon].description}`;
    iconElement.textContent = weatherConditions[weatherData.icon].icon;
  }
});

async function getWeatherData(location) {
  try {
    const apiKey = '25f05078550efa0aa6cb73dd0855f813'; // Replace with your OpenWeatherMap API key
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`
    );
    const data = await response.json();

    if (response.ok) {
      return {
        location: data.name,
        temperature: data.main.temp,
        icon: data.weather[0].icon,
        error: null,
      };
    } else {
      return {
        location: null,
        temperature: null,
        icon: null,
        error: data.message,
      };
    }
  } catch (error) {
    return {
      location: null,
      temperature: null,
      icon: null,
      error: 'Failed to fetch weather data. Please try again later.',
    };
  }
}
