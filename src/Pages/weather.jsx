import "../CSS/App.css";
import axios from "axios";
import Navbar from "./navbar";

function Weather() {
  const API_KEY = "";
  const url = "" + API_KEY;
  const getAPI = () => {
    axios
      .get(url)
      .then((resp) => {
        console.log(resp.json);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div id="weather">
      <Navbar />
    </div>
  );
}

export default Weather;
