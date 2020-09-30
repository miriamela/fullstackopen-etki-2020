import React from "react";

function Total({ parts }) {
  console.log(parts);
  const sum = parts.reduce((acc, part) => (acc += part.exercises), 0);
  console.log(sum);
  return <h3>Total of {sum} exercises </h3>;
}
export default Total;
