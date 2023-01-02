import React, { useState } from "react";
import { sys } from "typescript";
import "./App.css";
import locationSign from "./assets/location-sign.png"

// TODO: implement to fix api leak
const getWeatherApiKey = async () => {
  let res: any = await fetch("./private.json");
};

const weatherApi = {
  key: "839fe94c6921794a7c2aa11baaf2fb58", // TODO: fix key leak
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState<string>("");
  const [weather, setWeather] = useState<any>(null);

  const search = (evt: { key: string }) => {
    if (evt.key === "Enter") {
      fetch(
        `${weatherApi.base}weather?q=${query}&units=metric&APPID=${weatherApi.key}`
      )
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
        });
    }
  };

  const titleCase = (sentence: string) => {
    const words = sentence.toLowerCase().split(" ");
    for (var i = 0; i < words.length; i++) {
      if (words[i] === "") continue;
      words[i] = words[i][0].toUpperCase() + words[i].slice(1);
    }
    return words.join(" ");
  };

  //navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => console.log(position))

  return (
    <div
      className={
        weather?.main == undefined || weather?.main?.temp < 16
          ? "app"
          : weather?.main?.temp <= 27
          ? "app warm"
          : "app hot"
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search for a city"
            onChange={(event) => setQuery(event.target.value)}
            value={query}
            onKeyDown={search}
          />
          <img className="location-icon" src={locationSign}/>
        </div>
        <div>
          <div className="location-box">
            <div className="location">
              {weather?.name == undefined ? "Search for a city" : weather.name}
            </div>
            <div className="date">
              {new Date().toLocaleDateString("en-GB", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </div>
          </div>
        </div>
        <div className="weather-box">
          {weather?.main != undefined && (
            <>
              <div className="temperature">
                {Math.round(weather?.main?.temp)}°C
              </div>
              <div className="weather">{weather?.weather[0]?.main}</div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
