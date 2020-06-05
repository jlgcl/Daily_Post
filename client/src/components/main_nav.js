import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import styled from "styled-components";

const Styles = styled.div`
  .navbar {
    height: 50px;
  }
  .navbar 
`;

export const MainNav = () => (
  <Styles>
    <Navbar bg="dark" variant="dark">
      <Nav className="nav-fill w-100">
        <Nav.Link href="http://localhost:8080/posts">All Posts</Nav.Link>
        <Nav.Link href="http://localhost:8080/politics">Politics</Nav.Link>
        <Nav.Link href="http://localhost:8080/economics">Economics</Nav.Link>
        <Nav.Link href="http://localhost:8080/business">Business</Nav.Link>
        <Nav.Link href="http://localhost:8080/technology">Technology</Nav.Link>
        <Nav.Link href="http://localhost:8080/entertainment">
          Entertainment
        </Nav.Link>
      </Nav>
    </Navbar>
  </Styles>
);

export default MainNav;
