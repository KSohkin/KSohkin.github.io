const apiUrl1 = 'https://api.open-meteo.com/v1/forecast?latitude=46.9481&longitude=7.4474&hourly=temperature_2m,precipitation_probability,weather_code';

fetch(apiUrl1)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
  })
  .catch(error => {
    console.error('Error:', error);
  });

const apiUrl2 = 'https://api.open-meteo.com/v1/forecast?latitude=59.3035&longitude=24.6638&hourly=temperature_2m&timezone=auto';

fetch(apiUrl2)
  .then(response => response.json())
  .then(data => {
  })
  .catch(error => {
    console.error('Error:', error);
  });

async function fetchData() {
  try {
    const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=59.3035&longitude=24.6638&hourly=temperature_2m&timezone=auto');
    const data = await response.json();
    displayHourlyTemperature(data);
  } catch (error) {
    console.error('Error:', error);
  }
}

fetchData();

function displayWeatherData(data, location) {
  const weatherContainer = document.getElementById('weatherContainer');
  const locationHeader = document.createElement('h2');
  locationHeader.textContent = location;
  weatherContainer.appendChild(locationHeader);

  // Group data by date
  const groupedData = groupDataByDate(data.hourly.time, data.hourly.temperature_2m);

  for (const date in groupedData) {
    const dateHeader = document.createElement('h3');
    dateHeader.textContent = date;
    weatherContainer.appendChild(dateHeader);

    const list = document.createElement('ul');
    groupedData[date].forEach(entry => {
      const listItem = document.createElement('li');
      listItem.textContent = `Time: ${entry.time}, Temperature: ${entry.temperature}`;
      list.appendChild(listItem);
    });
    weatherContainer.appendChild(list);
  }
}

function displayHourlyTemperature(data) {
  const weatherContainer = document.getElementById('weatherContainer');
  const hourlyHeader = document.createElement('h2');
  hourlyHeader.textContent = 'Hourly Temperature for Third Location';
  weatherContainer.appendChild(hourlyHeader);

  // Group data by date
  const groupedData = groupDataByDate(data.hourly.time, data.hourly.temperature_2m);

  for (const date in groupedData) {
    const dateHeader = document.createElement('h3');
    dateHeader.textContent = date;
    weatherContainer.appendChild(dateHeader);

    const list = document.createElement('ul');
    groupedData[date].forEach(entry => {
      const listItem = document.createElement('li');
      listItem.textContent = `Time: ${entry.time}, Temperature: ${entry.temperature}`;
      list.appendChild(listItem);
    });
    weatherContainer.appendChild(list);
  }
}

function groupDataByDate(times, temperatures) {
  const groupedData = {};

  times.forEach((time, index) => {
    const date = time.split('T')[0];
    const timeOfDay = time.split('T')[1];

    if (!groupedData[date]) {
      groupedData[date] = [];
    }

    groupedData[date].push({ time: timeOfDay, temperature: temperatures[index] });
  });

  return groupedData;
}
