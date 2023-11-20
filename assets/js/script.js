// Request an API key and create a variable to store it
var apiKey = "776f1e0638cfcbcdf067e7f5b06f2e07";

// Function to get weather data from the OpenWeatherMap API
function getWeather(city) {
    // Constuct the query URL
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

    // Display current weather information
    const currentWeatherHTML = `
    <h2>${city} (${currentDate}) <img src="http://openweathermap.org/img/w/${iconCode}.png" alt="Weather icon"></h2>
    <p>Temperature: ${temperature} °C</p>
    <p>Wind Speed: ${}'

}