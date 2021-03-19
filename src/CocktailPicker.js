import React from "react";
import DrinksList from "./DrinksList";
import IngredientPicker from "./IngredientPicker";
import SelectedIngredients from "./SelectedIngredients";

/** displays list of ingredients (IngredientPicker)
 *  and resulting cocktails (DrinksList) once an ingredient has been selected
 */
function CocktailPicker() {
  return (
    <div className="CocktailPicker w-100 px-4">
      <IngredientPicker />
      <SelectedIngredients />
      <DrinksList />
    </div>
  );
}

export default CocktailPicker;
