import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import styled from "styled-components";

const Styles = styled.div`
  .user_list {
    margin-top: 50px;
    margin-left: 50px;
    min-height: 70vh;
  }
  .user {
    padding-top: 10px;
  }
`;

class Users extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      token: "",
      users: [
        {
          uid: "",
          username: "",
        },
      ],
    };
    this.fetchUsers = this.fetchUsers.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  componentDidMount() {
    this.fetchUsers();
  }

  async fetchUsers() {
    const token = localStorage.getItem("token");

    const bearerToken = "bearer" + token;
    try {
      let userReq = await fetch("/users", {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `bearer ${token}`,
        },
      });
      let userRes = await userReq.json();
      this.setState({
        users: userRes,
      });
    } catch (err) {
      console.log(err.message);
    }
  }
  async deleteUser(e) {
    const userId = e.target.id;
    const token = localStorage.getItem("token");

    const bearerToken = "bearer" + token;
    try {
      let deleteReq = await fetch(`/users/${userId}/delete`, {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `bearer ${token}`,
        },
      });
      window.location.href = "/users";
    } catch (err) {
      console.log(err.message);
    }
  }

  render() {
    const userList = this.state.users.map((user) => (
      <div className="user">
        <li key={user._id} onClick={this.deleteUser}>
          Username: {user.username}
          <button type="primary" id={user._id} style={{ marginLeft: "10px" }}>
            Delete User
          </button>
        </li>
      </div>
    ));

    return (
      <Styles>
        <div className="user_list">
          <h3>Registered Users</h3>
          {userList}
        </div>
      </Styles>
    );
  }
}

export default Users;
