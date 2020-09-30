import React from "react";
import Part from "./Part";

function Content({ parts }) {
  console.log(parts);
  return parts.map((part, i) => {
    return (
      <div key={i}>
        <Part part={part} />
      </div>
    );
  });
}
export default Content;
