import logo from "./logo.svg";
import React from "react";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [country, setCountry] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [countryName, setCountryName] = useState("");
  const [stateName, setStateName] = useState("");
  const [citiesName, setCitiesName] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          `https://crio-location-selector.onrender.com/countries`
        );
        const data = await response.json();
        setCountry(data);
      } catch (error) {
        console.error("Error Loading data", error);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    if (!countryName) return;
    const fetchStates = async () => {
      try {
        const response = await fetch(
          `https://crio-location-selector.onrender.com/country=${countryName}/states`
        );
        const data = await response.json();
        setStates(data);
        setCities([]);
        setStateName("");
        setCitiesName("");
      } catch (error) {
        console.error("Error Loading data", error);
      }
    };
    fetchStates();
  }, [countryName]);

  useEffect(() => {
    if (!stateName || !countryName) return;
    const fetchCities = async () => {
      try {
        const response = await fetch(
          `https://crio-location-selector.onrender.com/country=${countryName}/state=${stateName}/cities`
        );
        const data = await response.json();
        setCities(data);
        setCitiesName("");
      } catch (error) {
        console.log("Error loading data", error);
      }
    };
    fetchCities();
  }, [stateName, countryName]);
  return (
    <div className="App">
      <h2>Select Location</h2>

      <label>
        <select
          value={countryName}
          onChange={(e) => setCountryName(e.target.value)}
          style={{
            padding: "2px",
            margin: "5px",
            borderRadius: "7px",
            width: "200px",
            height: "40px",
          }}
        >
          <option value="" disabled>
            Select Country
          </option>
          {country.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </label>

      <label>
        <select
          value={stateName}
          onChange={(e) => setStateName(e.target.value)}
          disabled={!countryName}
          style={{
            padding: "2px",
            margin: "5px",
            borderRadius: "7px",
            width: "200px",
            height: "40px",
          }}
        >
          <option value="" disabled>
            Select state
          </option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </label>

      <label>
        <select
          value={citiesName}
          onChange={(e) => setCitiesName(e.target.value)}
          disabled={!stateName || !countryName}
          style={{
            padding: "2px",
            margin: "5px",
            borderRadius: "7px",
            width: "200px",
            height: "40px",
          }}
        >
          <option value="" disabled>
            Select city
          </option>
          {cities.map((city) => (
            <option key={city} value={city}>
              Select City{city}
            </option>
          ))}
        </select>
      </label>

      {countryName && stateName && citiesName && (
        <p>
          You selected{" "}
          <strong>
            {citiesName}, {stateName}, {countryName}{" "}
          </strong>
        </p>
      )}
    </div>
  );
}

export default App;
