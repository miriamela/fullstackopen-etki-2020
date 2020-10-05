import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.scss";
import From from "./Form";
import ShowResults from "./ShowResults";

function App() {
  const [input, setInput] = useState("");
  const [countries, setCountries] = useState([]);
  const [weather, setWeather] = useState([]);

  const api_key = process.env.REACT_APP_API_KEY;

  const handleInput = (event) => {
    const input = event.target.value;
    setInput(input);
  };
  console.log(input);

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
    });
  }, []);
  console.log(countries);

  const filteredElements = countries.filter((country) =>
    country.name.toLowerCase().includes(input.toLowerCase())
  );
  console.log(filteredElements);
  console.log(Array.isArray(filteredElements));

  const capital =
    Array.isArray(filteredElements) && filteredElements.length > 0
      ? filteredElements[0].capital
      : null;
  console.log(capital);

  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`
      )
      .then((response) => {
        setWeather(response.data);
      });
  }, [capital, api_key]);
  console.log(weather);

  const moreInfoClick = (event) => {
    const moreInfo = event.currentTarget.id;
    console.log("click", moreInfo);
    setInput(moreInfo);
  };

  return (
    <div className="App">
      <From handleChange={handleInput}></From>
      <ShowResults
        weather={weather}
        input={input}
        filteredElements={filteredElements}
        moreInfoClick={moreInfoClick}
      ></ShowResults>
    </div>
  );
}

export default App;
