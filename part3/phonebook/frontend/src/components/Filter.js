import React from "react";

function Filter({ searchInput, handleChange }) {
  return (
    <label>
      filter:
      <input value={searchInput} onChange={handleChange} />
    </label>
  );
}
export default Filter;
