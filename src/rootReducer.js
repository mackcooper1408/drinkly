import { GET_DRINKS, LOAD_INGREDIENTS } from "./actions/actionTypes";


const INITIAL_STATE = {
  drinks: [],
  ingredients: [],
  selections: [],
};

export default function rootReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case LOAD_INGREDIENTS:
      return {
        ...state,
        ingredients: action.payload
      }
    case GET_DRINKS:
      return {
        ...state,
        drinks: action.payload
      }
      default:
        return state;
  }
}
