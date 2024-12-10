import "../CSS/App.css";
import axios from "axios";
import Navbar from "./navbar";
import { useEffect, useState } from "react";
import dateFormat, { masks } from "dateformat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloud,
  faCloudBolt,
  faCloudRain,
  faCloudShowersHeavy,
  faCloudSun,
  faCloudSunRain,
  faSmog,
  faSnowflake,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import TodayCard from "./todayweather";

function Weather() {
  const weather_icons = [
    { key: "0", icon: faSun, title: "Clear sky" },
    { key: "1", icon: faCloudSun, title: "Mainly clear " },
    { key: "2", icon: faCloudSun, title: "Partly cloudy" },
    { key: "3", icon: faCloudSun, title: "Overcast" },
    { key: "45", icon: faSmog, title: "Fog" },
    { key: "48", icon: faSmog, title: "Depositing rime fog" },
    { key: "51", icon: faCloudSunRain, title: "Light drizzle" },
    { key: "53", icon: faCloudSunRain, title: "Mmoderate drizzle" },
    { key: "55", icon: faCloudSunRain, title: "Dense drizzle" },
    { key: "61", icon: faCloudRain, title: "Light Freezing Drizzle" },
    { key: "63", icon: faCloudRain, title: "Dense Freezing Drizzle" },
    { key: "65", icon: faCloudRain, title: "Slight Rain" },
    { key: "66", icon: faCloudRain, title: "Moderate Rain" },
    { key: "67", icon: faCloudRain, title: "Heavvy Rain" },
    { key: "71", icon: faSnowflake, title: "Light Freezing Rain" },
    { key: "73", icon: faSnowflake, title: "Heavy Freezing Rain" },
    { key: "75", icon: faSnowflake, title: "Slight Snow fall" },
    { key: "77", icon: faSnowflake, title: "Moderate Snow fall" },
    { key: "80", icon: faCloudShowersHeavy, title: "Slight Rain showers" },
    { key: "81", icon: faCloudShowersHeavy, title: "Moderate Rain showers" },
    { key: "82", icon: faCloudShowersHeavy, title: "Violent Rain showers" },
    { key: "85", icon: faSnowflake, title: "Slight Snow showers" },
    { key: "86", icon: faSnowflake, title: "Heavy Snow showers" },
    { key: "95", icon: faCloudBolt, title: "Slight Thunderstorm" },
    { key: "96", icon: faCloudBolt, title: "Thunderstorm with slight hail" },
    { key: "97", icon: faCloudBolt, title: "Thunderstorm with heavy hail" },
  ];

  const [dailyIcon, SetdailyIcons] = useState([
    { id: 0, icon: <FontAwesomeIcon id="img" icon={faCloud} /> },
    { id: 1, icon: <FontAwesomeIcon id="img" icon={faCloud} /> },
    { id: 2, icon: <FontAwesomeIcon id="img" icon={faCloud} /> },
    { id: 3, icon: <FontAwesomeIcon id="img" icon={faCloud} /> },
    { id: 4, icon: <FontAwesomeIcon id="img" icon={faCloud} /> },
    { id: 5, icon: <FontAwesomeIcon id="img" icon={faCloud} /> },
    { id: 6, icon: <FontAwesomeIcon id="img" icon={faCloud} /> },
  ]);
  const [todayCard, SetToday] = useState();
  const [weekCard, SetWeek] = useState([]);
  const url =
    "https://api.open-meteo.com/v1/forecast?latitude=33.8333&longitude=35.8333&current=temperature_2m,apparent_temperature,is_day,weather_code&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max&timezone=auto";
  const createTodayCard = (data) => {
    let title = "";
    let currentIcon = "";
    for (let i = 0; i < weather_icons.length; i++) {
      const temp = parseInt(weather_icons[i].key);
      if (temp === data.weather_code) {
        currentIcon = <FontAwesomeIcon id="img" icon={weather_icons[i].icon} />;
        title = weather_icons[i].title;
        break;
      }
    }
    const card = (
      <TodayCard
        weather={title}
        temp={data.apparent_temperature}
        time={dateFormat(data.time, "h:MM TT")}
        icons={currentIcon}
      />
    );
    SetToday(card);
  };
  const createWeekCards = (data) => {
    const arr = [];
    for (let i = 0; i < data.weather_code.length; i++) {
      for (let j = 0; j < weather_icons.length; j++) {
        const temp = parseInt(weather_icons[j].key);
        if (temp === data.weather_code[i]) {
          const weekIcon = (
            <FontAwesomeIcon id="img" icon={weather_icons[j].icon} />
          );
          const card = (
            <TodayCard
              weather={weather_icons[j].title}
              temp={data.temperature_2m_max[i]}
              time={dateFormat(data.time[i], "dddd, mmmm dS")}
              icons={weekIcon}
            />
          );
          arr.push(card);
          break;
        }
      }
    }
    SetWeek(arr);
  };
  const getAPI = () => {
    axios
      .get(url)
      .then((resp) => {
        createTodayCard(resp.data.current);
        createWeekCards(resp.data.daily);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAPI();
  }, []);
  return (
    <div id="weather">
      <Navbar />
      <div id="current" className="current float-container space-even">
        {todayCard}
      </div>
      <div id="days" className="days float-container space-even overflow">
        {weekCard.map((weekWeather) => {
          return <div>{weekWeather}</div>;
        })}
      </div>
    </div>
  );
}

export default Weather;
