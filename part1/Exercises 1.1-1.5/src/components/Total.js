import React from "react";

function Total(props) {
  console.log(props.course);
  // console.log(Array.isArray(props.course));
  // let total = 0;
  // for (let i = 0; i < props.parts.length; i++) {
  //   total += props.parts[i].exercises;
  // }
  return (
    <p>
      Number of exercises
      {` ${
        props.course.parts[0].exercises +
        props.course.parts[1].exercises +
        props.course.parts[2].exercises
      }`}
    </p>
  );
}
export default Total;
