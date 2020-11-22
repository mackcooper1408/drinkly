import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const COCKTAIL_URL = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

function DrinkDetails() {
  const [drink, setDrink] = useState({})
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    async function getDrinkDetails() {
      const result = await axios.get(`${COCKTAIL_URL}${id}`);
      console.log("WORKS??", result);
      setDrink(result.data.drinks[0]);
      setIsLoading(false);
    }
    getDrinkDetails();
  }, []);

  function getRecipe(drink) {
    const recipe = [];
    let i = 1;
    while (i <= 15) {
      if (drink[`strMeasure${i}`]) {
        const measure = drink[`strMeasure${i}`];
        const ingredient = drink[`strIngredient${i}`];
        const instructions = `${measure} ${ingredient}`;
        recipe.push(instructions);
      }
      i++;
    }
    return recipe;
  }

  const recipe = getRecipe(drink)

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div>
      <h1>{drink.strDrink}</h1>
      <ul>
        {recipe.map(inst => (
          <li>{inst}</li>
        ))}
      </ul>
      <h5>{drink.strInstructions}</h5>
    </div>
  )
}

export default DrinkDetails;