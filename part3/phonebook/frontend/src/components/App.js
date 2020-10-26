import React, { useState, useEffect } from "react";
import personsService from "../services/Persons";
import "../App.css";
import Filter from "./Filter";
import Form from "./Form";
import Numbers from "./Numbers";
import Notification from "./Notification";

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, SetNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [message, setMessage] = useState(null);

  // style message
  const infoStyleGreen = {
    color: "green",
    fontStyle: "italic",
    fontSize: 20,
    background: "lightGrey",
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };
  const infoStyleRed = {
    color: "red",
    fontStyle: "italic",
    fontSize: 20,
    background: "lightGrey",
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };
  // setting timer for message
  const settingTime = () => {
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };
  // getting data from server
  useEffect(() => {
    personsService
      .getAll()
      .then((initialPersons) => setPersons(initialPersons));
  }, []);

  // handleClick "add"
  const addName = (event) => {
    event.preventDefault();
    const newContact = persons.filter(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );
    if (newContact.length === 0) {
      const contact = {
        name: newName,
        number: newNumber,
      };
      // console.log(contact);
      personsService
        .create(contact)
        .then((returnPersons) => {
          setPersons(persons.concat(returnPersons));
          setMessage({
            text: `Added ${contact.name} contact`,
            textStyle: infoStyleGreen,
          });
          settingTime();
        })
        .catch((error) => {
          setMessage({
            text: `${error.response.data.error}`,
            textStyle: infoStyleRed,
          });
          settingTime();
        });
    } else {
      const confirmationAdd = window.confirm(
        `${newName} is already in your phonebook, do you want to replace the old number with a new one?`
      );
      if (confirmationAdd) {
        const person = persons.find((person) => person.id === newContact[0].id);
        const changedPerson = { ...person, number: newNumber };
        personsService
          .changeContact(newContact[0].id, changedPerson)
          .then((changedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== newContact[0].id ? person : changedPerson
              )
            );
            setMessage({
              text: `${changedPerson.name.toUpperCase()}'s contact has been successfully changed`,
              textStyle: infoStyleGreen,
            });
            settingTime();
          })
          .catch((error) => {
            setMessage({
              text: `Information of ${newName} has already been removed from the server`,
              textStyle: infoStyleRed,
            });
            settingTime();
          });
      }
    }
    SetNewName("");
    setNewNumber("");
  };

  // handleChange for name and number
  const handleName = (event) => {
    const entryName = event.target.value;
    SetNewName(entryName);
  };
  const handleNumber = (event) => {
    const entryNumber = event.target.value;
    setNewNumber(entryNumber);
  };
  // search logic
  const handleChange = (event) => {
    const search = event.target.value;
    setSearchInput(search);
  };
  const contact = persons.filter((person) =>
    person.name.toUpperCase().includes(searchInput.toUpperCase())
  );
  // console.log(contact);
  // console.log(Array.isArray(contact));
  // delete button with confirmation
  const handleClick = (event) => {
    const name = event.currentTarget.name;
    const deletedContact = persons.filter((person) => person.name === name);
    const confirmationDelete = window.confirm(`Delete ${name}?`);
    if (confirmationDelete) {
      personsService.deleteUser(deletedContact[0].id).then(() => {
        setPersons(
          persons.filter((deleted) => deleted.id !== deletedContact[0].id)
        );
        setMessage({
          text: `${name.toUpperCase()} has been successfully deleted`,
          textStyle: infoStyleGreen,
        });
        settingTime();
      });
    }
  };

  return (
    <div className="App">
      <h1>Phonebook</h1>
      <Notification message={message}></Notification>
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
      <Numbers contact={contact} handleClick={handleClick}></Numbers>
    </div>
  );
}

export default App;
