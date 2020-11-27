import React, { useState } from "react";
import { Button, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import CocktailPicker from "./CocktailPicker";


function DrinksList() {
  const [drinks, setDrinks] = useState([]);


  function updateList(drinkData) {
    setDrinks(drinkData);
  }

  return (
    <div>
      {drinks && drinks.length > 0 ? 
      <ListGroup className="my-4" as="ul">
        <Button className="my-2" onClick={() => setDrinks([])}>Reset</Button>
        {drinks && drinks.map(d => (
          <ListGroup.Item as="li" key={d.idDrink}>
            <Link to={`/drinks/${d.idDrink}`}>{d.strDrink}</Link>
          </ListGroup.Item>
        ))}
      </ListGroup> :
      <CocktailPicker updateList={updateList} />}
    </div>
  );
}

export default DrinksList;