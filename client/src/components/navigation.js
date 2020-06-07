import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import styled from "styled-components";

const Styles = styled.div`
  .navbar {
    height: 30px;
  }
`;

export const NavigationBar = () => (
  <Styles>
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#">Daily Blog</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link href="http://localhost:3000/">Home</Nav.Link>
          <Nav.Link href="http://localhost:3000/about">About</Nav.Link>
          <Nav.Link href="http://localhost:3000/Contact">Contact</Nav.Link>
          <Nav.Link
            href="http://localhost:3000/login"
            style={{ color: "blue" }}
          >
            Log In
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </Styles>
);
