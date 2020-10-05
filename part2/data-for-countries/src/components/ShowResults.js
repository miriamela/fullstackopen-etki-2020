import React from "react";
import SingleCountry from "./SingleCountry";
import MultipleResults from "./MultipleResults";

function ShowResults({ input, weather, filteredElements, moreInfoClick }) {
  console.log(weather);
  console.log(Array.isArray(weather));
  if (input === "") {
    return null;
  } else {
    if (filteredElements.length > 10) {
      return <p className="text">Too many matches, specify another filter.</p>;
    } else if (filteredElements.length === 1) {
      return (
        <SingleCountry
          filteredElements={filteredElements}
          weather={weather}
        ></SingleCountry>
      );
    } else {
      return (
        <MultipleResults
          filteredElements={filteredElements}
          moreInfoClick={moreInfoClick}
        ></MultipleResults>
      );
    }
  }
}
export default ShowResults;
