import React, { useState, useEffect } from "react";
import { constructWeatherAPIUrl } from "../APIHelper";
import axios from "axios";
import WeatherDetailsCard from "../components/WeatherDetailsCard";
import "./CityWeather.css";
import { cities, backgroundImageArray } from "../constants";

export default function CityWeather({ match }) {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const url = constructWeatherAPIUrl(cityCode);
    const cityCode = match.params.cityCode;

    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        const weather = response.data;
        setWeatherData(weather);
      } catch (error) {
        console.error(
          `Error fetching weather for city with code ${cityCode}:`,
          error
        );
      }
    };
    fetchData();
  }, [match.params.cityCode]);

  if (!weatherData) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      {weatherData.map((data, index) => (
        <WeatherDetailsCard
          key={data.cityCode}
          weatherData={data}
          backgroundImage={backgroundImageArray[index]}
        />
      ))}
    </div>
  );
}
