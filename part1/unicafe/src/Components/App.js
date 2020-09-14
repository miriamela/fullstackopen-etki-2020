import React, { useState } from "react";
import Statistics from "./Statistics";
import Buttons from "./Buttons";
import "../App.scss";

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [feedBack, setFeedBack] = useState([]);
  const increaseGood = () => {
    setGood(good + 1);
    setFeedBack(feedBack.concat(1));
  };
  const increaseNeutral = () => {
    setNeutral(neutral + 1);
    setFeedBack(feedBack.concat(0));
  };
  const increaseBad = () => {
    setBad(bad + 1);
    setFeedBack(feedBack.concat(-1));
  };
  const average = () => {
    let sum = 0;
    for (let i = 0; i < feedBack.length; i++) {
      sum += feedBack[i];
    }
    return sum / feedBack.length;
  };
  const positive = () => {
    return (good / feedBack.length) * 100;
  };

  return (
    <div className="App">
      <h1>Give us feedback!</h1>
      <Buttons
        increaseGood={increaseGood}
        increaseNeutral={increaseNeutral}
        increaseBad={increaseBad}
      />
      <Statistics
        goodNumber={good}
        neutralNumber={neutral}
        badNumber={bad}
        totalNumber={feedBack.length}
        averageScore={average()}
        percentage={`${Math.floor(positive())}%`}
      />
    </div>
  );
}
// feedBack.length === 0 ? "" :

export default App;
