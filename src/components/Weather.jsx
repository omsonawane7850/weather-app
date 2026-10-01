import React, { useEffect, useRef, useState } from "react";
import styles from "./Weather.module.css";

import search_icon from "../assets/search.png";

import clear_icon from "../assets/clear.png";
import moon_icon from "../assets/moon.png";
import moon_cloud_icon from "../assets/moon-cloud.png";

import drizzle_icon from "../assets/drizzle.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import cloud_icon from "../assets/cloud.png";
import moon_rain_icon from "../assets/moon-rain.png";

import wind_icon from "../assets/wind.png";
import humidity_icon from "../assets/humidity.png";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(false);

  const allIcons = {
    // Day
    "01d": clear_icon,
    "02d": cloud_icon,
    "03d": cloud_icon,
    "04d": cloud_icon,
    "09d": rain_icon,
    "10d": rain_icon,
    "11d": rain_icon,
    "13d": snow_icon,
    "50d": drizzle_icon,

    // Night
    "01n": moon_icon,
    "02n": moon_cloud_icon,
    "03n": moon_cloud_icon,
    "04n": moon_cloud_icon,
    "09n": moon_rain_icon,
    "10n": moon_rain_icon,
    "11n": moon_rain_icon,
    "13n": snow_icon,
    "50n": moon_rain_icon,
  };

  const inputRef = useRef();

  const search = async (city) => {
    if (city.trim() === "") {
      alert("Enter City Name");
      return;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        setWeatherData(false);
        return;
      }

      console.log(data);

      const icon = allIcons[data.weather[0].icon] || clear_icon;

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });

      inputRef.current.value = "";
    } catch (error) {
      setWeatherData(false);
      console.error("Error in fetching weather data:", error);
    }
  };

  useEffect(() => {
    search("nashik");
  }, []);

  return (
    <div className={styles.weather}>
      <div className={styles.searchBar}>
        <input type="text" placeholder="Search City" ref={inputRef} />

        <img
          src={search_icon}
          alt="Search"
          onClick={() => search(inputRef.current.value)}
        />
      </div>

      {weatherData && (
        <>
          <img
            src={weatherData.icon}
            alt="Weather"
            className={styles.weatherIcon}
          />

          <p className={styles.temperature}>{weatherData.temperature}°C</p>

          <p className={styles.location}>{weatherData.location}</p>

          <div className={styles.weatherData}>
            <div className={styles.col}>
              <div className={styles.humidity}>
                <img src={humidity_icon} alt="Humidity" />
                <div>
                  <p>{weatherData.humidity}%</p>
                  <span>Humidity</span>
                </div>
              </div>

              <div className={styles.wind}>
                <img src={wind_icon} alt="Wind Speed" />
                <div>
                  <p>{weatherData.windSpeed} km/h</p>
                  <span>Wind Speed</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;
