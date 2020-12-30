import {
  ADD_SELECTIONS,
  LOAD_INGREDIENTS,
  REMOVE_SELECTION,
} from "./actionTypes";
import DrinkApi from "../api";

/** load list of ingredients from cocktail API */
export function getIngredientsFromAPI() {
  return async function (dispatch) {
    try {
      const result = await DrinkApi.getIngredientList();
      dispatch(gotIngredients(result));
    } catch (err) {
      // alert(err);
    }
  };
}

export function addIngredientToSelections(ingredient) {
  console.log("INGREDIENTS");
  return async function (dispatch) {
    try {
      dispatch(addSelection(ingredient));
    } catch (err) {
      // alert(err);
    }
  };
}

export function removeIngredientFromSelections(ingredient) {
  console.log("INGREDIENTS");
  return async function (dispatch) {
    try {
      dispatch(removeSelection(ingredient));
    } catch (err) {
      // alert(err);
    }
  };
}

function gotIngredients(ingredients) {
  return { type: LOAD_INGREDIENTS, payload: ingredients };
}

function addSelection(ingredient) {
  return { type: ADD_SELECTIONS, payload: ingredient };
}

function removeSelection(ingredient) {
  return { type: REMOVE_SELECTION, payload: ingredient };
}
