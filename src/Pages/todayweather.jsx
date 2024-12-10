
function TodayCard({weather, temp, time, icons}) {    
  return (
    <div id="current" class="current float-container space-even">
      <div class="center">
        <div class="header-img">
          <div class="circle">
            <div>
            {icons}
            </div>
          </div>
        </div>
        <div class="weather-card">
          <label id="label">{weather}</label>
          <ul id="info">
            <li>Temprature: {temp}C°</li>
            <li>Time: {time}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TodayCard;
