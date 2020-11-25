import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Button, ListGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
import DrinkApi from "./api";
import "./DrinkDetails.css";


function DrinkDetails() {
  const [drink, setDrink] = useState({});
  const [neededIngredients, setNeededIngredients] = useState([])
  const [ownedIngredients, setOwnedIngredients] = useState([])
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    async function getDrinkDetails() {
      const result = await DrinkApi.getDrink(id);

      const recipe = getRecipe(result);

      setDrink(result);
      setNeededIngredients(recipe);
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

  function handleClick(evt) {
    const item = evt.target.parentNode;
    console.log(item.innerText);

    const neededMinusItem = neededIngredients.filter(inst => inst !== item.innerText);

    setNeededIngredients(neededMinusItem);
    setOwnedIngredients(old => [...old, item.innerText]);
  }

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className="DrinkDetails container">
      <h3>{drink.strDrink}</h3>
      <div className="row row-sm">
        <div className="col-5">
          <h5>Ingredients Needed</h5>
          <ListGroup as="ul">
            {neededIngredients.map(inst => (
              <ListGroup.Item as="li" variant="secondary" key={inst}>
                <FontAwesomeIcon icon={faPlusCircle} className="float-left" onClick={handleClick} />
                {inst}
              </ListGroup.Item>
            ))}
          </ListGroup>
          <h5>Ingredients checked</h5>
          <ListGroup as="ul">
            {ownedIngredients.map(inst => (
              <ListGroup.Item as="li" variant="success" key={inst}>
                <i className="float-left">
                  ...
                  </i>
                {inst}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
        <div className="col-6">
          <h5>Instructions</h5>
          <img src={drink.strDrinkThumb} alt={drink.strDrink} width="25%" height="auto"></img>
          <h5>{drink.strInstructions}</h5>
          <Button variant="primary">Button</Button>
        </div>
      </div>
    </div>
  )
}

export default DrinkDetails;