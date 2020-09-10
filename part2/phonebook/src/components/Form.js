import React from "react";
import personService from "../services/person";

const PersonForm = (props) => {
  const {
    newName,
    setNewName,
    newNumber,
    setNewNumber,
    persons,
    setPersons,
    setMessage,
  } = props;
  const newObject = { name: newName, number: newNumber };

  const handleForm = (event) => {
    event.preventDefault();
  };

  const handleNewName = (event) => {
    setNewName(event.target.value);
  };

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleAddName = () => {
    let id = null;
    if (
      persons.find((person) =>
        person.name === newName ? (id = person.id) : null
      )
    ) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      )
        personService
          .update(id, newObject)
          .catch(
            setMessage(
              `Information of ${newObject.name} has been removed from the server`,
              true
            )
          );
      setMessage(`Number of ${newObject.name} modified`, false);
      setTimeout(() => setMessage(null), 5000);
      setPersons([...persons, newObject]);
    } else {
      personService.add(newObject);
      setMessage(`Added ${newObject.name}`);
      setTimeout(() => setMessage(null), 5000);
      setPersons([...persons, newObject]);
    }
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
