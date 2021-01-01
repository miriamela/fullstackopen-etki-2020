import React from "react";

const Statistics = ({
  good,
  neutral,
  bad,
  total,
  average,
  positivePercentage,
}) => {
  return (
    <section className="statsSection">
      <h3>Statistics</h3>
      <div className="stats">
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>All collected feedback: {total}</p>
        <p>Average score: {average}</p>
        <p>Positive percentage: {positivePercentage}%</p>
      </div>
    </section>
  );
};

export default Statistics;
