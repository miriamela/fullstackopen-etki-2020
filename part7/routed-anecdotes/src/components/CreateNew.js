import React from "react";
import { useHistory } from "react-router-dom";
import { useFields } from "../hooks";

const CreateNew = ({ addNew }) => {
  // FUNCTION NORESET CAN CREATE AN OBJECT WITHOUT THE RESET FUNCTION
  // const noReset = ({ reset, ...rest }) => rest;
  // const content = noReset(useFields("text"));
  const content = useFields("text");
  const author = useFields("text");
  const info = useFields("text");
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    history.push("/");
  };
  const resetAll = (e) => {
    e.preventDefault();
    const empty = { target: { value: "" } };
    content.onChange(empty);
    author.onChange(empty);
    info.onChange(empty);
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button>create</button>
        <button type="reset" onClick={resetAll}>
          reset
        </button>
      </form>
    </div>
  );
};
export default CreateNew;
