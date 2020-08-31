import React from "react";
import ReactDOM from "react-dom";

const Header = (props) => {
  const { course } = props;

  return (
    <div>
      <h1>{course}</h1>
    </div>
  );
};

const Part = (props) => {
  const { name, exercises } = props;

  return (
    <div>
      <p>
        {name} {exercises}
      </p>
    </div>
  );
};

const Content = (props) => {
  const { parts } = props;

  return (
    <div>
      {parts.map((part) => (
        <Part name={part.name} exercises={part.exercises} />
      ))}
    </div>
  );
};

const Total = (props) => {
  const { parts } = props;
  const total = parts
    .map((part) => part.exercises)
    .reduce((acc, cur) => acc + cur);

  return (
    <div>
      <strong>Number of exercises {total}</strong>
    </div>
  );
};

const Course = (props) => {
  const { course } = props;
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
      { name: "Redux", exercises: 11, id: 4 },
    ],
  };

  return <Course course={course} />;
};

ReactDOM.render(<App />, document.getElementById("root"));
