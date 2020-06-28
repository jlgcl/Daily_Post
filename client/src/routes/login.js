import React from "react";
import styled from "styled-components";

const Styles = styled.div`
  body {
    font-family: arial;
    font-size: 13px;
    background: #eceef1;
  }
  .head {
    font-family: loginFont;
    display: flex;
    flex-direction: row;
    margin-left: 42%;
    margin-top: 30px;
  }
  .form-container {
    display: inline-block;
    background: white;
    color: black;
    margin-left: 33%;
    margin-top: 20px;
    margin-bottom: 100px;
    width: 500px;
    height: 220px;
    border: 1px solid green;
    border-radius: 5px;
    padding: 10px;
  }
  input {
    margin-top: 20px;
    margin-left: 20px;
  }
  label {
    margin-left: 35px;
  }
  .button {
    margin-top: 13px;
    margin-left: 220px;
    border: 1px solid black;
    padding: 5px 10px;
    border-radius: 5px;
    background: white;
  }
  .button:hover {
    background: black;
    color: white;
  }
`;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUser = this.handleUser.bind(this);
    this.handlePass = this.handlePass.bind(this);
  }

  handleUser(e) {
    let val = e.target.value;
    this.setState({
      username: val,
    });
  }
  handlePass(e) {
    let val = e.target.value;
    this.setState({
      password: val,
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    const bodyReq = {
      username: this.state.username,
      password: this.state.password,
    };

    const setting = {
      method: "POST",
      redirect: "follow",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, POST, OPTIONS, PUT, PATCH, DELETE",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept, Authorization",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify(bodyReq),
    };

    fetch("/login", setting)
      .then((res) =>
        res.json().then((data) => ({
          data: data,
          status: res.status,
        }))
      )
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        window.location.href = "/";
      });
  }

  //   const { createProxyMiddleware } = require("http-proxy-middleware");
  // module.exports = function (app) {
  //   app.use(
  //     "/api",
  //     createProxyMiddleware({
  //       target: "http://localhost:8080",
  //       changeOrigin: true,
  //     })
  //   );
  // };

  render() {
    return (
      <Styles>
        <div>
          <div className="head">
            <img
              src="https://banner2.cleanpng.com/20180418/gre/kisspng-human-resources-login-management-information-payro-track-5ad7cda3586cb1.5605091515240923233622.jpg"
              style={{ height: "50px", width: "70px" }}
            ></img>
            <h5 style={{ marginTop: "10px", marginLeft: "40px" }}>Login</h5>
          </div>
          <div className="form-container">
            <h7 style={{ marginTop: "20px", marginLeft: "25%" }}>
              Enter your username and Password
            </h7>
            <form onSubmit={this.handleSubmit}>
              <label for="username">Username:&nbsp;</label>
              <input
                type="text"
                name="username"
                onChange={this.handleUser}
              ></input>
              <br></br>
              <label for="password">Password:&nbsp;&nbsp;</label>
              <input
                type="password"
                name="password"
                onChange={this.handlePass}
              ></input>
              <br></br>
              <button className="button">Login</button>
            </form>
          </div>
        </div>
      </Styles>
    );
  }
}

export default Login;
