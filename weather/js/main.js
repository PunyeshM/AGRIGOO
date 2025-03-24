async function handleSearch() {
    const city = ui.elements.cityInput.value.trim();
    if (!city) return;

    try {
        const [currentWeather, forecast] = await Promise.all([
            weatherApi.getCurrentWeather(city),
            weatherApi.getForecast(city)
        ]);

        ui.showWeatherInfo();
        ui.updateCurrentWeather(currentWeather);
        ui.updateForecast(forecast);
    } catch (error) {
        ui.showError();
    }
}

// Event Listeners
ui.elements.searchBtn.addEventListener('click', handleSearch);
ui.elements.cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
});