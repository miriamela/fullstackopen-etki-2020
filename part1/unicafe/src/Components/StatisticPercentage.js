import React from "react";

function StatisticPercentage({ text, percentage }) {
  return (
    <tr>
      <td>{text} </td>
      <td>{percentage}</td>
    </tr>
  );
}
export default StatisticPercentage;
