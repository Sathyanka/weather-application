import React from "react";
import "./weatherDetailsCard.css";
import { useNavigate } from "react-router-dom";

export default function WeatherDetailsCard({ weatherData, backgroundImage }) {
  const navigate = useNavigate();
  if (!weatherData || !weatherData.weather || !weatherData.weather.main) {
    return <div>Loading...</div>;
  }

  const handleClick = () => {
    navigate(`/pages/CityWeather${weatherData.cityCode}`);
  };

  return (
    <div className="card" key={weatherData.cityCode} onClick={handleClick}>
      <div
        className="container"
        style={{
          backgroundImage,
        }}
      >
        <div className="content">
          <div className="location">{weatherData.weather.name}</div>

          <div className="dateAndTime">
            {new Date(weatherData.weather.dt * 1000).toLocaleString(undefined, {
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}
          </div>

          <div className="description">
            <img
              src={`http://openweathermap.org/img/w/${weatherData.weather.weather[0].icon}.png`}
              alt="Weather Icon"
            />
            {weatherData.weather.weather[0].description}
          </div>
          <div className="temp">
            {weatherData.weather.main.temp}
            <span id="C">&#8451;</span>
          </div>
          <div className="tempMin">
            <span id="C">
              Temp Min: {weatherData.weather.main.temp_min}&#8451;
            </span>
          </div>
          <div className="tempMax">
            <span id="C">
              Temp Max: {weatherData.weather.main.temp_max}&#8451;
            </span>
          </div>
        </div>

        <div className="bottom">
          <div className="vertical" style={{ borderLeft: "none" }}>
            <ul>
              <li>Pressure: {weatherData.weather.main.pressure}hPa</li>
              <li>Humidity: {weatherData.weather.main.humidity}%</li>
              <li>Visibility: {weatherData.weather.visibility / 1000}km</li>
            </ul>
          </div>
          <div className="vertical">
            <ul>
              <li>{weatherData.weather.wind.deg} Degree</li>
            </ul>
          </div>
          <div className="vertical">
            <ul>
              <li>
                Sunrise:{" "}
                {new Date(
                  weatherData.weather.sys.sunrise * 1000
                ).toLocaleTimeString()}
              </li>
              <li>
                Sunset:{" "}
                {new Date(
                  weatherData.weather.sys.sunset * 1000
                ).toLocaleTimeString()}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
