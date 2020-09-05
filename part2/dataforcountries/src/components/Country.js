import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Country.css";

const Country = (props) => {
  const { country } = props;
  const [weather, setWeather] = useState({});
  const params = {
    access_key: process.env.REACT_APP_API_KEY,
    query: `${country.capital},${country.name}`,
  };

  useEffect(() => {
    axios
      .get("http://api.weatherstack.com/current", { params })
      .then((response) => setWeather(response.data.current));
  }, []);
  console.log(weather);

  return (
    <div>
      <h2>{country.name}</h2>
      <p>capital: {country.capital}</p>
      <p>population: {country.population}</p>
      <h3>languages</h3>
      <ul>
        {country.languages.map((language) => (
          <li key={language.iso639_2}>{language.name}</li>
        ))}
      </ul>
      <img src={country.flag} alt={`flag of ${country.name}`} />
      <h3>Weather in {country.capital}</h3>
      <p>temperature: {weather.temperature}</p>
      <img src={weather.weather_icons} alt={weather.weather_descriptions} />
      <p>wind speed: {weather.wind_speed}</p>
    </div>
  );
};

export default Country;
