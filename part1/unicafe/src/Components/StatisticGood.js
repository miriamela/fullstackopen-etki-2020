import React from "react";

function StatisticGood({ goodNumber, text }) {
  return (
    <tr>
      <td>{text}</td>
      <td>{goodNumber}</td>
    </tr>
  );
}
export default StatisticGood;
