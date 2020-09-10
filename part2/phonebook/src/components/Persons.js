import React from "react";
import personService from "../services/person";

const Persons = (props) => {
  const { persons, search, setPersons } = props;
  const handleClick = (event) => {
    if (window.confirm(`Delete ${persons[event.target.id - 1].name}`)) {
      personService.remove(event.target.id);
      setPersons(persons.filter((person) => person.id !== event.target.id));
    }
  };

  const printPerson = (person) => {
    return (
      <div>
        {person.name} {person.number}{" "}
        <input
          id={person.id}
          type="button"
          value="delete"
          onClick={handleClick}
        />
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
