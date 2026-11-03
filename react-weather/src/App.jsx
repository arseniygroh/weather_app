import Header from "./components/Header";
import { getWeatherUsingCoords, getWeatherUsingCityName } from "./http";
import { useState, useEffect } from "react";
import WeatherCard from "./components/WeatherCard";
import {useNavigate} from "react-router"
import { useAuth } from "./context/AuthContext";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const {isAuthenticated} = useAuth();

  if (!isAuthenticated) navigate("/auth");

  useEffect(() => {
    const fetchWeather = async (latitude, longitude) => {
      setError("");
      try {
        const data = await getWeatherUsingCoords({latitude, longitude}, 5);
        console.log(data);
        setWeatherData(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
          fetchWeather(position.coords.latitude, position.coords.longitude);
        }, err => {
          setError("Unable to fetch local weather");
          setIsLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser");
      setIsLoading(false);
    }
  }, []);

  async function handleCustomForecast(e) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const formData = new FormData(e.target);
    const {city, days} = Object.fromEntries(formData);
    
    try {
      const data = await getWeatherUsingCityName(city, days);
      setWeatherData(data);
    } catch(e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
      e.target.reset();
    }

  }

  return (
    <>
      <Header />
      <main>
        {isLoading && <p>Loading your local weather...</p>}
        {error && <p>{error}</p>}
        <form onSubmit={handleCustomForecast} action="" method="get">
          <div>
            <label htmlFor="city">City</label>
            <input type="text" id="city" name="city" required />
          </div>
          <div>
            <label htmlFor="days">Period in days</label>
            <input type="number" min={1} step={1} required id="days" name="days" />
          </div>
          <button type="submit">Get forecast</button>
        </form>
        {weatherData && weatherData.daily && (
          <section>
            <h2>Forecast</h2>
            {weatherData.current && (
              <div>
                <strong>Right Now:</strong> {weatherData.current.temperature_2m}°C, Humidity: {weatherData.current.relative_humidity_2m}%, Wind: {weatherData.current.wind_speed_10m} km/h
              </div>
            )}
            <div>
              {weatherData.daily.time.map((date, index) => (
                <WeatherCard 
                  key={date}
                  date={date}
                  maxTemp={weatherData.daily.temperature_2m_max[index]}
                  minTemp={weatherData.daily.temperature_2m_min[index]}
                  precipProb={weatherData.daily.precipitation_probability_max[index]}
                  maxWindSpeed={weatherData.daily.wind_speed_10m_max[index]}
                />
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
}

export default App;
