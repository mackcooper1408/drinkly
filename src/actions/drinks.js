import DrinkApi from "../api/api";
import { GET_DRINKS } from "./actionTypes";

export function getDrinksFromAPI(ingredient) {
  console.log("DRINKS")
  return async function (dispatch) {
    try {
      let result;
      if (ingredient) {
        result = await DrinkApi.getDrinksByIngredient(ingredient);
      } else {
        result = await DrinkApi.getPopularDrinks();
      }
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
