import React from "react";
import styled from "styled-components";

const Styles = styled.div`
  .login_container {
    min-height: 70vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  body {
    font-family: arial;
    font-size: 13px;
    background: #eceef1;
  }

  .head {
    font-family: loginFont;
    display: flex;
    flex-direction: row;
    margin-top: 50px;
  }

  .form-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: white;
    color: black;
    margin-top: 20px;
    margin-bottom: 100px;
    width: 500px;
    height: 260px;
    border: 1px solid green;
    border-radius: 5px;
    padding: 30px;
  }
  .button {
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: 37%;
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

  render() {
    return (
      <Styles>
        <div className="login_container">
          <div className="head">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbh4Aa8IpQ_mptRwguGDj7PlZCSiQBwMrVlA&usqp=CAU"
              style={{ height: "50px", width: "50px" }}
            ></img>
            <h5 style={{ marginTop: "10px", marginLeft: "40px" }}>Login</h5>
          </div>
          <div className="form-container">
            <h7 style={{ marginTop: "20px", marginBottom: "20px" }}>
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
