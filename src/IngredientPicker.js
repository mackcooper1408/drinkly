import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addIngredientToSelections,
  getIngredientsFromAPI,
} from "./actions/ingredients";
import SearchBar from "./SearchBar";

/**
 * Displays a subset of ingredients to choose from
 */
function IngredientPicker() {
  const ingredients = useSelector((store) => store.ingredients);
  const [searched, setSearched] = useState([]);
  const slicedIngredients =
    searched.length > 0 ? searched.slice(0, 10) : ingredients.slice(0, 10);

  const dispatch = useDispatch();

  useEffect(() => {
    if (ingredients.length === 0) dispatch(getIngredientsFromAPI());
  }, [dispatch, ingredients]);

  /**
   * update selections list and update drinks list with
   * drinks matching selected ingredients
   */
  function handleClick(evt) {
    const val = evt.target.innerText;

    // update selections in redux store
    dispatch(addIngredientToSelections(val));
  }

  /**
   * filters the list of ingredients by user input in search bar
   * @param {string} term search term from search bar component
   */
  function search(term) {
    if (term.length > 0) {
      const newIngredients = ingredients.filter((i) =>
        i.strIngredient1.toLowerCase().includes(term.toLowerCase())
      );
      setSearched(newIngredients);
    }
  }

  if (ingredients.length === 0) return <div>LOADING...</div>;

  return (
    <div className="container col-sm-12 col-md-6">
      {/* <h3>
        <i>Pick Your Ingredients</i>
      </h3> */}
      <SearchBar search={search} placeholder="Search Ingredients..." />
      {slicedIngredients.map((ingredient) => (
        <button
          className="btn btn-sm btn-success m-2"
          key={ingredient.strIngredient1}
          onClick={handleClick}
        >
          {ingredient.strIngredient1}
        </button>
      ))}
      <hr className="border-secondary" />
    </div>
  );
}

export default IngredientPicker;
