export default function WeatherCard({date, maxTemp, minTemp, precipProb, maxWindSpeed}) {
    const dateObj = new Date(date);
    const formattedDate = dateObj.toLocaleDateString("en-US", {
        weekday: "long",  
        month: "short",   
        day: "numeric"
    });
    
    return (
        <article>
            <h3>{formattedDate}</h3>
            <div>
                <div>
                    <p><strong>High:</strong> {maxTemp}°C</p>
                    <p><strong>Low:</strong> {minTemp}°C</p>
                </div>
                <div>
                    <p><strong>Rain Chance:</strong> {precipProb}%</p>
                    <p><strong>Max Wind:</strong> {maxWindSpeed} km/h</p>
                </div>
            </div>
        </article>
    );
}