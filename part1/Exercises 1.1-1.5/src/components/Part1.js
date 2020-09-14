import React from "react";

function Part1(props) {
  // console.log(props.part1);
  // console.log(Array.isArray(props.part1));
  return (
    <p>
      {`${props.part1.name} 
      ${props.part1.exercises}`}
    </p>
  );
}
export default Part1;
