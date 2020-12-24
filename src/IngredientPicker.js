import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDrinksFromAPI } from "./actions/drinks";
import { getIngredientsFromAPI } from "./actions/ingredients";

/** Displays a subset of ingredients to chose from */
function IngredientPicker() {
  // TODO: add ability to select more options
  const ingredients = useSelector((store) => store.ingredients);
  const slicedIngredients = ingredients.slice(0, 10);

  const dispatch = useDispatch();

  useEffect(() => {
    if (ingredients.length === 0) dispatch(getIngredientsFromAPI());
  }, [dispatch, ingredients]);

  // updates drinks in redux store depending on ingredient selections
  function updateDrinks(evt) {
    // TODO: fix to filter listinstead of change entire list
    const val = evt.target.innerText;
    dispatch(getDrinksFromAPI(val));
  }

  if (ingredients.length === 0) return <div>LOADING...</div>;

  return (
    <div>
      {slicedIngredients.map((ingredient) => (
        <button className="btn btn-sm btn-success m-2" onClick={updateDrinks}>
          {ingredient.strIngredient1}
        </button>
      ))}
    </div>
  );
}

export default IngredientPicker;
