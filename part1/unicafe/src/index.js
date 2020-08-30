import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, bad, neutral, average, positive }) => {
  return (
    <div>
      <table>
        <tbody>
          <Statistic text="good" value={good} />
          <Statistic text="neutral" value={neutral} />
          <Statistic text="bad" value={bad} />
          <Statistic text="average" value={average} />
          <Statistic text="positive" value={positive} />
        </tbody>
      </table>
    </div>
  );
};

const Button = (props) => {
  return (
    <div>
      <button onClick={() => props.setGood(props.good + 1)}>good </button>
      <button onClick={() => props.setNeutral(props.neutral + 1)}>
        neutral
      </button>
      <button onClick={() => props.setBad(props.bad + 1)}>bad</button>
    </div>
  );
};

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  let total = good + bad + neutral;
  const average = (good - bad) / total;
  const positive = (good * 100) / total;
  if (total !== 0) {
    return (
      <div>
        <h1>give feedback</h1>
        <Button
          good={good}
          bad={bad}
          neutral={neutral}
          setGood={setGood}
          setBad={setBad}
          setNeutral={setNeutral}
        />

        <h1>Statistics</h1>
        <Statistics
          good={good}
          bad={bad}
          neutral={neutral}
          average={average}
          positive={positive}
        />
      </div>
    );
  } else {
    return (
      <div>
        <h1>give feedback</h1>
        <Button
          good={good}
          bad={bad}
          neutral={neutral}
          setGood={setGood}
          setBad={setBad}
          setNeutral={setNeutral}
        />
        <p>No feedback give</p>
      </div>
    );
  }
};

ReactDOM.render(<App />, document.getElementById("root"));
