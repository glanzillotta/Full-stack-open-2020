import React from "react";
import axios from "axios";

const PersonForm = (props) => {
  const {
    newName,
    setNewName,
    newNumber,
    setNewNumber,
    persons,
    setPersons,
  } = props;

  const handleForm = (event) => {
    event.preventDefault();
    const personObj = {
      name: newName,
      number: newNumber,
    };
    axios.post("http://localhost:3001/persons", personObj);
  };

  const handleNewName = (event) => {
    setNewName(event.target.value);
  };

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleAddName = () => {
    if (persons.find((person) => person.name === newName))
      alert(`${newName} is already added to phonebook`);
    else setPersons([...persons, { name: newName, number: newNumber }]);
  };
  return (
    <form onSubmit={handleForm}>
      <div>
        name: <input type="text" onChange={handleNewName} />
      </div>
      <div>
        number: <input type="text" onChange={handleNewNumber} />
      </div>
      <div>
        <input type="submit" value="add" onClick={handleAddName} />
      </div>
    </form>
  );
};

export default PersonForm;
