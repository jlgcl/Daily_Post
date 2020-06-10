import React from "react";
import styled from "styled-components";

const Styles = styled.div``;

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  async getPosts() {
    const settings = {
      method: "GET",
      headers: {
        "Acess-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
    };
    try {
      let getPost = await fetch("/posts", settings);
      let getRes = await getPost.json();
      console.log(getRes);
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <Styles>
        <div></div>
      </Styles>
    );
  }
}

export default Posts;
