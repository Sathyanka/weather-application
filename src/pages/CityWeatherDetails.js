import React from 'react';
import { useParams } from 'react-router-dom';

export default function CityWeatherDetails({ weatherData }) {
  const { city } = useParams();

  // Find the weather data for the selected city
  const selectedWeather = weatherData.find((item) => item.city === city);

  if (!selectedWeather) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app">
      <div className="card">
        <div className="container">
          <div className="content">
            {selectedWeather.weather && (
              <>
                <div className="location">{selectedWeather.weather.name}</div>
                <div className="dateAndTime">
                  {new Date(selectedWeather.weather.dt * 1000).toLocaleString()}
                </div>
                <div className="description">
                  {selectedWeather.weather.weather[0].description}
                </div>
                <div className="temp">
                  {selectedWeather.weather.main.temp}
                  <span id="C">&#8451;</span>
                </div>
                <div className="tempMin">
                  <span id="C">Temp Min: {selectedWeather.weather.main.temp_min}&#8451;</span>
                </div>
                <div className="tempMax">
                  <span id="C">Temp Max: {selectedWeather.weather.main.temp_max}&#8451;</span>
                </div>
              </>
            )}
          </div>
          {selectedWeather.weather && (
            <div className="bottom">
              <div className="bottom-list">
                <ul>
                  <li>Pressure: {selectedWeather.weather.main.pressure}hPa</li>
                  <li>Humidity: {selectedWeather.weather.main.humidity}%</li>
                  <li>Visibility: {selectedWeather.weather.visibility / 1000}km</li>
                </ul>
              </div>
              <div className="vertical">
                <ul>
                  <li>
                    {selectedWeather.weather.wind.speed}m/s {selectedWeather.weather.wind.deg}Degree
                  </li>
                </ul>
              </div>
              <div className="vertical">
                <ul>
                  <li>
                    Sunrise: {new Date(selectedWeather.weather.sys.sunrise * 1000).toLocaleTimeString()}
                  </li>
                  <li>
                    Sunset: {new Date(selectedWeather.weather.sys.sunset * 1000).toLocaleTimeString()}
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
