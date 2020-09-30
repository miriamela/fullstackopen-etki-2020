import React from "react";

function ShowResults({ input, filteredElements, moreInfoClick }) {
  if (input === "") {
    return <p></p>;
  } else {
    if (filteredElements.length > 10) {
      return <p>be more specific, to many results</p>;
    } else if (filteredElements.length === 1) {
      return filteredElements.map((each, i) => (
        <div key={i}>
          <h2>{each.name}</h2>
          <p>capital {each.capital}</p>
          <p>population {each.population}</p>
          <h3>languages</h3>
          <ul>
            {each.languages.map((each, i) => (
              <li key={i}>{each.name}</li>
            ))}
          </ul>
          <div>
            <img src={each.flag} alt="flag" />
          </div>
        </div>
      ));
    } else {
      return filteredElements.map((each, i) => (
        <li key={i}>
          <p>{each.name}</p>
          <input
            id={each.name}
            type="button"
            value="More"
            onClick={moreInfoClick}
          ></input>
        </li>
      ));
    }
  }
}
export default ShowResults;
