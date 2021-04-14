import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./Home.css";

function Home() {
  return (
    <div className="Home d-flex flex-column text-lg">
      <span className="Home-welcome py-2">Welcome to Drinkly!</span>
      <Link to="/drinks">
        <Button variant="outline-light" size="lg">
          Make Your Cocktail!
        </Button>
      </Link>
    </div>
  );
}

export default Home;
