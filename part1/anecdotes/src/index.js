import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(Math.floor(Math.random() * 6));
  const [max, setMax] = useState(Math.floor(Math.random() * 6));
  const [votes, setVotes] = useState(
    Array.apply(null, new Array(anecdotes.length)).map(
      Number.prototype.valueOf,
      0
    )
  );

  const rndAnecdotes = () => {
    setSelected(Math.floor(Math.random() * 6));
  };

  const incVote = () => {
    const newVotes = [...votes];
    newVotes[selected] = newVotes[selected] + 1;
    setVotes(newVotes);
    newVotes.forEach((e, i) => {
      if (e > max) setMax(i);
      console.log(max);
    });
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p> {anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <div>
        <button onClick={incVote}>vote</button>
        <button onClick={rndAnecdotes}>next anecdotes</button>
      </div>
      <div>
        <h1>Anecdote with most votes</h1>
        <p>{anecdotes[max]}</p>
        <p>has {votes[max]} votes</p>
      </div>
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
