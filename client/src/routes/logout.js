import React from "react";

class Logout extends React.Component {
  constructor(props) {
    super(props);
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
      localStorage.removeItem("token");
      let log = await fetch("/logout", settings);
      window.location.href = "/";
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return null;
  }
}

export default Logout;
