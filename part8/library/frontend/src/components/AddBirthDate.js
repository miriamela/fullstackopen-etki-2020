import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_BIRTH_YEAR, ALL_AUTHORS, ALL_BOOKS } from "../queries";

const AddBirthDate = ({ authors }) => {
  const [name, setName] = useState(authors[0].name);
  const [born, setBorn] = useState("");
  const [updateBirthYear] = useMutation(ADD_BIRTH_YEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }],
  });
  console.log(authors);
  console.log(name);
  const submit = (ev) => {
    ev.preventDefault();
    updateBirthYear({ variables: { name, born } });
    setName("");
    setBorn("");
  };

  const setOptions = authors.map((each) => {
    return (
      <option value={each.name} key={each.name}>
        {each.name}
      </option>
    );
  });

  return (
    <>
      <h2>Set Birth Year</h2>
      <form onSubmit={submit}>
        <div>
          <select value={name} onChange={({ target }) => setName(target.value)}>
            {setOptions}
          </select>
        </div>
        <div>
          <label>born</label>
          <input
            value={born}
            onChange={({ target }) => setBorn(Number(target.value))}
          />
        </div>
        <button>update author</button>
      </form>
    </>
  );
};
export default AddBirthDate;
