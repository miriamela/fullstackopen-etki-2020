import React from "react";

function Form({ addName, newName, handleName, newNumber, handleNumber }) {
  return (
    <form onSubmit={addName}>
      <div>
        name:
        <input value={newName} onChange={handleName} />
      </div>
      <div>
        number:
        <input value={newNumber} onChange={handleNumber} />
      </div>
      <button type="submit">Add</button>
    </form>
  );
}
export default Form;
