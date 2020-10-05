import React from "react";

function Form({ handleChange }) {
  return (
    <form className="form">
      <label>FIND COUNTRIES:</label>
      <input type="text" onChange={handleChange} />
    </form>
  );
}
export default Form;
