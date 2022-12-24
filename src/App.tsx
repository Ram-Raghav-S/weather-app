import React from "react";
import "./App.css";

const api = {
  key: "839fe94c6921794a7c2aa11baaf2fb58",
  base: "https://api.openweathermap.ord/data/2.5/",
};

function App() {
  return (
    <div className="app">
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search for your location"
          />
        </div>
        
      </main>
    </div>
  );
}

export default App;
