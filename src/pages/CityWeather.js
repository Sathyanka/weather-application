import React from "react";
import { useParams } from 'react-router-dom';
import WeatherDetailsCard from "../components/WeatherDetailsCard";
import './CityWeather.css';


export default function CityWeather(){
    const { city } = useParams();

    return(
        <div>
           <WeatherDetailsCard city={city}/> 
        </div>
    )
}