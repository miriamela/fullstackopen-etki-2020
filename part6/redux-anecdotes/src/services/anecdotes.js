import axios from "axios";
const baseURL = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseURL);
  console.log(response.data);
  return response.data;
};

const addNewAnecdote = async (content) => {
  const object = { content, vote: 0 };
  const response = await axios.post(baseURL, object);
  return response.data;
};

export default { getAll, addNewAnecdote };
