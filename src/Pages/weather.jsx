import axios from "axios";
import dateFormat from "dateformat";
import Navbar from "./navbar";
import { useCallback, useEffect, useState, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloud,
  faCloudBolt,
  faCloudMoon,
  faCloudRain,
  faCloudShowersHeavy,
  faCloudSun,
  faDroplet,
  faMoon,
  faSmog,
  faSnowflake,
  faSun,
  faThermometer,
  faWind,
} from "@fortawesome/free-solid-svg-icons";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";

function Weather() {
  const [icon, setIcon] = useState(faThermometer);
  const [temp, setTemp] = useState("");
  const [wind, setWind] = useState("");
  const [humidity, setHumidity] = useState("");
  const [precip, setPrecip] = useState("");
  const [week, setWeek] = useState([]);
  const [date, setDate] = useState("");
  const [day, setDay] = useState(0);
  const [hrs, setHrs] = useState([]);

  const [transition, setTransition] = useState(false);
  const [time] = useState(new Date());
  const [animate, setAnimate] = useState("");
  const [bg, setBg] = useState("bg-gray-600");
  const weather_icons = useMemo(
    () => [
      {
        key: "clear-day",
        icon: faSun,
        title: "sun",
        bg: "bg-gradient-to-bl from-amber-200 to-red-400",
      },
      {
        key: "clear-night",
        icon: faMoon,
        title: "float",
        bg: "bg-gradient-to-bl from-indigo-800 to-slate-300",
      },
      {
        key: "partly-cloudy-day",
        icon: faCloudSun,
        title: "float",
        bg: "bg-gradient-to-bl from-amber-200 to-neutral-400",
      },
      {
        key: "partly-cloudy-night",
        icon: faCloudMoon,
        title: "float",
        bg: "bg-gradient-to-bl from-blue-700 to-slate-500",
      },
      {
        key: "cloudy-day",
        icon: faCloud,
        title: "float",
        bg: "bg-gradient-to-bl from-yellow-400 to-neutral-500",
      },
      {
        key: "cloudy-night",
        icon: faCloud,
        title: "float",
        bg: "bg-gradient-to-bl from-blue-700 to-neutral-500",
      },
      {
        key: "fog ",
        icon: faSmog,
        title: "float",
        bg: "bg-gradient-to-bl from-slate-300 to-gray-400",
      },
      {
        key: "rain",
        icon: faCloudRain,
        title: "float",
        bg: "bg-gradient-to-bl from-indigo-600 to-violet-300",
      },
      {
        key: "snow",
        icon: faSnowflake,
        title: "sun",
        bg: "bg-gradient-to-bl from-slate-100 to-sky-100",
      },
      {
        key: "snow-showers-day",
        icon: faSnowflake,
        title: "sun",
        bg: "bg-gradient-to-bl from-slate-100 to-stone-500",
      },
      {
        key: "snow-showers-night",
        icon: faSnowflake,
        title: "sun",
        bg: "bg-gradient-to-bl from-slate-400 to-stone-500",
      },
      {
        key: "showers-night",
        icon: faCloudShowersHeavy,
        bg: "bg=sky-900",
      },
      {
        key: "showers-day",
        icon: faCloudShowersHeavy,
        title: "float",
        bg: "bg=sky-900",
      },
      {
        key: "thunder-rain",
        icon: faCloudBolt,
        title: "float",
        bg: "bg-gradient-to-bl from-gray-900 to-yellow-100",
      },
      {
        key: "thunder-showers-day",
        icon: faCloudBolt,
        title: "float",
        bg: "bg-gradient-to-bl from-gray-900 to-yellow-100",
      },
      {
        key: "thunder-showers-night",
        icon: faCloudBolt,
        title: "float",
        bg: "bg-gradient-to-bl from-gray-900 to-yellow-100",
      },
    ],
    []
  );

  const setDayDate = useCallback(
    (data, selectedDay) => {
      const chart = data[selectedDay].hours;
      const hourlyChartData = chart.map((hour) => ({
        time: hour.datetime.split(":").slice(0, 2).join(":"),
        temp: hour.temp,
      }));
      setHrs(hourlyChartData);
      setAnimate(
        weather_icons.find((item) => item.key === data[selectedDay].icon)
          ?.title || ""
      );
      setIcon(
        weather_icons.find((item) => item.key === data[selectedDay].icon).icon
      );
      setBg(
        weather_icons.find((item) => item.key === data[selectedDay].icon)?.bg ||
          "bg-gray-600"
      );
      setWind(data[selectedDay].windspeed);
      setHumidity(data[selectedDay].humidity);
      setPrecip(data[selectedDay].precip);
      setTemp(data[selectedDay].temp);
      setDate(dateFormat(data[selectedDay].datetime, "d mmmm dddd"));
    },
    [weather_icons]
  );
  const formattedTime = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const handleClick = () => {
    setTransition(false);
    requestAnimationFrame(() => {
      setTransition(true);
    });
  };
  useEffect(() => {
    setTransition(true);
    const url =
      "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/lebanon?unitGroup=metric&elements=datetime%2Ctemp%2Chumidity%2Cprecip%2Cwindspeed%2Cicon&key=2FNMHGKU7AR2D7X8HQDFE2KDM&contentType=json";

    axios
      .get(url)
      .then((resp) => {
        const weekData = resp.data.days.slice(0, 7);
        setWeek(weekData);
        setDayDate(weekData, day);
      })
      .catch(console.error);
  }, [day, setDayDate]);
  return (
    <div
      className={`text-white justify-center items-center w-screen min-h-screen ${bg}`}
    >
      <Navbar />
      <div
        className={`px-32 flex justify-between fade-in ${
          transition ? "animate" : ""
        } `}
      >
        <div className="py-10">
          <div className="mt-20 mb-5 text-l flex justify-evenly gap-5">
            {week.map((day, index) => {
              return (
                <div
                  className="flex flex-col items-center"
                  key={day.datetime}
                  onClick={() => {
                    setDay(index);
                    setDayDate(week, index);
                    handleClick();
                  }}
                >
                  <div className="flex flex-col gap-y-2 items-center w-20 bg-white/40 rounded-full p-5 cursor-pointer hover:bg-white/65 transition-all duration-300">
                    <div>
                      <FontAwesomeIcon
                        className="text-3xl"
                        icon={
                          weather_icons.find((item) => item.key === day.icon)
                            .icon
                        }
                      />
                    </div>
                    <div>{day.temp}°</div>
                  </div>
                  <div>{dateFormat(day.datetime, "ddd")}</div>
                </div>
              );
            })}
          </div>
          <div className=" text-3xl w-fit font-light">
            {formattedTime}
            <span className="text-xl text-white/70"> • {date}</span>
          </div>
          <div className="flex justify-between items-center mt-5">
            <div className="text-9xl font-light">
              <span className="font-bold">{temp}</span>
              <span className="font-thin text-7xl relative bottom-16">°</span>c
            </div>
            <div className="text-xl">
              <div>
                <FontAwesomeIcon icon={faDroplet} /> Humidity {humidity}
              </div>
              <div>
                <FontAwesomeIcon icon={faCloudRain} /> Prcepitation {precip}
              </div>
              <div>
                <FontAwesomeIcon icon={faWind} /> Wind {wind} km/h
              </div>
            </div>
          </div>
        </div>
        <div className="flex mt-10 ml-10 items-center">
          <FontAwesomeIcon className={`weather  ${animate}`} icon={icon} />
        </div>
      </div>

      <div className="sm:px-8 md:px-20 lg:px-24 pt-10">
        <div className="w-full h-[100px] sm:h-[150px] md:h-[240px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={hrs}>
              <defs>
                <linearGradient id="whiteGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ffffff" stopOpacity={0.7} />
                  <stop offset="95%" stopColor="#ffffff" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff33" />
              <XAxis hide={true} />
              <YAxis hide={true} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  borderColor: "#4b5563",
                  color: "white",
                }}
              />

              <Area type="monotone" dataKey="temp" stroke="#ffffff" fill="none">
                <LabelList
                  dataKey="temp"
                  position="top"
                  style={{ fill: "#ffffff", fontSize: 12, fontWeight: "bold" }}
                />
                <LabelList
                  dataKey="time"
                  position="bottom"
                  style={{ fill: "#ffffff", fontSize: 10 }}
                />
              </Area>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Weather;
