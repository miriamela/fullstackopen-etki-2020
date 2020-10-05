import React from "react";

function SingleCountry({ filteredElements, weather }) {
  return filteredElements.map((each, i) => (
    <div className="singleCountry" key={i}>
      <h2 className="country">{each.name}</h2>
      <p className="capital">Capital: {each.capital}</p>
      <p className="population">Population: {each.population}</p>
      <h3 className="languages">Spoken languages:</h3>
      <ul className="language-list">
        {each.languages.map((each, i) => (
          <li key={i}>{each.name}</li>
        ))}
      </ul>
      <div className="flag_img">
        <img src={each.flag} alt="flag" />
      </div>
      <h3 className="weather">Weather in {weather.location.name}</h3>
      <p className="temperature">
        Temperature: {weather.current.temperature} Celsius
      </p>
      <div className="weather_img">
        <img alt="weather_icon" src={weather.current.weather_icons} />
      </div>
      <p className="wind">
        Wind: {weather.current.wind_speed} mph direction{" "}
        {weather.current.wind_dir}
      </p>
    </div>
  ));
}
export default SingleCountry;
