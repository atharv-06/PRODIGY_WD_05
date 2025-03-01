const apiKey = "b5ce8f63107a86f29477d316377e888d";

function getWeather() {
    const city = document.getElementById("city").value.trim();
    if (!city) {
        showError("Please enter a city name.");
        return;
    }
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            if (data.cod !== 200) {
                showError("City not found! Please check the spelling.");
            } else {
                displayWeather(data);
            }
        })
        .catch(() => showError("Error fetching weather data!"));
}

function getLocationWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`)
                .then(response => response.json())
                .then(data => displayWeather(data))
                .catch(() => showError("Error fetching weather data!"));
        }, () => showError("Geolocation permission denied."));
    } else {
        showError("Geolocation is not supported by this browser.");
    }
}

function displayWeather(data) {
    if (data.cod !== 200) {
        showError("City not found! Please check the name.");
        return;
    }
    document.getElementById("weather-info").innerHTML = `
        <img class="weather-icon" src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather icon">
        <p><strong>${data.name}, ${data.sys.country}</strong></p>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Condition: ${data.weather[0].description}</p>
    `;
    document.getElementById("error-message").innerText = "";
}

function showError(message) {
    document.getElementById("weather-info").innerHTML = "";
    document.getElementById("error-message").innerText = message;
}

function clearWeather() {
    document.getElementById("city").value = "";
    document.getElementById("weather-info").innerHTML = "";
    document.getElementById("error-message").innerText = "";
}