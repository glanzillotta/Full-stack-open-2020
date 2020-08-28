import React from "react";
import ReactDOM from "react-dom";

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  const Header = (props) => {
    return (
      <div>
        <h1>{props.course}</h1>
      </div>
    );
  };

  const Part = ({ name, exercises }) => {
    return (
      <div>
        <p>
          {name} {exercises}
        </p>
      </div>
    );
  };

  const Content = ({ parts }) => {
    return (
      <div>
        <Part name={parts[0].name} exercises={parts[0].exercises} />
        <Part name={parts[1].name} exercises={parts[1].exercises} />
        <Part name={parts[2].name} exercises={parts[2].exercises} />
      </div>
    );
  };

  const Total = (props) => {
    return (
      <div>
        <p>
          Number of exercises{" "}
          {props.props[0].exercises +
            props.props[1].exercises +
            props.props[2].exercises}
        </p>
      </div>
    );
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total props={course.parts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
