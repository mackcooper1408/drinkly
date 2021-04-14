import React from "react";
import { Navbar } from "react-bootstrap";

import "./NavBar.css";

function NavBar() {
  return (
    <Navbar className="NavBar" bg="light">
      <Navbar.Brand className="ml-2" href="/">Drink.ly</Navbar.Brand>
    </Navbar>
  );
}

export default NavBar;