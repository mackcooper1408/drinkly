import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { getDrinksFromAPI } from "./actions/drinks";
import Slide from "react-reveal/Slide";
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
  }, [dispatch, selections]);

  // display message when api returns "None Found" from drink search
  if (drinks === "None Found")
    return (
      <div className="my-2">No Drinks Found With These Ingredients...</div>
    );

  return (
    <div>
      <TransitionGroup component="ul" className="list-group my-4">
        {drinks &&
          drinks.map((d) => (
            <CSSTransition timeout={600} classNames="item" key={d.idDrink}>
              <li className="list-group-item">
                <Link to={`/drinks/${d.idDrink}`}>{d.strDrink}</Link>
              </li>
            </CSSTransition>
          ))}
      </TransitionGroup>
    </div>
    // <div>
    //   <ul className="list-group my-4">
    //     {drinks &&
    //       drinks.map((d) => (
    //         <Slide left>
    //           <li className="list-group-item">
    //             <Link to={`/drinks/${d.idDrink}`}>{d.strDrink}</Link>
    //           </li>
    //         </Slide>
    //       ))}
    //   </ul>
    // </div>
  );
}

export default DrinksList;
