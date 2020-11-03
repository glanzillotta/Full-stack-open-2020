import React, { useState, useEffect } from "react";
import "./index.css";
import Form from "./components/Form";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import personService from "./services/person";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState({text:null,type:Boolean});

  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response);
    }).catch(error => setMessage({text:error.message,type:true}));
  }, [persons.length]);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} setMessage={setMessage} />
      <Filter setSearch={setSearch} />
      <h2>Numbers</h2>
      <Form
        persons={persons}
        setMessage={setMessage}
        setPersons={setPersons}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        newName={newName}
        setNewName={setNewName}
      />
      <Persons persons={persons} setPersons={setPersons} search={search} setMessage={setMessage} />
    </div>
  )
};

export default App;