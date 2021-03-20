import { Frame } from "framer";
import React from "react";
import { Link } from "react-router-dom";

function DrinkItem({ drink, idx }) {
  return (
    <Frame
      position="relative"
      animate={{ x: [-(idx * 50), 0], opacity: [0, 1] }}
      size="100%"
      whileHover={{ scale: 1.05 }}
      background="transparent"
    >
      <Link
        as="li"
        className="list-group-item list-group-item-action my-1 text-decoration-none"
        to={`/drinks/${drink.idDrink}`}
      >
        {drink.strDrink}
      </Link>
    </Frame>
  );
}

export default DrinkItem;
