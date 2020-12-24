import React from "react";
import { useSelector } from "react-redux";
import DrinksList from "./DrinksList";
import IngredientPicker from "./IngredientPicker";

/** displays list of ingredients (IngredientPicker)
 *  and resulting cocktails (DrinksList) once an ingredient has been selected
 */
function CocktailPicker() {
  const drinks = useSelector((store) => store.drinks);

  return (
    <div>
      <IngredientPicker />
      <DrinksList drinks={drinks} />
    </div>
  );
}

export default CocktailPicker;
