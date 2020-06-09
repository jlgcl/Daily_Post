import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import styled from "styled-components";

const Styles = styled.div`
  .navbar {
    height: 30px;
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
    let logURL;
    if (userStatus == "not logged in") {
      status = "Log In";
      logURL = "http://localhost:3000/login";
    }
    if (userStatus !== "not logged in") {
      status = "Log Out";
      logURL = "http://localhost:3000/logout";
    }

    return (
      <Styles>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#">Daily Blog</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link href="http://localhost:3000/">Home</Nav.Link>
              <Nav.Link href="http://localhost:3000/about">About</Nav.Link>
              <Nav.Link href="http://localhost:3000/Contact">Contact</Nav.Link>
              <Nav.Link href={logURL} style={{ color: "blue" }}>
                {status}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Styles>
    );
  }
}

export default NavigationBar;
