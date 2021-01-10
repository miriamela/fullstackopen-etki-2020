import React from "react";
import { connect } from "react-redux";
import { setFilter } from "../reducers/filterReducer";

const Filter = (props) => {
  const handleChange = (event) => {
    const input = event.target.value;
    props.setFilter(input);
  };

  const filterStyle = {
    marginBottom: 10,
  };
  return (
    <div style={filterStyle}>
      Filter <input onChange={handleChange} />
    </div>
  );
};
export default connect(null, { setFilter })(Filter);
