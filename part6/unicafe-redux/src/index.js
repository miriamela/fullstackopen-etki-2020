import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import reducer from "./reducer";
import Buttons from "./components/Buttons";
import Statistics from "./components/Statistics";
import "./index.css";

const store = createStore(reducer);

const App = () => {
  const good = () => {
    store.dispatch({
      type: "GOOD",
    });
  };
  const neutral = () => {
    store.dispatch({
      type: "OK",
    });
  };
  const bad = () => {
    store.dispatch({
      type: "BAD",
    });
  };
  const reset = () => {
    store.dispatch({
      type: "ZERO",
    });
  };
  const total =
    store.getState().good + store.getState().ok + store.getState().bad;
  const average = (store.getState().good - store.getState().bad) / total;
  const positivePercentage = Math.floor((store.getState().good / total) * 100);
  return (
    <div className="App">
      <h1>Give us feedback!</h1>
      <Buttons good={good} neutral={neutral} bad={bad} reset={reset} />
      {total === 0 ? (
        <h3>No Feedback given</h3>
      ) : (
        <Statistics
          good={store.getState().good}
          neutral={store.getState().ok}
          bad={store.getState().bad}
          total={total}
          average={average}
          positivePercentage={positivePercentage}
        />
      )}
    </div>
  );
};

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById("root"));
};

renderApp();
store.subscribe(renderApp);
