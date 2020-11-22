import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

function DrinksList() {
  const [drinks, setDrinks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const history = useHistory();

  // useEffect(() => {
  //   async function getDrinks() {
  //     const result = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchTerm}`);
  //     setDrinks(result.data.drinks);
  //   }
  //   getDrinks();
  // }, []);

  async function handleSubmit(evt) {
    evt.preventDefault();
    const result = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchTerm}`);
    
    setDrinks(result.data.drinks);
    setSearchTerm("");
  }

  function handleChange(evt) {
    const { value } = evt.target;
    setSearchTerm(value);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name={searchTerm} value={searchTerm} onChange={handleChange} />
        <button>Search</button>
      </form>
      <ul>
        {drinks && drinks.map(d => (
          <li key={d.idDrink}>
            <Link to={`/drinks/${d.idDrink}`}>{d.strDrink}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DrinksList;