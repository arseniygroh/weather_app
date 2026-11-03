import Header from "./components/Header";
import { getWeatherUsingCoords } from "./http";
import { useState, useEffect } from "react";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

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

  return (
    <>
      <Header />
      <main>
        {isLoading && <p>Loading your local weather...</p>}
        {error && <p>{error}</p>}
      </main>
    </>
  );
}

export default App;
