import React from "react";
import Country from "./Country";

const Countries = (props) => {
  const { countries, search } = props;

  const printCountry = (country) => {
    return <div>{country.name}</div>;
  };

  const filterd = countries.filter(
    (country) => country.name.toLowerCase().indexOf(search.toLowerCase()) >= 0
  );
  console.log(filterd);

  if (filterd.length > 10)
    return <p>Too many matches, specify another filter</p>;
  else if (filterd.length === 0) return <p>No states found</p>;
  else if (filterd.length === 1) return <Country country={filterd[0]} />;
  else return <p>{filterd.map(printCountry)}</p>;
};

export default Countries;
