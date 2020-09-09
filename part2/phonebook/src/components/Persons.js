import React from "react";

const Persons = (props) => {
  const { persons, search } = props;
  const printPerson = (person) => {
    return (
      <div>
        {person.name} {person.number}
      </div>
    );
  };
  return search === ""
    ? persons.map(printPerson)
    : persons
        .filter((person) => person.name.toLowerCase() === search.toLowerCase())
        .map(printPerson);
};

export default Persons;
