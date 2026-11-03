export default function WeatherCard({date, maxTemp, minTemp, precipProb, maxWindSpeed}) {
    const dateObj = new Date(date);
    const formattedDate = dateObj.toLocaleDateString("en-US", {
        weekday: "long",  
        month: "short",   
        day: "numeric"
    });
    
    return (
        <article className="weather-card">
            <h3>{formattedDate}</h3>
            <div className="weather-stats">
                <div className="stat-column">
                    <p><strong>High:</strong> {maxTemp}°C</p>
                    <p><strong>Low:</strong> {minTemp}°C</p>
                </div>
                <div className="stat-column">
                    <p><strong>Rain Chance:</strong> {precipProb}%</p>
                    <p><strong>Max Wind:</strong> {maxWindSpeed} km/h</p>
                </div>
            </div>
        </article>
    );
}