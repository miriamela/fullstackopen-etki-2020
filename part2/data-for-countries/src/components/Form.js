import React from "react";

function Form({ handleChange }) {
  return (
    <form>
      <label>
        find countries:
        <input type="text" onChange={handleChange} />
      </label>
    </form>
  );
}
export default Form;
