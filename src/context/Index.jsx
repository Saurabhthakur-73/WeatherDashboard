import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const [weather, setWeather] = useState({});
  const [values, setValues] = useState([]);
  const [place, setPlace] = useState();
  const [thisLocation, setLocation] = useState("");

  // fetch api
  const fetchWeather = async () => {
    const API_KEY = import.meta.env.VITE_API_KEY; // apni visualcrossing wali key
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${place}?unitGroup=metric&key=${API_KEY}&contentType=json`;

    try {
      const response = await axios.get(url);
      console.log(response.data);

      // jo response aata hai usme days ki array hoti hai
      setLocation(response.data.address);
      setValues(response.data.days);
      setWeather(response.data.currentConditions);
    } catch (e) {
      console.error(e);
      alert("This place does not exist");
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [place]);

  useEffect(() => {
    console.log(values);
  }, [values]);

  return (
    <StateContext.Provider
      value={{
        weather,
        setPlace,
        values,
        thisLocation,
        place,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
