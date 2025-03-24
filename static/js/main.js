document.getElementById("searchBtn").addEventListener("click", async () => {
    const cityInput = document.getElementById("cityInput").value.trim();

    if (!cityInput) {
        alert("Please enter a city name.");
        return;
    }

    try {
        const response = await fetch("/get-weather", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ city: cityInput }),
        });

        const data = await response.json();

        if (response.ok) {
            // Update the UI with weather data
            document.getElementById("cityName").textContent = data.current_weather.name;
            document.getElementById("temperature").textContent = `${data.current_weather.main.temp} °C`;
            document.getElementById("weatherType").textContent = data.current_weather.weather[0].description;
            document.getElementById("humidity").textContent = `${data.current_weather.main.humidity}%`;
            document.getElementById("windSpeed").textContent = `${data.current_weather.wind.speed} m/s`;

            // Populate forecast data
            const forecastContainer = document.getElementById("forecastContainer");
            forecastContainer.innerHTML = ""; // Clear previous forecast
            data.forecast.list.slice(0, 5).forEach(item => {
                const forecastDiv = document.createElement("div");
                forecastDiv.className = "forecast-item";
                forecastDiv.innerHTML = `
                    <p><strong>Date:</strong> ${item.dt_txt}</p>
                    <p><strong>Temp:</strong> ${item.main.temp} °C</p>
                    <p><strong>Weather:</strong> ${item.weather[0].description}</p>
                `;
                forecastContainer.appendChild(forecastDiv);
            });

            // Show the weather info section
            document.getElementById("weatherInfo").classList.remove("hidden");
            document.getElementById("errorMessage").classList.add("hidden");
        } else {
            // Handle errors
            document.getElementById("weatherInfo").classList.add("hidden");
            document.getElementById("errorMessage").classList.remove("hidden");
        }
    } catch (error) {
        alert("An error occurred while fetching weather data.");
    }
});
