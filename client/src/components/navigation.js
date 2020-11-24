import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import styled from "styled-components";

const Styles = styled.div`
  @font-face {
    font-family: Canterbury;
    src: url("../Assets/Canterbury.ttf");
  }

  .nav_header {
    font: 20px Canterbury;
  }

  .navbar {
    height: 30px;
    width: 100%;
  }
`;

class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "not logged in",
    };
  }

  async componentDidMount() {
    const settings = {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
    };
    try {
      let log = await fetch("/user_data", settings);
      let logRes = await log.json();
      this.setState({
        username: logRes,
      });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const userStatus = this.state.username;
    let status;
    let logStatus;
    let logURL;
    let signUp;
    let unpubPosts;
    let unpublished;
    let users;
    let usersLink;
    if (userStatus === "not logged in") {
      status = "Log In";
      logURL = "/login";
      signUp = "/signup";
      logStatus = "Sign Up";
      unpubPosts = "";
      unpublished = "";
      usersLink = null;
      users = "";
    }
    if (userStatus !== "not logged in") {
      status = "Log Out";
      logURL = "/logout";
      signUp = "#";
      logStatus = userStatus;
      unpubPosts = "Unpublished Posts";
      unpublished = "/unpublished";
      usersLink = "/users";
      users = "Users";
    }

    return (
      <Styles>
        <Navbar className="nav_parent" bg="light" expand="lg">
          <Navbar.Brand className="nav_header" href="/">
            Daily Post
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link href={usersLink}>{users}</Nav.Link>
              <Nav.Link href={unpublished} style={{ color: "teal" }}>
                {unpubPosts}
              </Nav.Link>
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
              <Nav.Link href="/contact">Contact</Nav.Link>
              <Nav.Link href={logURL} style={{ color: "blue" }}>
                {status}
              </Nav.Link>
              <Nav.Link href={signUp} style={{ color: "gray" }}>
                {logStatus}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Styles>
    );
  }
}

export default NavigationBar;
