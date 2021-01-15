import { useState, useEffect } from "react";
import axios from "axios";

export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};
export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const fetchingData = async () => {
      const response = await axios.get(baseUrl);
      setResources(response.data);
    };
    fetchingData();
  }, [baseUrl]);

  const create = async (resource) => {
    const response = await axios.post(baseUrl, resource);
    const newResources = resources.concat(response.data);
    console.log(newResources);
    setResources(newResources);
  };

  const service = {
    create,
  };

  return [resources, service];
};
