import React, { useState } from "react";
import "./App.css";
import privateData from "./private.json"
import locationSign from "./assets/location-sign.png";
import SearchBox from "./components/SearchBox";
import SearchDetails from "./components/SearchDetails";
import WeatherInfo from "./components/WeatherInfo";

// TODO: implement to fix api leak
const getWeatherApiKey = async () => {
  let res: any = await fetch("./private.json");
};

const weatherApi = {
  key: privateData.openWeatherApi.key, // TODO: fix key leak
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [weather, setWeather] = useState<any>(null);

  const titleCase = (sentence: string) => {
    const words = sentence.toLowerCase().split(" ");
    for (var i = 0; i < words.length; i++) {
      if (words[i] === "") continue;
      words[i] = words[i][0].toUpperCase() + words[i].slice(1);
    }
    return words.join(" ");
  };

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
        <SearchBox setWeather={setWeather} />
        <SearchDetails weather={weather} />
        <WeatherInfo weather={weather} />
      </main>
    </div>
  );
}

export default App;
