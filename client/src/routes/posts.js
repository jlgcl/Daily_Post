import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CreatePost from "./createPost";

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
        <div>
          <a href="http://localhost:3000/create_post">Create a Post</a>
        </div>
      </Styles>
    );
  }
}

export default Posts;
