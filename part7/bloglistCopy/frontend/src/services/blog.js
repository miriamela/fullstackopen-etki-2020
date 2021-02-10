import axios from "axios";

const baseUrl = "http://localhost:3003/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const getAll = async () => {
  const request = axios.get(baseUrl);
  const response = await request;
  return response.data;
};

const updateLikes = async (id, newObject) => {
  const newUrl = `${baseUrl}/${id}`;
  const response = await axios.put(newUrl, newObject);
  return response.data;
};

const updateComments = async (id, newObject) => {
  const newURL = `${baseUrl}/${id}/comments`;
  const response = await axios.post(newURL, newObject);
  return response.data;
};
const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const newUrl = `${baseUrl}/${id}`;
  return axios.delete(newUrl, config);
};
// eslint-disable-next-line
export default {
  getAll: getAll,
  setToken: setToken,
  create: create,
  updateLikes: updateLikes,
  remove: remove,
  updateComments: updateComments,
};
