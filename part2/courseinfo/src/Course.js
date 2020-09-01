import React from "react";

const Header = (props) => {
  const { course } = props;

  return (
    <div>
      <h2>{course}</h2>
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

export default Course;
