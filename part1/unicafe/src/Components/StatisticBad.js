import React from "react";

function StatisticBad({ text, badNumber }) {
  return (
    <tr>
      <td>{text}</td>
      <td>{badNumber}</td>
    </tr>
  );
}
export default StatisticBad;
