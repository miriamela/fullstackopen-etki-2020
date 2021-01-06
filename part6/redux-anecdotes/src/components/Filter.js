import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFilter } from "../reducers/filterReducer";

const Filter = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.filter);
  console.log(state);
  const handleChange = (event) => {
    const input = event.target.value;
    dispatch(setFilter(input));
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

export default Filter;
