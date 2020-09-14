import React from "react";
import Smile from "../Images/happy-96.png";
import Neutral from "../Images/neutral-96.png";
import Sad from "../Images/sad-96.png";

function Buttons({ increaseGood, increaseNeutral, increaseBad }) {
  return (
    <section className="buttons">
      <button onClick={increaseGood} className="good" type="button">
        <img src={Smile} alt="smiling face" />
      </button>
      <button onClick={increaseNeutral} className="neutral" type="button">
        <img src={Neutral} alt="neutral face" />
      </button>
      <button onClick={increaseBad} className="bad" type="button">
        <img src={Sad} alt="sad face" />
      </button>
    </section>
  );
}
export default Buttons;
