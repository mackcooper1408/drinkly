import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LazyLoad from "react-lazyload";

import { getDrinksFromAPI } from "actions/drinks";
import DrinkItem from "containers/DrinkItem";

import "./DrinksList.css";

/** Displays list of drinks from selected ingredients.
 *  Each drink links to a drink detail page */
function DrinksList() {
  const drinks = useSelector((store) => store.drinks);
  const selections = useSelector((store) => store.selections);

  const dispatch = useDispatch();

  // update store with popular drinks from API if no search has been made yet
  useEffect(() => {
    if (drinks.length === 0 || selections.length === 0)
      dispatch(getDrinksFromAPI());
    else if (selections.length > 0)
      dispatch(getDrinksFromAPI(selections.join(",")));
  }, [dispatch, selections, drinks.length]);

  // display message when api returns "None Found" from drink search
  if (drinks === "None Found")
    return (
      <div className="my-2">No Drinks Found With These Ingredients...</div>
    );

  return (
    <div>
      <ul className="list-group my-4">
        {drinks &&
          drinks.map((d, i) => (
            <LazyLoad key={d.idDrink} height={50} offset={100}>
              <DrinkItem drink={d} idx={i} />
            </LazyLoad>
          ))}
      </ul>
    </div>
  );
}

export default DrinksList;
