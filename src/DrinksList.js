import React, { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import DrinkApi from "./api";
import SearchForm from "./SearchForm";


function DrinksList() {
  const [drinks, setDrinks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // const history = useHistory();

  // useEffect(() => {
  //   async function getDrinks() {
  //     setDrinks(result.data.drinks);
  //   }
  //   getDrinks();
  // }, []);

  async function handleSubmit(evt) {
    evt.preventDefault();
    const result = await DrinkApi.getDrinksByIngredient(searchTerm);

    setDrinks(result);
    setSearchTerm("");
  }

  function handleChange(evt) {
    const { value } = evt.target;
    setSearchTerm(value);
  }

  return (
    <div>
      <SearchForm searchTerm={searchTerm} handleChange={handleChange} handleSubmit={handleSubmit} />
      <ListGroup>
        {drinks && drinks.map(d => (
          <ListGroup.Item key={d.idDrink}>
            <Link to={`/drinks/${d.idDrink}`}>{d.strDrink}</Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default DrinksList;