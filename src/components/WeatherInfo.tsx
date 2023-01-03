import React from "react";

const WeatherInfo = ({ weather }: { weather: any }) => {
  return (
    <div className="weather-box">
      {weather?.main != undefined && (
        <>
          <div className="temperature">{Math.round(weather?.main?.temp)}°C</div>
          <div className="weather">{weather?.weather[0]?.main}</div>
        </>
      )}
    </div>
  );
};

export default WeatherInfo;
