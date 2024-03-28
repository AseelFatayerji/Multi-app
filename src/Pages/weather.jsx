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
  const [currentIcon, SetCurrentIcon] = useState(
    <FontAwesomeIcon id="img" icon={faCloud} />
  );
  const [dailyIcon, SetdailyIcons] = useState([
    { id: 0, icon: <FontAwesomeIcon id="img" icon={faCloud} /> },
    { id: 1, icon: <FontAwesomeIcon id="img" icon={faCloud} /> },
    { id: 2, icon: <FontAwesomeIcon id="img" icon={faCloud} /> },
    { id: 3, icon: <FontAwesomeIcon id="img" icon={faCloud} /> },
    { id: 4, icon: <FontAwesomeIcon id="img" icon={faCloud} /> },
    { id: 5, icon: <FontAwesomeIcon id="img" icon={faCloud} /> },
    { id: 6, icon: <FontAwesomeIcon id="img" icon={faCloud} /> },
  ]);
  const url =
    "https://api.open-meteo.com/v1/forecast?latitude=33.8333&longitude=35.8333&current=temperature_2m,apparent_temperature,is_day,weather_code&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max&timezone=auto";
  const createTodayCard = (data) => {
    const label = document.getElementById("label");
    const info = document.getElementById("info");
    for (let i = 0; i < weather_icons.length; i++) {
      const temp = parseInt(weather_icons[i].key);
      if (temp === data.weather_code) {
        SetCurrentIcon(
          <FontAwesomeIcon id="img" icon={weather_icons[i].icon} />
        );
        label.innerText = weather_icons[i].title;
        break;
      }
    }
    const item = document.createElement("li");
    item.innerText = "Temprature: " + data.apparent_temperature + "C°";
    const item2 = document.createElement("li");
    const date = dateFormat(data.time,"h:MM TT")
    item2.innerText = "Time: " + date;
    info.appendChild(item);
    info.appendChild(item2);
  };
  const createWeekCards = (data) => {
    console.log(data);
    const arr = [];
    for (let i = 0; i < data.weather_code.length; i++) {
      const label = document.getElementById("label" + i);
      for (let j = 0; j < weather_icons.length; j++) {
        const temp = parseInt(weather_icons[j].key);
        if (temp === data.weather_code[i]) {
          const item = {
            id: i,
            icon: <FontAwesomeIcon id="img" icon={weather_icons[j].icon} />,
          };
          arr.push(item);
          label.innerText = weather_icons[j].title;
          break;
        }
      }
    }
    for (let i = 0; i < data.temperature_2m_max.length; i++) {
      const info = document.getElementById("info" + i);
      const item = document.createElement("li");
      item.innerText = "Temprature: " + data.temperature_2m_max[i] + "C°";
      info.appendChild(item);
    }
    for (let i = 0; i < data.time.length; i++) {
      const info = document.getElementById("info" + i);
      const item = document.createElement("li");
      const date = dateFormat(data.time[i],"dddd, mmmm dS")
      item.innerText = date;
      info.appendChild(item);
    }
    SetdailyIcons(arr);
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
        <div className="center">
          <div className="header-img">
            <div className="circle">
              <div>{currentIcon}</div>
            </div>
          </div>
          <div className="weather-card">
            <label id="label"></label>
            <ul id="info"></ul>
          </div>
        </div>
      </div>
      <div id="days" className="float-container space-even overflow">
        <div>
          <div className="header-img">
            <div className="circle">
              <div>{dailyIcon[0].icon}</div>
            </div>
          </div>
          <div className="weather-card">
            <label id="label0"></label>
            <ul id="info0"></ul>
          </div>
        </div>
        <div>
          <div className="header-img">
            <div className="circle">
              <div>{dailyIcon[1].icon}</div>
            </div>
          </div>
          <div className="weather-card">
            <label id="label1"></label>
            <ul id="info1"></ul>
          </div>
        </div>
        <div>
          <div className="header-img">
            <div className="circle">
              <div>{dailyIcon[2].icon}</div>
            </div>
          </div>
          <div className="weather-card">
            <label id="label2"></label>
            <ul id="info2"></ul>
          </div>
        </div>
        <div>
          <div className="header-img">
            <div className="circle">
              <div>{dailyIcon[3].icon}</div>
            </div>
          </div>
          <div className="weather-card">
            <label id="label3"></label>
            <ul id="info3"></ul>
          </div>
        </div>
        <div>
          <div className="header-img">
            <div className="circle">
              <div>{dailyIcon[4].icon}</div>
            </div>
          </div>
          <div className="weather-card">
            <label id="label4"></label>
            <ul id="info4"></ul>
          </div>
        </div>
        <div>
          <div className="header-img">
            <div className="circle">
              <div>{dailyIcon[5].icon}</div>
            </div>
          </div>
          <div className="weather-card">
            <label id="label5"></label>
            <ul id="info5"></ul>
          </div>
        </div>
        <div>
          <div className="header-img">
            <div className="circle">
              <div>{dailyIcon[6].icon}</div>
            </div>
          </div>
          <div className="weather-card">
            <label id="label6"></label>
            <ul id="info6"></ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weather;
