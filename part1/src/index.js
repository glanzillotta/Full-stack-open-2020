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

  const Part = (props) => {
    return (
      <div>
        <p>
          {props.name} {props.exercises}
        </p>
      </div>
    );
  };

  const Content = (props) => {
    return (
      <div>
        <Part name={props.props[0].name} exercises={props.props[0].exercises} />
        <Part name={props.props[1].name} exercises={props.props[1].exercises} />
        <Part name={props.props[2].name} exercises={props.props[2].exercises} />
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
      <Content props={course.parts} />
      <Total props={course.parts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
