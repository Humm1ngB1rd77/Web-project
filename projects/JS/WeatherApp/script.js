const apiKey = "f9cb378a226bdff141b412a94d0bc37a";  // Replace with your OpenWeatherMap API key

async function getWeather() {
    const city = document.getElementById("cityInput").value;
    const weatherResult = document.getElementById("weatherResult");

    if (city === "") {
        weatherResult.innerHTML = "<p>Please enter a city name.</p>";
        return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        const weatherDescription = data.weather[0].description;
        const temperature = data.main.temp;
        const icon = data.weather[0].icon;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;

        weatherResult.innerHTML = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="${weatherDescription}">
            <p><strong>Temperature:</strong> ${temperature}°C</p>
            <p><strong>Weather:</strong> ${weatherDescription}</p>
            <p><strong>Humidity:</strong> ${humidity}%</p>
            <p><strong>Wind Speed:</strong> ${windSpeed} m/s</p>
        `;
    } catch (error) {
        weatherResult.innerHTML = "<p>City not found. Please try again.</p>";
    }
}
