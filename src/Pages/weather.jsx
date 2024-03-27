import logo from './logo.svg';
import '../CSS/App.css';
import axios from 'axios';

function Weather() {
    const getAPI = () => {
        axios.get("https://www.weatherapi.com/docs/#/key=eb1f641f11304bdfbcd184447242603/current.json").then((resp)=>{
            return resp
        })
    }
  return (
    <div>
    {getAPI}
    </div>
  );
}

export default Weather;
