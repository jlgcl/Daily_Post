import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import styled from "styled-components";

const Styles = styled.div`
  .sticky {
    position: fixed;
    top: 0;
    width: 100%;
  }
`;
//styled components for flex-box doesn't work for React Bootstrap nav

export const MainNav = () => (
  <Styles>
    <Navbar bg="dark" variant="dark" style={{ height: "50px" }}>
      <Nav
        className="nav-fill w-100"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignContent: "center",
          marginTop: "-8px",
        }}
      >
        <Nav.Link href="http://localhost:8080/posts">All Posts</Nav.Link>
        <Nav.Link href="http://localhost:8080/politics">Politics</Nav.Link>
        <Nav.Link href="http://localhost:8080/economics">Economics</Nav.Link>
        <Nav.Link href="http://localhost:8080/business">Business</Nav.Link>
        <Nav.Link href="http://localhost:8080/technology">Technology</Nav.Link>
      </Nav>
    </Navbar>
  </Styles>
);

export default MainNav;
