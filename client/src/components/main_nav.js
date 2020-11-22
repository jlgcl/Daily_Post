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
    <Navbar
      bg="white"
      variant="light"
      style={{
        height: "40px",
        borderTop: "0.3px solid #ebebeb",
        borderBottom: "0.3px solid",
      }}
    >
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
        <Nav.Link href="http://localhost:3000/posts" style={{ color: "black" }}>
          All Posts
        </Nav.Link>
        <Nav.Link
          href="http://localhost:3000/politics"
          style={{ color: "black" }}
        >
          Politics
        </Nav.Link>
        <Nav.Link
          href="http://localhost:3000/economics"
          style={{ color: "black" }}
        >
          Economics
        </Nav.Link>
        <Nav.Link
          href="http://localhost:3000/business"
          style={{ color: "black" }}
        >
          Business
        </Nav.Link>
        <Nav.Link
          href="http://localhost:3000/technology"
          style={{ color: "black" }}
        >
          Technology
        </Nav.Link>
      </Nav>
    </Navbar>
  </Styles>
);

export default MainNav;
