import React, { useState } from "react";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-1234567" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

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
    console.log(persons.includes(newName));
    if (persons.find((person) => person.name === newName))
      alert(`${newName} is already added to phonebook`);
    else setPersons([...persons, { name: newName, number: newNumber }]);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with <input type="text" onChange={handleSearch} />
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
      <h2>Numbers</h2>
      <ul>
        {persons.map((person, i) => (
          <li key={i}>
            {person.name} {person.number}
          </li>
        ))}
      </ul>
      <ul>
        {persons
          .filter(
            (person) => person.name.toLowerCase() === search.toLowerCase()
          )
          .map((person, i) => (
            <li key={i}>
              {person.name} {person.number}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default App;
