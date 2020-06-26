import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import styled from "styled-components";

const Styles = styled.div`
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
    if (userStatus === "not logged in") {
      status = "Log In";
      logURL = "http://localhost:3000/login";
      signUp = "http://localhost:3000/signup";
      logStatus = "Sign Up";
      unpubPosts = "";
      unpublished = "";
    }
    if (userStatus !== "not logged in") {
      status = "Log Out";
      logURL = "http://localhost:3000/logout";
      signUp = "#";
      logStatus = userStatus;
      unpubPosts = "Unpublished Posts";
      unpublished = "http://localhost:3000/unpublished";
    }

    return (
      <Styles>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="http://localhost:3000/">Daily Blog</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link href="http://localhost:3000/users">Users</Nav.Link>
              <Nav.Link href={unpublished} style={{ color: "teal" }}>
                {unpubPosts}
              </Nav.Link>
              <Nav.Link href="http://localhost:3000/">Home</Nav.Link>
              <Nav.Link href="http://localhost:3000/about">About</Nav.Link>
              <Nav.Link href="http://localhost:3000/Contact">Contact</Nav.Link>
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
