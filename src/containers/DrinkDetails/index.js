import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";

import DrinkApi from "api";

import "./DrinkDetails.css";

/** Displays details about a specific cocktail.
 *  Shows list of needed ingredients, list of owned ingredients,
 *  a photo of the drink, and a recipe for making the drink */
function DrinkDetails() {
  const [drink, setDrink] = useState({});
  const [neededIngredients, setNeededIngredients] = useState([]);
  const [ownedIngredients, setOwnedIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    async function getDrinkDetails() {
      // get the drink details from the API based on ID in URL params
      const result = await DrinkApi.getDrink(id);

      const recipe = getRecipe(result);

      setDrink(result);
      setNeededIngredients(recipe);
      setIsLoading(false);
    }
    getDrinkDetails();
  }, [id]);

  /** extracts recipe from data returned by API
   *  instead returns as an array ->
   *  ["measurement ingredient", "other-measurement other-ingredient", ...]
   *  @param {object} drink - drink data from API */
  function getRecipe(drink) {
    const recipe = [];
    let i = 1;
    while (i <= 15) {
      if (drink[`strMeasure${i}`] || drink[`strIngredient${i}`]) {
        const measure = drink[`strMeasure${i}`] || "";
        const ingredient = drink[`strIngredient${i}`] || "";
        const instructions = `${measure} ${ingredient}`;
        recipe.push({ id: uuid(), instructions });
      }
      i++;
    }
    return recipe;
  }

  /** removes ingredient from "needed" list to "owned" list */
  function handleClick(evt) {
    const itemId = evt.target.id;
    const itemText = evt.target.innerText;

    const neededMinusItem = neededIngredients.filter(
      (inst) => String(inst.id) !== itemId
    );

    setNeededIngredients(neededMinusItem);
    setOwnedIngredients((old) => [...old, itemText]);
  }

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className="DrinkDetails container">
      <h3>{drink.strDrink}</h3>
      <img
        src={drink.strDrinkThumb}
        alt={drink.strDrink}
        width="80%"
        height="auto"
      ></img>
      <div className="row row-sm">
        <div className="col my-2">
          <h3>Ingredients</h3>
        </div>
      </div>
      <div className="row row-sm">
        <div className="col-6">
          <h5>Need</h5>
          <ul className="list-group">
            {neededIngredients.map((inst) => (
              <div
                className="btn btn-warning btn-sm my-1"
                id={inst.id}
                key={inst.id}
                onClick={handleClick}
              >
                {inst.instructions}
              </div>
            ))}
          </ul>
        </div>
        <div className="col-6">
          <h5>Have</h5>
          <ul className="list-group">
            {ownedIngredients.map((inst) => (
              <div className="btn btn-success btn-sm my-1" key={inst}>
                <i className="float-left">...</i>
                {inst}
              </div>
            ))}
          </ul>
        </div>
      </div>
      <hr />
      <div className="col mb-4">
        <h3>Instructions</h3>
        <h5>{drink.strInstructions}</h5>
      </div>
    </div>
  );
}

export default DrinkDetails;
