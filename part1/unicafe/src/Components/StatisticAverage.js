import React from "react";

function StatisticAverage({ text, averageScore }) {
  return (
    <tr>
      <td>{text}</td>
      <td>{averageScore}</td>
    </tr>
  );
}
export default StatisticAverage;
