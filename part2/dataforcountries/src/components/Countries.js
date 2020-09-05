import React from "react";
import Country from "./Country";

const Countries = (props) => {
  const { countries, search, setSearch } = props;
  const filtered = countries.filter(
    (country) => country.name.toLowerCase().indexOf(search.toLowerCase()) >= 0
  );
  const handleClick = (event) => {
    setSearch(event.target.id);
  };

  const printCountry = (country) => {
    return (
      <div>
        {country.name}{" "}
        <input
          type="button"
          id={country.name}
          value="show"
          onClick={handleClick}
        />
      </div>
    );
  };

  console.log(filtered);

  if (filtered.length > 10)
    return <p>Too many matches, specify another filter</p>;
  else if (filtered.length === 0) return <p>No states found</p>;
  else if (filtered.length === 1) return <Country country={filtered[0]} />;
  else return <p>{filtered.map(printCountry)}</p>;
};

export default Countries;
