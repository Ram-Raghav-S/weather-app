import React from "react";
import locationSign from "../assets/location-sign.png";

interface SearchBoxProps {
  setWeather: (newWeather: any) => void;
}

const weatherApi = {
  key: "839fe94c6921794a7c2aa11baaf2fb58", // TODO: fix key leak
  base: "https://api.openweathermap.org/data/2.5/",
};

const SearchBox = ({ setWeather }: SearchBoxProps) => {
  const [query, setQuery] = React.useState<string>("");

  const search = (evt: { key: string }) => {
    if (evt.key === "Enter") {
      fetch(
        `${weatherApi.base}weather?q=${query}&units=metric&APPID=${weatherApi.key}`
      )
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          console.log(result);
        });
    }
  };

  const searchUsingUserLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        console.log(position.coords.latitude, position.coords.longitude);
        fetch(
          `${weatherApi.base}weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${weatherApi.key}&units=metric`
        )
          .then((res) => res.json())
          .then((result) => {
            setWeather(result);
          });
      },
      () => null,
      { enableHighAccuracy: true }
    );
  };

  return (
    <>
      {" "}
      <div className="search-box">
        <input
          type="text"
          className="search-bar"
          placeholder="Search for a city"
          onChange={(event) => setQuery(event.target.value)}
          value={query}
          onKeyDown={search}
        />
        <div className="location-icon-container">
          <img
            className="location-icon"
            src={locationSign}
            onClick={searchUsingUserLocation}
          />
          <div className="location-icon-tooltip">Use current location</div>
        </div>
      </div>
    </>
  );
};

export default SearchBox;
