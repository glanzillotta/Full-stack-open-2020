import React from "react";
import personService from "../services/person";

const Persons = (props) => {
  const { persons, search, setPersons, setMessage } = props;
  const handleClick = (id) => {
    const person=persons.find(p => p.id === id);
    if (window.confirm(`Delete ${person.name}`)) {
      personService.remove(id)
      .then(() => {
        setMessage({text:`${person.name} has been removed from the server`,type:false});
        setPersons(persons.filter((person) => person.id !== id));
    });
      
    }
  };

  const printPerson = (person) => {
    return (
      <div key={person.id}>
        {person.name} {person.number}{" "}
        <input
          type="button"
          value="delete"
          onClick={()=>handleClick(person.id)}
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