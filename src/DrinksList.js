import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDrinksFromAPI } from "./actions/drinks";

/** Displays list of drinks from selected ingredients.
 *  Each drink links to a drink detail page */
function DrinksList() {
  const drinks = useSelector((store) => store.drinks);

  const dispatch = useDispatch();

  // update store with popular drinks from API if no search has been made yet
  useEffect(() => {
    if (drinks.length === 0) dispatch(getDrinksFromAPI());
  }, [dispatch, drinks]);

  // display message when api returns "None Found" from drink search
  if (drinks === "None Found")
    return (
      <div className="my-2">No Drinks Found With These Ingredients...</div>
    );

  return (
    <div>
      <ul className="list-group my-4">
        {drinks &&
          drinks.map((d) => (
            <li className="list-group-item" key={d.idDrink}>
              <Link to={`/drinks/${d.idDrink}`}>{d.strDrink}</Link>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default DrinksList;
