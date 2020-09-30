import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import Filter from "./Filter";
import Form from "./Form";
import Numbers from "./Numbers";

function App() {
  const [persons, setPerson] = useState([]);
  const [newName, SetName] = useState("");
  const [newNumber, setNumber] = useState("");
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPerson(response.data);
    });
  }, []);

  // handleClick de toda la vida, se activa con el click, aunque esté en el form
  const addName = (event) => {
    event.preventDefault();
    for (let i = 0; i < persons.length; i++) {
      if (newName !== persons[i].name) {
        setPerson(persons.concat({ name: newName, number: newNumber }));
      } else {
        alert(`${newName} is already added to phonebook `);
      }
    }
    SetName("");
    setNumber("");
  };
  // handleChange, recoge lo que se escribe en el input y lo repasa como valor de new name
  const handleName = (event) => {
    const entryName = event.target.value;
    SetName(entryName);
  };
  const handleNumber = (event) => {
    const entryNumber = event.target.value;
    setNumber(entryNumber);
  };
  // search logic
  const handleChange = (event) => {
    const search = event.target.value;
    setSearchInput(search);
    console.log("estas buscando", searchInput);
  };
  const contact = persons.filter((person) =>
    person.name.toUpperCase().includes(searchInput.toUpperCase())
  );
  console.log(contact);
  return (
    <div className="App">
      <h1>Phonebook</h1>
      <Filter searchInput={searchInput} handleChange={handleChange}></Filter>
      <h2>Add a new:</h2>
      <Form
        addName={addName}
        newName={newName}
        handleName={handleName}
        newNumber={newNumber}
        handleNumber={handleNumber}
      ></Form>
      <h2>Numbers</h2>
      <Numbers persons={persons}></Numbers>
    </div>
  );
}

export default App;
