import { cities, units, apiKey } from "./constants";

/*The constructWeatherAPIUrl function takes the cityCode 
parameter and constructs the API URL using the provided cityCode, units, and apiKey.*/

export const constructWeatherAPIUrl = (cityCode) => {
  return `https://api.openweathermap.org/data/2.5/weather?id=${cityCode}&units=${units}&appid=${apiKey}`;
};
