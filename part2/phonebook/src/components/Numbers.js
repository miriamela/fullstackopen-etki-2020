import React from "react";

function Numbers(props) {
  return (
    <ul>
      {props.persons.map((person, i) => (
        <li key={i}>
          {person.name} {person.number}
        </li>
      ))}
    </ul>
  );
}
export default Numbers;
