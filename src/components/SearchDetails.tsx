import React from "react";

const SearchDetails = ({ weather }: { weather: any }) => {
  return (
    <div>
      <div className="location-box">
        <div className="location">
          {weather?.name == undefined
            ? "Search for a city"
            : `${weather.name}, ${weather.sys.country}`}
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
  );
};

export default SearchDetails;
