import React from "react";
import { Link } from "react-router-dom";

/** Displays list of drinks from selected ingredients.
 *  Each drink links to a drink detail page
 */
function DrinksList({ drinks }) {
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
