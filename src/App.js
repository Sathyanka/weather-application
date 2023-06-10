import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import cities from './cities.json';

function App() {
  
const [weatherData, setWeatherData] = useState([]);
const cities = require('./cities.json');

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
        //construct the API URL by combining the city's CityCode, units, and apiKey in the URL template.
        // This URL is used to fetch the weather data from the OpenWeatherMap API.
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
    
    <div className= "logo">
    
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
        
          
        <div className="card" key={item.cityCode}>
          
          <div className="container">
            <div className="content">

              {item.weather && (
                <>
                <div className="location">
                {item.weather.name}
              </div>
                  <div className="dateAndTime">
                    {new Date(item.weather.dt * 1000).toLocaleString()}
                  </div>
                  <div className="description">
                    {item.weather.weather[0].description}
                  </div>
                  <div className="temp">
                    {item.weather.main.temp}
                    <span id="C">&#8451;</span>
                  </div>
                  <div className="tempMin">
                    <span id="C">Temp Min: {item.weather.main.temp_min}
                    &#8451;
                    </span>
                    </div>
                    <div className="tempMax">
                    <span id="C">Temp Max: {item.weather.main.temp_max}
                    &#8451;</span>
                  </div>
                </>
              )}
            </div>
            {item.weather && (
              <div className="bottom" >
               <div className="bottom-list"> 
               <ul >
                    <li>Pressure: {item.weather.main.pressure}hPa</li>
                    <li>Humidity: {item.weather.main.humidity}%</li>
                    <li>Visibility: {item.weather.visibility/1000}km</li>
                  </ul>
               </div>
               <div className="vertical"> 
               <ul >
                    <li>{item.weather.wind.speed}m/s {item.weather.wind.deg}Degree</li>
                    
                  </ul>
               </div>
     <div className="vertical">
                  <ul>
                    <li>Sunrise: {new Date(item.weather.sys.sunrise * 1000).toLocaleTimeString()}</li>
                    <li>Sunset: {new Date(item.weather.sys.sunset * 1000).toLocaleTimeString()}</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
           

      ))}
    </div>
    <div class="footer">
      <p>2021 Fidenz Technology</p>
    </div>         
    </Router>
  );
}

export default App;