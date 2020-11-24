import React from "react";
import styled from "styled-components";

const Styles = styled.div`
  .signup_container {
    min-height: 70vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
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
    margin-top: 30px;
  }
  .form-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: white;
    color: black;
    margin-top: 20px;
    height: 480px;
    width: 400px;
    border: 1px solid green;
    border-radius: 5px;
    padding: 30px;
  }
  .button {
    margin-top: 50px;
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
  h7 {
    margin-top: 20px;
  }
`;

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      confirmPassword: "",
      status: "",
    };
    this.handleUser = this.handleUser.bind(this);
    this.handlePass = this.handlePass.bind(this);
    this.handlePassConfirm = this.handlePassConfirm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handlePassConfirm(e) {
    let val = e.target.value;
    this.setState({
      confirmPassword: val,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    let bodySend = {
      username: this.state.username,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
    };
    if (this.state.password !== this.state.confirmPassword) {
      window.location.href = "/signup";
    } else {
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
        body: JSON.stringify(bodySend),
      };

      try {
        let signup = await fetch("/signup", setting);
        let signupRes = await signup.json();
        console.log(signupRes);

        if (signupRes === "username already exists") {
          this.setState({
            status: signupRes,
          });
        }

        if (signupRes !== "username already exists") {
          window.location.href = "/";
        }
      } catch (err) {
        this.setState({
          status: "signup error",
        });
      }
    }
  }

  render() {
    let statusMsg = this.state.status;
    if (this.state.password !== this.state.confirmPassword) {
      statusMsg = "- passwords do not match";
    }
    if (this.state.username == null) {
      statusMsg = "- enter a username";
    }

    return (
      <Styles>
        <div className="signup_container">
          <div className="head">
            <img
              src="https://cdn.onlinewebfonts.com/svg/img_509043.png"
              style={{ height: "50px", width: "50px" }}
            ></img>
            <h5 style={{ marginTop: "10px", marginLeft: "20px" }}>
              Signup to Daily Blogs {statusMsg}
            </h5>
          </div>
          <div className="form-container">
            <h7>Sign up</h7>
            <form onSubmit={this.handleSubmit} style={{ marginTop: "40px" }}>
              <label for="username">Username:&nbsp;</label>
              <br></br>
              <input
                type="text"
                name="username"
                onChange={this.handleUser}
              ></input>
              <br></br>
              <label for="password">Password:&nbsp;&nbsp;</label>
              <br></br>
              <input
                type="password"
                name="password"
                onChange={this.handlePass}
              ></input>
              <br></br>
              <label for="confirmPassword">Confirm Password:&nbsp;&nbsp;</label>
              <br></br>
              <input
                type="password"
                name="confirmPassword"
                onChange={this.handlePassConfirm}
              ></input>
              <br></br>
              <button className="button">Sign Up</button>
            </form>
          </div>
        </div>
      </Styles>
    );
  }
}

export default Signup;
