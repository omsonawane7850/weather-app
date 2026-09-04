import React from "react";
import styles from "./Weather.module.css";
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import drizzle_icon from "../assets/drizzle.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";
import humidity_icon from "../assets/humidity.png";
import cloud_icon from "../assets/cloud.png";

const Weather = () => {
  return (
    <div className={styles.weather}>
      <div className={styles.searchBar}>
        {" "}
        <input type="text" placeholder="Search city" />
        <img src={search_icon} alt="" />
      </div>
      <img src={clear_icon} alt="" className={styles.weatherIcon} />
      <p className={styles.temperature}>16°C</p>
      <p className={styles.location}>London</p>
      <div className={styles.weatherData}>
        <div className={styles.col}>
          <img src={humidity_icon} alt="" />
          <div>
            <p>91 %</p>
            <span>Humidity</span>
          </div>

          <img src={wind_icon} alt="" />
          <div>
            <p>3.6 km/h</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
