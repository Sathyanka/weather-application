import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link, Routes } from 'react-router-dom';
import WeatherDetail from './pages/CityWeatherDetails'
import cities from './cities.json';

function App() {
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const units = 'metric';
      const apiKey = '4dbf75b784feeee807f8bf633951ae8e';

      const cities = [
        { CityCode: "1248991", CityName: "Colombo" },
        { CityCode: "1850147", CityName: "Tokyo" },
        { CityCode: "2644210", CityName: "Liverpool" },
        { CityCode: "2988507", CityName: "Paris" },
        { CityCode: "2147714", CityName: "Sydney" },
      ]; // Extract city codes into an array

      const weatherPromises = cities.map(async (city) => {
        const url = `https://api.openweathermap.org/data/2.5/weather?id=${city.CityCode}&units=${units}&appid=${apiKey}`;
        try {
          const response = await axios.get(url);
          const weather = response.data;
          return { city: city.CityName, weather };
        } catch (error) {
          console.error(`Error fetching weather for ${city.CityName}:`, error);
          return { city: city.CityName, weather: null };
        }
      });

      const weatherData = await Promise.all(weatherPromises);
      setWeatherData(weatherData);
    };

    fetchWeatherData();
  }, []);

  return (
    <Router>
      <div className="logo">
        <img src='./assets/logo.png' alt='addLogo'/>
        <h3>Weather App</h3>
      </div>
      <div className="searchBarWrapper">
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
          <button type="button">Add City</button>
        </div>
      </div>
      <div className="app">
        {weatherData.map((item) => (
          <Link to={`/weather/${item.city}`} key={item.cityCode}>
            {    <div className="app">
      <div className="card">
        <div className="container">
          <div className="content">
            {weatherData.weather && (
              <>
                <div className="location">{weatherData.weather.name}</div>
                <div className="dateAndTime">
                  {new Date(weatherData.weather.dt * 1000).toLocaleString()}
                </div>
                <div className="description">
                  {weatherData.weather.weather[0].description}
                </div>
                <div className="temp">
                  {weatherData.weather.main.temp}
                  <span id="C">&#8451;</span>
                </div>
                <div className="tempMin">
                  <span id="C">Temp Min: {weatherData.weather.main.temp_min}&#8451;</span>
                </div>
                <div className="tempMax">
                  <span id="C">Temp Max: {weatherData.weather.main.temp_max}&#8451;</span>
                </div>
              </>
            )}
          </div>
          {weatherData.weather && (
            <div className="bottom">
              <div className="bottom-list">
                <ul>
                  <li>Pressure: {weatherData.weather.main.pressure}hPa</li>
                  <li>Humidity: {weatherData.weather.main.humidity}%</li>
                  <li>Visibility: {weatherData.weather.visibility / 1000}km</li>
                </ul>
              </div>
              <div className="vertical">
                <ul>
                  <li>
                    {weatherData.weather.wind.speed}m/s {weatherData.weather.wind.deg}Degree
                  </li>
                </ul>
              </div>
              <div className="vertical">
                <ul>
                  <li>
                    Sunrise: {new Date(weatherData.weather.sys.sunrise * 1000).toLocaleTimeString()}
                  </li>
                  <li>
                    Sunset: {new Date(weatherData.weather.sys.sunset * 1000).toLocaleTimeString()}
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>}
          </Link>
        ))}
      </div>
      <Routes>
        <Route path="/weather/:city/">
          <Route component={WeatherDetail} weatherData={weatherData} />
        </Route>
      </Routes>
      <div className="footer">
        <p>2021 Fidenz Technology</p>
      </div>
    </Router>
  );
}

export default App;
