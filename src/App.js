import React, { useState } from "react";
import { FaSearchLocation } from "react-icons/fa";

import { fetchWeather } from "./Api/fetchWeather";
import "./App.css";

const App = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = async (e) => {
    if (e.key === "Enter") {
      const data = await fetchWeather(query);
      setWeather(data);
      setQuery("");
    }
  };

  return (
    <div className="main-container">
      {!weather.main && (
        <div className="search">
          <FaSearchLocation className="searchIcon" />
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={search}
          />
        </div>
      )}        

      {weather.main && (
        <>
          <div className="city">
            <h2 className="city-name">
              <span>{weather.name}</span>
              <sup>{weather.sys.country}</sup>
            </h2>
            <div className="city-temp">
              {Math.round(weather.main.temp)-273}
              <sup>&deg;C</sup>
            </div>
            <div className="info">
              <img
                className="city-icon"
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
              />
              <p>{weather.weather[0].description}</p>
            </div>
          </div>

          <div className="button" onClick={() => setWeather("")}>Back</div>
        </>
      )}
    </div>
  );
};

export default App;
