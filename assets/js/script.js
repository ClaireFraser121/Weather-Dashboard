// Request an API key and create a variable to store it
var apiKey = "776f1e0638cfcbcdf067e7f5b06f2e07"; // Replace with your actual API key

// Function to convert Kelvin to Celsius
function convertToCelsius(kelvin) {
    return kelvin - 273.15;
}

// Function to get weather data from the OpenWeatherMap API
function getWeather(city) {
    // Construct the query URL
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;

    // Make the API call using Fetch API
    fetch(queryURL)
        .then(function (response) {
            // Check if the request was successful
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Parse the JSON response
            return response.json();
        })
        .then(function (data) {
            // Handle the API response
            displayWeather(data);
        })
        .catch(function (error) {
            console.error('There was a problem with the fetch operation:', error);
        });
}

// Function to display the weather information on the page
function displayWeather(data) {
    // Extract relevant data from the API response
    const city = data.city.name;
    const currentDate = dayjs().format('MM/DD/YYYY');
    const iconCode = data.list[0].weather[0].icon;
    const temperature = data.list[0].main.temp;
    const humidity = data.list[0].main.humidity;
    const windSpeed = data.list[0].wind.speed;
    const temperatureCelsius = convertToCelsius(temperature);

    // Display current weather information
    const currentWeatherHTML = `
        <div class="card">
          <div class="card-body">
            <h2>${city} (${currentDate}) <img src="http://openweathermap.org/img/w/${iconCode}.png" alt="Weather icon"></h2>
            <p>Temperature: ${temperatureCelsius.toFixed(2)} °C</p>
            <p>Humidity: ${humidity}%</p>
            <p>Wind Speed: ${windSpeed} MPH</p>
          </div>
        </div>
      `;

    $('#today').html(currentWeatherHTML);

    // Display 5-day forecast
    // Adjust the HTML structure for the forecast cards to display date, temperature, and humidity on separate lines
const forecastHTML = data.list.filter(entry => entry.dt_txt.includes('12:00:00')).map((forecast) => {
    const date = dayjs(forecast.dt_txt).format('MM/DD/YYYY');
    const forecastIcon = forecast.weather[0].icon;
    const forecastTemperatureCelsius = convertToCelsius(forecast.main.temp);
    const forecastHumidity = forecast.main.humidity;

    return `
    <div class="col-md-2">
        <div class="card">
            <div class="card-body">
                <h5>${date}</h5>
                <img src="http://openweathermap.org/img/w/${forecastIcon}.png" alt="Weather icon">
                <p>Temp: ${forecastTemperatureCelsius.toFixed(2)} °C</p>
                <p>Humidity: ${forecastHumidity}%</p>
            </div>
        </div>
    </div>
    `;
});

$('#forecast').html(forecastHTML);
}

// Event listener for the search form
$('#search-form').on('submit', function g(event) {
    event.preventDefault();

    // Get the value from the search input
    const city = $('#search-input').val().trim();

    if (city) {
        // Call the getWeather function with the city
        getWeather(city);

        // Add the city to the search history
        addToHistory(city);

        // Clear the search input
        $('#search-input').val('');
    }
});

// Function to add a city to the search history
function addToHistory(city) {
  // Check if the city is already in the history
  if (!$(`[data-city="${city}"]`).length) {
      const historyItem = `<button class="list-group-item" data-city="${city}">${city}</button>`;
      $('#history').prepend(historyItem);

      // Add click event to history items
      $(`[data-city="${city}"]`).on('click', function () {
          // Get the city from the data attribute and call getWeather
          const selectedCity = $(this).data('city');
          getWeather(selectedCity);
      });
  }
}