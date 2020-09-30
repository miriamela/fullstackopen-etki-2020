import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import From from "./Form";
import ShowResults from "./ShowResults";

function App() {
  const [input, setInput] = useState("");
  const [countries, setCountries] = useState([]);
  const [capital, setCapital] = useState([]);

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

  if (filteredElements.length === 1) {
    setCapital(filteredElements[0].capital);
  }
  console.log(capital);

  // useEffect(() => {
  //   axios
  //     .get(
  //       `http://api.weatherstack.com/current?access_key=0e8c0a203e29232e7fc7bef13cc16e31&query=New York`
  //     )
  //     .then((response) => {
  //       setWeather(response.data);
  //     });
  // }, []);

  const moreInfoClick = (event) => {
    const moreInfo = event.currentTarget.id;
    console.log("click", moreInfo);
    setInput(moreInfo);
  };

  return (
    <div className="App">
      <From handleChange={handleInput}></From>
      <ShowResults
        input={input}
        filteredElements={filteredElements}
        moreInfoClick={moreInfoClick}
      ></ShowResults>
    </div>
  );
}

export default App;
