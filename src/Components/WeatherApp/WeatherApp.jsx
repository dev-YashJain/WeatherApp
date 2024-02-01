import React, { useState, useEffect } from "react";
import "./WeatherApp.css";

import clear from "../Assets/clear.png";
import cloud from "../Assets/cloud.png";
import drizzle from "../Assets/drizzle.png";
import humidity from "../Assets/humidity.png";
import rain from "../Assets/rain.png";
import searchIcon from "../Assets/search.png";
import snow from "../Assets/snow.png";
import wind from "../Assets/wind.png";
import mist from "../Assets/mist.png";

const iconMap = {
  "01d": clear,
  "01n": clear,
  "02d": cloud,
  "02n": cloud,
  "03d": drizzle,
  "03n": drizzle,
  "04d": cloud,
  "04n": cloud,
  "09d": rain,
  "09n": rain,
  "10d": rain,
  "10n": rain,
  "11d": rain,
  "11n": rain,
  "13d": snow,
  "13n": snow,
  "50d": clear,
  "50n": clear,
};

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("London");
  const [errorMessage, setErrorMessage] = useState("");
  const api_key = "62c89235d05b9aa1ba5764f463182d53";

  const fetchData = async () => {
    if (!city) return;

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`;
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        setWeatherData(data);
        setErrorMessage("");
      } else {
        setWeatherData(null);
        setErrorMessage("City not found. Please enter a valid city name.");
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setErrorMessage("Error fetching weather data. Please try again later.");
    }
  };

  useEffect(() => {
    fetchData(); // Fetch default weather data when component mounts
  }, []); // Empty dependency array ensures this effect runs only once

  const handleSearch = () => {
    fetchData(); // Fetch weather data when search button is clicked
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      fetchData(); // Call handleSearch when Enter key is pressed
    }
  };
  return (
    <div className="bg-image p-20">
      <div className="container w-80 h-80 mt-8 m-auto rounded-xl p-19 ">
        <div className="top-bar flex justify-center gap-2 p-5">
          <input
            className="inputCity w-40 border-none outline-none flex bg-zinc-50 rounded-xl p-2 text-zinc-600"
            type="text"
            placeholder="Search"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <div className="search_icon bg-zinc-50" onClick={handleSearch}>
            <img
              src={searchIcon}
              alt=""
              className="h-6 w-6 justify-center pt-1 p-1 flex"
            />
          </div>
        </div>
        {errorMessage && (
          <div className="text-red-500 text-center my-2">{errorMessage}</div>
        )}
        {weatherData && (
          <div>
            <div className="weatherIcon flex flex-col items-center justify-center mt-3">
              {weatherData &&
                console.log("Weather Icon Code:", weatherData.weather[0].icon)}
              <img
                src={iconMap[weatherData.weather[0].icon]}
                alt=""
                className="h-16 w-16"
              />
            </div>

            <div className="weatherTemp flex flex-col items-center justify-center text-white text-xl">
              {parseInt(weatherData.main.temp)} °C
            </div>
            <div className="weatherLocation flex flex-col items-center justify-center text-white text-3xl">
              {weatherData.name}
            </div>
            <div className="element flex items-center justify-center text-white mt-5 ">
              <img src={humidity} className="h-4 w-4" alt="" />
              <div className="data flex gap-1 pl-1">
                <div className="text">Humidity:</div>
                <div className="humidityPercent">
                  {weatherData.main.humidity} %
                </div>
              </div>
            </div>
            <div className="element element flex items-center justify-center text-white">
              <img src={wind} className="h-4 w-4" alt="" />
              <div className="data flex gap-1">
                <div className="text text-white pl-1">Wind Speed:</div>
                <div className="windSpeed text-white">
                  {parseInt(weatherData.wind.speed)} km/h
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
