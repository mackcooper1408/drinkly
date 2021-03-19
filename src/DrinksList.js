import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import { CSSTransition, TransitionGroup } from "react-transition-group";
import { getDrinksFromAPI } from "./actions/drinks";
import { Frame } from "framer";
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
            <Frame
              position="relative"
              animate={{ x: [-(i * 50), 0], opacity: [0, 1] }}
              size="100%"
              whileHover={{ scale: 1.05 }}
              background="transparent"
              key={d.idDrink}
            >
              <Link
                as="li"
                className="list-group-item list-group-item-action my-1 text-decoration-none"
                to={`/drinks/${d.idDrink}`}
              >
                {d.strDrink}
              </Link>
            </Frame>
          ))}
      </ul>
    </div>
  );
}

export default DrinksList;
