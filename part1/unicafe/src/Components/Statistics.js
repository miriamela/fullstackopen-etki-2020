import React from "react";
import StatisticGood from "./StatisticGood";
import StatisticNeutral from "./StatisticNeutral";
import StatisticBad from "./StatisticBad";
import StatisticTotalNumber from "./StatisticTotalNumber";
import StatisticAverage from "./StatisticAverage";
import StatisticPercentage from "./StatisticPercentage";

function Statistics({
  goodNumber,
  neutralNumber,
  badNumber,
  totalNumber,
  averageScore,
  percentage,
}) {
  //   console.log(percentage);
  if ((goodNumber === 0) & (neutralNumber === 0) & (badNumber === 0)) {
    return (
      <section class="noFeedback">
        <h2>Statistics</h2>
        <p>No feedback given</p>
      </section>
    );
  } else {
    return (
      <section className="statistics">
        <h2>Statistics</h2>
        <table>
          <tbody>
            <StatisticGood text="Good" goodNumber={goodNumber} />
            <StatisticNeutral text="Neutral" neutralNumber={neutralNumber} />
            <StatisticBad text="bad" badNumber={badNumber} />
            <StatisticTotalNumber
              text="All collected feedback:"
              totalNumber={totalNumber}
            />
            <StatisticAverage
              text="Average score:"
              averageScore={averageScore}
            />
            <StatisticPercentage
              text="Positive percentage:"
              percentage={percentage}
            />
          </tbody>
        </table>
      </section>
    );
  }
}
export default Statistics;
