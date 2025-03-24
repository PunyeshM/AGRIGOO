const ui = {
    elements: {
        cityInput: document.getElementById('cityInput'),
        searchBtn: document.getElementById('searchBtn'),
        weatherInfo: document.getElementById('weatherInfo'),
        errorMessage: document.getElementById('errorMessage'),
        cityName: document.getElementById('cityName'),
        date: document.getElementById('date'),
        temperature: document.getElementById('temperature'),
        weatherType: document.getElementById('weatherType'),
        humidity: document.getElementById('humidity'),
        windSpeed: document.getElementById('windSpeed'),
        forecastContainer: document.getElementById('forecastContainer')
    },

    showWeatherInfo() {
        this.elements.weatherInfo.classList.remove('hidden');
        this.elements.errorMessage.classList.add('hidden');
    },

    showError() {
        this.elements.weatherInfo.classList.add('hidden');
        this.elements.errorMessage.classList.remove('hidden');
    },

    updateCurrentWeather(data) {
        this.elements.cityName.textContent = data.name;
        this.elements.date.textContent = utils.formatDate(new Date());
        this.elements.temperature.textContent = `${utils.kelvinToCelsius(data.main.temp)}°C`;
        this.elements.weatherType.textContent = data.weather[0].main;
        this.elements.humidity.textContent = `${data.main.humidity}%`;
        this.elements.windSpeed.textContent = `${data.wind.speed} m/s`;
    },

    updateForecast(data) {
        const forecastHtml = data.list
            .filter(item => item.dt_txt.includes('12:00:00'))
            .map(item => `
                <div class="forecast-item">
                    <h3>${utils.formatDate(item.dt_txt)}</h3>
                    <p>${utils.kelvinToCelsius(item.main.temp)}°C</p>
                    <p>${item.weather[0].main}</p>
                </div>
            `).join('');
        
        this.elements.forecastContainer.innerHTML = forecastHtml;
    }
};