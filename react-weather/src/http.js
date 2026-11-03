export async function getWeatherUsingCoords(coords, days) {
    const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&daily=temperature_2m_max,temperature_2m_min&forecast_days=${days}&timezone=auto`);
    
    if (!res.ok) throw new Error("Failed to fetch weather data");
    
    const data = await res.json();
    return data;
}