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

export const useCountry = (name) => {
  const [country, setCountry] = useState(null);
  const baseURL = `https://restcountries.eu/rest/v2/name/${name}?fullText=true`;

  useEffect(() => {
    axios
      .get(baseURL)
      .then((response) => {
        console.log(response.data);
        setCountry({ data: { ...response.data[0] }, found: true });
      })
      .catch((error) => {
        if (error === 404) {
          // console.log() not working... there is a call from useEffect produced et every page loading...
          console.log(error);
          setCountry(null);
        }
      });
  }, [baseURL]);

  return country;
};
