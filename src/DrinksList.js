import React, { useEffect, useState } from "react";
import axios from "axios";

function DrinksList() {
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    async function getDrinks() {
      const result = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11320");
      setDrinks(result.data.drinks[0])
    }
    getDrinks();
  }, [])

  return (
    <div>
      <h2>{drinks.strDrink}</h2>
      <p>{drinks.strInstructions}</p>
    </div>
  )
}

export default DrinksList;