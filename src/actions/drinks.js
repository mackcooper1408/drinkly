import DrinkApi from "../api";
import { GET_DRINKS } from "./actionTypes";

export function getDrinksFromAPI(ingredient) {
  console.log("IN ACTION CREATOR");
  return async function (dispatch) {
    try {
      const result = await DrinkApi.getDrinksByIngredient(ingredient);
      dispatch(gotDrinks(result));
    } catch (err) {}
  };
}

function gotDrinks(drinks) {
  return {
    type: GET_DRINKS,
    payload: drinks,
  };
}
