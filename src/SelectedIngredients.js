import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeIngredientFromSelections } from "./actions/ingredients";

/**
 * display selections from redux store
 */
function SelectedIngredients() {
  const ingredients = useSelector((s) => s.selections);

  const dispatch = useDispatch();

  /**
   * remove clicked selection from redux store, causing drink list to refresh
   */
  function handleClick(evt) {
    const val = evt.target.id;

    // remove selection from redux store
    dispatch(removeIngredientFromSelections(val));
  }

  return (
    <div>
      {ingredients.map((i) => (
        <button
          className="btn btn btn-danger m-2"
          key={i}
          id={i}
          onClick={handleClick}
        >
          <FontAwesomeIcon icon={faMinusCircle} /> {i}
        </button>
      ))}
    </div>
  );
}

export default SelectedIngredients;
