import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDrinksFromAPI } from "./actions/drinks";
import { getIngredientsFromAPI } from "./actions/ingredients";
import SearchBar from "./SearchBar";

/** Displays a subset of ingredients to chose from */
function IngredientPicker() {
  const ingredients = useSelector((store) => store.ingredients);
  const [searched, setSearched] = useState(ingredients);
  const slicedIngredients =
    searched.length > 0 ? searched.slice(0, 10) : ingredients.slice(0, 10);

  const dispatch = useDispatch();

  useEffect(() => {
    if (ingredients.length === 0) dispatch(getIngredientsFromAPI());
  }, [dispatch, ingredients]);

  // updates drinks in redux store depending on ingredient selections
  function updateDrinks(evt) {
    // TODO: fix to filter list instead of change entire list
    const val = evt.target.innerText;
    dispatch(getDrinksFromAPI(val));
  }

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
      <h3><i>Pick Your Ingredients</i></h3>
      <SearchBar search={search} />
      {slicedIngredients.map((ingredient) => (
        <button
          className="btn btn-sm btn-success m-2"
          key={ingredient.strIngredient1}
          onClick={updateDrinks}
        >
          {ingredient.strIngredient1}
        </button>
      ))}
    </div>
  );
}

export default IngredientPicker;
