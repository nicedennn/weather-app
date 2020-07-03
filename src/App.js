import React, { useState } from 'react';
import Fade from 'react-reveal/Fade';
import './App.css';

//API IMPORT
const api = {
  key: "b28356ebbf81752555930f64d113445c",
  base: "http://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  const dateBuilder = (d) => {
    let months = 
    ["January", 
    "February", 
    "March", 
    "April", 
    "May", 
    "June", 
    "July", 
    "August", 
    "September", 
    "October", 
    "November", 
    "December"];

    let days = 
    ["Sunday", 
    "Monday", 
    "Tuesday", 
    "Wednesday", 
    "Thursday", 
    "Friday", 
    "Saturday"];
    
    
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (

    <div>
      <main>
        <div className="search-box">
          <h2>Weather App</h2>
          <input 
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
          <div className="error">{weather.message}</div>
        </div>

        {(typeof weather.main != "undefined") ? (
        <Fade>
        <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">{Math.round(weather.main.temp)}°c</div>
        <div className="weather">&#160;-&#160;{weather.weather[0].main}</div>
          </div>
        </div>
        </Fade> 
        ) : ('')}
      </main>
      <footer>
        Made using OpenWeatherApp - <a href="https://openweathermap.org/">https://openweathermap.org/</a>
      </footer>
    </div>
  );
}

export default App;
