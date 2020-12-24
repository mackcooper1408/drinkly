import { LOAD_INGREDIENTS } from "./actionTypes";
import DrinkApi from "../api";

/** load list of ingredients from cocktail API */
export function getIngredientsFromAPI() {
  return async function(dispatch) {
    try {
      const result = await DrinkApi.getIngredientList();
      dispatch(gotIngredients(result));
    } catch (err) {
      // alert(err);
    }
  }
}

function gotIngredients(ingredients) {
  return { type: LOAD_INGREDIENTS, payload: ingredients};
}