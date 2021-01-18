import React from "react";
import { Navbar, NavDropdown, Nav } from "react-bootstrap";
import CustomNavLink from "../NavLink";

import "./styles.scss";

const NavBar = () => {
  return (
    <>
      <Navbar expand="lg">
        <Navbar.Brand as={CustomNavLink} to="/">
          <img
            src="https://docs.edtechhub.org/static/dist/images/logo.png"
            alt=""
            className="logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="m-auto">
            <Nav.Link as={CustomNavLink} to="/" className="px-3">
              HOME
            </Nav.Link>
            <NavDropdown
              title="ABOUT US"
              id="basic-nav-dropdown"
              className="px-3"
            >
              <NavDropdown.Item as={CustomNavLink} to="/about/us">
                About EdTech Hub
              </NavDropdown.Item>
              <NavDropdown.Item as={CustomNavLink} to="/about/team">
                Team
              </NavDropdown.Item>
              <NavDropdown.Item as={CustomNavLink} to="/about/advisors">
                Advisors
              </NavDropdown.Item>
              <NavDropdown.Item
                as={CustomNavLink}
                to="/about/specialist-network"
              >
                Specialist Network
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="TOOLS" id="basic-nav-dropdown" className="px-3">
              <NavDropdown.Item as={CustomNavLink} to="/tools">
                EdTech Tools Database
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown
              title="EVIDENCE"
              id="basic-nav-dropdown"
              className="px-3"
            >
              <NavDropdown.Item as={CustomNavLink} to="/library">
                Evidence Library
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={CustomNavLink} to="/blog" className="px-3">
              BLOG
            </Nav.Link>

            <Nav.Link as={CustomNavLink} to="/contact-us" className="px-3">
              CONTACT US
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <hr />
    </>
  );
};

export default NavBar;
