import React from "react";
import "./Country.css";

const Country = (props) => {
  const { country } = props;
  console.log(country);
  return (
    <div>
      <h2>{country.name}</h2>
      <p>capital: {country.capital}</p>
      <p>population: {country.population}</p>
      <h3>languages</h3>
      <ul>
        {country.languages.map((language, i) => (
          <li key={i}>{language.name}</li>
        ))}
      </ul>
      <img src={country.flag} alt={"flag of " + country.name} />
    </div>
  );
};

export default Country;
