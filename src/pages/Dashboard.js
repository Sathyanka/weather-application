import React, { useState, useEffect } from "react";
import axios from "axios";
import WeatherDetailsCard from "../components/WeatherDetailsCard.js";
import Footer from "../components/Footer.js";
import "./dashboard.css";
import { cities, backgroundImageArray } from "../constants";
import { constructWeatherAPIUrl } from "../APIHelper";
// import dotenv from "dotenv";

export default function Dashboard() {
  // dotenv.config();
  const [weatherData, setWeatherData] = useState([]);
  const [cache, setCache] = useState({}); // State variable to store cached data

  useEffect(() => {
    const fetchData = async (city) => {
      const url = constructWeatherAPIUrl(city.CityCode);
      try {
        const response = await axios.get(url);
        const weather = response.data;
        return { city: city.CityName, weather };
      } catch (error) {
        console.error(`Error fetching weather for ${city.CityName}:`, error);
        return { city: city.CityName, weather: null };
      }
    };

    const fetchWeatherData = async () => {
      const weatherPromises = cities.map(async (city) => {
        if (
          cache[city.CityCode] &&
          cache[city.CityCode].expiresAt > Date.now()
        ) {
          // If data is available in cache and not expired, use cached data
          return { city: city.CityName, weather: cache[city.CityCode].data };
        } else {
          // Fetch data from API and update cache
          const weather = await fetchData(city);
          const expiresAt = Date.now() + 5 * 60 * 1000; // Set cache expiration to 5 minutes
          setCache((prevCache) => ({
            ...prevCache,
            [city.CityCode]: { data: weather.weather, expiresAt },
          }));
          return weather;
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
        <img src="../assets/logo.png" alt="addLogo" />
        <h3>Weather App</h3>
      </div>
      <div className="searchBarWrapper">
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
          <button type="button">Add City</button>
        </div>
      </div>
      {weatherData.map((data, index) => (
        <WeatherDetailsCard
          key={data.cityCode}
          weatherData={data}
          backgroundImage={backgroundImageArray[index]}
        />
      ))}

      <Footer />
    </div>
  );
}
