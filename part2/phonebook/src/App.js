import React, { useState } from "react";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleForm = (event) => {
    event.preventDefault();
  };

  const handleNewName = (event) => {
    setNewName(event.target.value);
  };

  const handleAddName = () => {
    console.log(persons.includes(newName));
    if (persons.find((person) => person.name === newName))
      alert(`${newName} is already added to phonebook`);
    else setPersons([...persons, { name: newName }]);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleForm}>
        <div>
          name: <input onChange={handleNewName} />
        </div>
        <div>
          <input type="submit" value="add" onClick={handleAddName} />
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person, i) => (
          <li key={i}>{person.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
