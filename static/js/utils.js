const utils = {
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });
    },

    kelvinToCelsius(kelvin) {
        return Math.round(kelvin - 273.15);
    }
};