const weatherApi = {
    async getCurrentWeather(city) {
        const response = await fetch(
            `${CONFIG.BASE_URL}/weather?q=${city}&appid=${CONFIG.API_KEY}`
        );
        if (!response.ok) throw new Error('City not found');
        return response.json();
    },

    async getForecast(city) {
        const response = await fetch(
            `${CONFIG.BASE_URL}/forecast?q=${city}&appid=${CONFIG.API_KEY}`
        );
        if (!response.ok) throw new Error('Forecast not available');
        return response.json();
    }
};