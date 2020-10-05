import React from "react";

function Numbers({ contact, handleClick }) {
  return (
    <ul>
      {contact.map((person, id) => (
        <li key={id}>
          {person.name} {person.number} {""}
          <button name={person.name} type="button" onClick={handleClick}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
export default Numbers;
