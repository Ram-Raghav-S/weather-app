import React, { useState } from "react";
import "./App.css";

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
  const [weather, setWeather] = useState<any>();

  const search = (event: { key: string }) => {
    if (event.key === "Enter") {
      fetch(
        `${weatherApi.base}weather?q=${query}&units=metric&APPID=${weatherApi.key}`
      )
        .then((result) => result.json())
        .then((result) => {
          console.log(result);
          setWeather(result);
        });
    }
  };


  const titleCase = (sentence: string) => {
    const words = sentence.toLowerCase().split(" ");
    for(var i = 0; i < sentence.length; i++) {
      words[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
    }
    return words.join(" ")
  }

  return (
    <div className="app">
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search for your location"
            onChange={(event) => setQuery(event.target.value)}
            value={query}
            onKeyDown={search}
          />
        </div>
        <div>
          <div className="location-box">
            <div className="location">{titleCase(query)}</div>
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
          <div className="temperature">{Math.round(weather?.main.temp)}°C</div>
          <div className="weather">{weather?.weather[0].main}</div>
        </div>
      </main>
    </div>
  );
}

export default App;
