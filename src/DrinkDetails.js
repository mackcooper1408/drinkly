import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, ListGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
import DrinkApi from "./api";
import "./DrinkDetails.css";

const COCKTAIL_URL = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

function DrinkDetails() {
  const [drink, setDrink] = useState({})
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    async function getDrinkDetails() {
      const result = DrinkApi.getDrink(id);
      console.log("WORKS??", result);
      setDrink(result);
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

  function handleClick(evt) {
    const item = evt.target.parentNode;
    item.style.backgroundColor = "blue";
  }

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className="DrinkDetails">
      <h3>{drink.strDrink}</h3>
      <div className="row">
        <div className="col-6">
          <h5>Ingredients</h5>
          <ListGroup>
            {recipe.map(inst => (
              <ListGroup.Item key={drink.idDrink}>
                <i className="float-left" onClick={handleClick}>
                  ...
                  </i>
                {inst}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
        <div className="col-6">
          <h5>Instructions</h5>
          <h5>{drink.strInstructions}</h5>
          <Button variant="primary">Button</Button>
        </div>
      </div>
    </div>
  )
}

export default DrinkDetails;