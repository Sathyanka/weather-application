import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';



export default function CityWeatherDetails({ weatherData }) {
  const { city } = useParams();

  // Find the weather data for the selected city
  const selectedWeather = weatherData.find((item) => item.city === city);

  if (!selectedWeather) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {  <div className="app">
    
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
  </div>}
    </div>
  );
}

  
  