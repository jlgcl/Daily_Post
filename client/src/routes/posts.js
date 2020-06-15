import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CreatePost from "./createPost";

const Styles = styled.div``;

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
    this.getPosts = this.getPosts.bind(this);
    this.getImages = this.getImages.bind(this);
  }

  componentDidMount() {
    this.getPosts();
  }

  async getImages(e) {
    e.preventDefault();
    //SENDING A REQUEST WITH AN OBJECT OF UIDs???*
  }

  async getPosts(e) {
    e.preventDefault();

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
      this.setState({
        posts: getRes,
      });

      this.getImages(getRes);
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
