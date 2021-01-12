import {
  ADD_SELECTIONS,
  GET_DRINKS,
  LOAD_INGREDIENTS,
  REMOVE_SELECTION,
} from "./actions/actionTypes";

const INITIAL_STATE = {
  drinks: [],
  ingredients: [],
  selections: [],
};

export default function rootReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOAD_INGREDIENTS:
      return {
        ...state,
        ingredients: action.payload,
      };
    case GET_DRINKS:
      return {
        ...state,
        drinks: action.payload,
      };
    case ADD_SELECTIONS:
      if (state.selections.includes(action.payload)) return state;
      return {
        ...state,
        selections: [...state.selections, action.payload],
      };
    case REMOVE_SELECTION:
      const updatedSelections = state.selections.filter(
        (s) => s !== action.payload
      );
      return {
        ...state,
        selections: updatedSelections,
      };
    default:
      return state;
  }
}
