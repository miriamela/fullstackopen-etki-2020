import React from "react";

function MultipleResults({ filteredElements, moreInfoClick }) {
  return (
    <ul className="eachResult">
      {filteredElements.map((each, i) => (
        <li key={i}>
          <p>{each.name}</p>
          <input
            id={each.name}
            type="button"
            value="More"
            onClick={moreInfoClick}
          ></input>
        </li>
      ))}
    </ul>
  );
}
export default MultipleResults;
