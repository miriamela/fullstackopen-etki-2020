import React from "react";

function StatisticTotalNumber({ text, totalNumber }) {
  return (
    <tr>
      <td>{text}</td>
      <td>{totalNumber}</td>
    </tr>
  );
}
export default StatisticTotalNumber;
