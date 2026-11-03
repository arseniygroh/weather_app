export async function getWeatherUsingCoords(coords, days) {
    const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max&forecast_days=${days}&timezone=auto`);
    
    if (!res.ok) throw new Error("Failed to fetch weather data");
    
    const data = await res.json();
    return data;
}

export async function getWeatherUsingCityName(city, days) {
    const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`);
    
    if (!res.ok) throw new Error("Failed to fetch location data");
    const data = await res.json();

    if (!data.results || data.results.length === 0) {
        throw new Error(`City "${city}" not found.`);
    }
    
    const {latitude, longitude} = data.results[0];
    return getWeatherUsingCoords({latitude, longitude}, days);
}