import React, { useState, useEffect } from "react";
import axios from "axios";
import WeatherDetailsCard from "../components/WeatherDetailsCard.js";
import Footer from '../components/Footer.js';
import './dashboard.css';

export default function Dashboard() {
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const units = "metric";
      const apiKey = "4dbf75b784feeee807f8bf633951ae8e";

      const cities = [
        { CityCode: "1248991", CityName: "Colombo" },
        { CityCode: "1850147", CityName: "Tokyo" },
        { CityCode: "2644210", CityName: "Liverpool" },
        { CityCode: "2988507", CityName: "Paris" },
        { CityCode: "2147714", CityName: "Sydney" },
      ];

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
    <div className="body">
              <div className="logo">
        <img src="./assets/logo.png" alt='addLogo'/>
        <h3>Weather App</h3>
      </div>
      <div className="searchBarWrapper">
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
          <button type="button">Add City</button>
        </div>
      </div>
      {weatherData.map((data) => (
        <WeatherDetailsCard key={data.cityCode} weatherData={data} />
      ))}
      <Footer/>
    </div>
  );
}
