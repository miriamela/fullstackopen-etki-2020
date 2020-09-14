import React from "react";
import Part1 from "./Part1";
import Part2 from "./Part2";
import Part3 from "./Part3";

function Content(props) {
  console.log(props);
  // console.log(Array.isArray(props.parts));
  // const [first, second, third] = props.parts;
  // console.log(Array.isArray(first));
  return (
    <>
      <Part1 part1={props.course.parts[0]} />
      <Part2 part2={props.course.parts[1]} />
      <Part3 part3={props.course.parts[2]} />
    </>
  );
}
export default Content;
