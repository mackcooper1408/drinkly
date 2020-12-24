import React from "react";
import { Navbar } from "react-bootstrap";
import "./NavBar.css";

function NavBar() {
  return (
    <Navbar className="NavBar" bg="light">
      <Navbar.Brand href="/">Drinks Up!</Navbar.Brand>
      {/* <Nav className="ml-auto">
        <Nav.Link>jj</Nav.Link>
        <Nav.Link>hh</Nav.Link>
      </Nav> */}
    </Navbar>
  );
}

export default NavBar;