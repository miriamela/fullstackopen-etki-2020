import React from "react";

const Buttons = ({ good, neutral, bad, reset }) => {
  return (
    <section className="buttons">
      <button onClick={good}>good</button>
      <button onClick={neutral}>neutral</button>
      <button onClick={bad}>bad</button>
      <button onClick={reset}>reset stats</button>
    </section>
  );
};

export default Buttons;
