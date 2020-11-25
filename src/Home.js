import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="Home">
      <Button><Link to="/drinks">Make Your Cocktail!</Link></Button>
    </div>
  )
}

export default Home;