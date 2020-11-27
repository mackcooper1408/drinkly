import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import DrinkApi from "./api";
import "./CocktailPicker.css";

function CocktailPicker({ updateList }) {
  const [ingredients, setIngredients] = useState([]);
  const [drinkList, setDrinkList] = useState([]);
  const [pageNum, setPageNum] = useState(1);

  useEffect(() => {
    async function getIngredients() {
      const result = await DrinkApi.getIngredientList();

      setIngredients(result);
    }
    getIngredients();
  }, []);

  async function updateDrinks(value) {
    const result = await DrinkApi.getDrinksByIngredient(value);

    const drinkListMap = new Map();
    drinkList.map(drink => drinkListMap.set(drink.idDrink, drink));
    console.log("MAP", drinkListMap);
    console.log("RESULT", result);

    let drinks;
    if (drinkList.length > 0) drinks = result.filter(r => drinkListMap.has(r.idDrink));
    else drinks = result;
    console.log("drinks", drinks);

    if (drinks.length !== 0) {
      setDrinkList(drinks);
      setPageNum(num => num + 1);
    } else {
      alert("No matching cocktails!");
      resetAll();
    }
  }

  async function handleChange(evt) {
    const { value } = evt.target;
    
    await updateDrinks(value);
  }

  async function handleCardClick(evt) {
    const card = evt.target;
    const value = card.innerText.replace("?", "");

    await updateDrinks(value);
  }

  function showDrinks() {
    updateList(drinkList);
  }

  function resetAll() {
    setDrinkList([]);
    setPageNum(1);
  }

  return (
    <div>
      {pageNum === 1 &&
        <div className="my-2">
          <h2>What Alcohol Do You Have?</h2>
          <div className="row justify-content-around">
            <Card className="CocktailPicker-Card col-5 my-1" onClick={handleCardClick}>
              <Card.Text>Gin?</Card.Text>
            </Card>
            <Card className="CocktailPicker-Card col-5 my-1" onClick={handleCardClick}>
              <Card.Text>Vodka?</Card.Text>
            </Card>
            <Card className="CocktailPicker-Card col-5 my-1" onClick={handleCardClick}>
              <Card.Text>Tequila?</Card.Text>
            </Card>
            <Card className="CocktailPicker-Card col-5 my-1">
              <Card.Text>Other?</Card.Text>
              <input type="text" list="ingredients" name="ingredient" onChange={handleChange} />
              <datalist id="ingredients">
                <option value="">...</option>
                {ingredients.map(i => (
                  <option key={i.strIngredient1} value={i.strIngredient1}>{i.strIngredient1}</option>
                ))}
              </datalist>
            </Card>
          </div>
        </div>}
      {pageNum === 2 &&
        <div className="my-2">
          <h2>Do You Have Any Mixers?</h2>
          <div className="row justify-content-around">
            <Card className="CocktailPicker-Card col-5 my-1" onClick={handleCardClick}>
              <Card.Text>Lemon?</Card.Text>
            </Card>
            <Card className="CocktailPicker-Card col-5 my-1" onClick={handleCardClick}>
              <Card.Text>Ginger?</Card.Text>
            </Card>
            <Card className="CocktailPicker-Card col-5 my-1" onClick={handleCardClick}>
              <Card.Text>Sprite?</Card.Text>
            </Card>
            <Card className="CocktailPicker-Card col-5 my-1">
              <Card.Text>Other?</Card.Text>
              <input type="text" list="ingredients" name="ingredient" onChange={handleChange} />
              <datalist id="ingredients">
                <option value="">...</option>
                {ingredients.map(i => (
                  <option key={i.strIngredient1} value={i.strIngredient1}>{i.strIngredient1}</option>
                ))}
              </datalist>
            </Card>
            <Card className="CocktailPicker-Card col-5 my-1" onClick={showDrinks}>
              <Card.Text>Doesn't Matter</Card.Text>
            </Card>
          </div>
        </div>
      }
      <div>
        <Button className="mt-4" variant="danger" onClick={resetAll}>Start Over</Button>
      </div>
      {pageNum === 3 &&
        <Button className="mt-4" onClick={showDrinks}>Get My Drinks!</Button>}
    </div>
  )
}

export default CocktailPicker;