import React from "react";
import styled from "styled-components";

const Styles = styled.div`
  body {
    font-family: arial;
    font-size: 13px;
    background: #eceef1;
  }
  .head {
    display: flex;
    flex-direction: row;
    margin-left: 40%;
    margin-top: 30px;
  }
  .form-container {
    display: inline-block;
    background: white;
    color: black;
    margin-left: 40%;
    width: 300px;
    height: 500px;
    border: 1px solid green;
    border-radius: 5px;
    padding: 10px;
  }
`;

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Styles>
        <div>
          <div className="head">
            <img
              src="https://f1.pngfuel.com/png/169/1023/715/login-logo-user-users-group-customer-education-button-typeface-credential-png-clip-art.png"
              style={{ height: "50px", width: "70px" }}
            ></img>
            <h5>Login</h5>
          </div>
          <div className="form-container">
            <h7>Enter your username and Password</h7>
            <form>
              <label for="username">Username:</label>
              <input type="text" name="username"></input>
              <label for="password">Password:</label>
              <input type="password" name="password"></input>
              <button type="primary">Login</button>
            </form>
          </div>
        </div>
      </Styles>
    );
  }
}

export default Login;
