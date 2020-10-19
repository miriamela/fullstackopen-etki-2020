import axios from "axios";

const baseUrl = "/api/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};
const create = (contact) => {
  const request = axios.post(baseUrl, contact);
  return request.then((response) => response.data);
};
const deleteUser = (id) => {
  const newURL = `${baseUrl}/${id}`;
  return axios.delete(newURL);
};
const changeContact = (id, changedPerson) => {
  const newURL = `${baseUrl}/${id}`;
  const request = axios.put(newURL, changedPerson);
  return request.then((response) => response.data);
};
export default { getAll, create, deleteUser, changeContact };
