import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Countries from "./components/Countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((rep) => setCountries(rep.data));
  }, []);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div>
      <div>
        find countries <input type="text" onChange={handleSearch} />
      </div>
      <div>
        <Countries
          countries={countries}
          search={search}
          setSearch={setSearch}
        />
      </div>
    </div>
  );
};

export default App;
