import Dashboard from "./pages/Dashboard";
import CityWeather from "./pages/CityWeather";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="./pages/CityWeather/:cityCode" element={<CityWeather />} />
      </Routes>
    </Router>
  );
}

export default App;
