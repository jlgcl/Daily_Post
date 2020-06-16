import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CreatePost from "./createPost";

const Styles = styled.div``;

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [
        {
          title: "",
          author: "",
          summary: "",
          message: "",
        },
        {
          title: "",
          author: "",
          summary: "",
          message: "",
        },
        {
          title: "",
          author: "",
          summary: "",
          message: "",
        },
      ],
      img: [
        {
          uid: "",
        },
      ],
    };
    this.getPosts = this.getPosts.bind(this);
    this.getImages = this.getImages.bind(this);
    this.fetchImg = this.fetchImg.bind(this);
    this.renderImg = this.renderImg.bind(this);
  }

  componentDidMount() {
    this.getPosts();
  }

  getImages(data) {
    /// SENDING A REQUEST WITH POST OBJECTS TO FIND IMAGE DOCUMENTS W/ MATCHING UID ///
    const arr = data.map((a) => {
      const setting = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify(a),
      };
      this.fetchImg(setting);
    });
  }

  async fetchImg(setting) {
    try {
      let idRes = await fetch("/getimages", setting);
      let idJson = await idRes.json();
      this.setState((state) => ({
        img: state.img.concat(idJson),
      }));
    } catch (err) {
      console.log(err.message);
    }
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
      this.setState({
        posts: getRes,
      });

      this.getImages(this.state.posts);
    } catch (err) {
      console.log(err);
    }
  }

  renderImg(post) {
    let isImage = this.state.img;
    let isPost = post;
    let img;

    let imgInd = isImage.find((img) => img.uid === isPost.uid);
    if (imgInd) {
      img = <img style={{ width: "30%" }} src={imgInd.path} />;
    } else {
      img = "";
    }

    return <div>{img}</div>;
  }

  render() {
    const posts = this.state.posts;

    return (
      <Styles>
        <div>
          <a href="http://localhost:3000/create_post">Create a Post</a>
        </div>
        <div className="topPosts">
          <div className="post1">
            <h3>{posts[posts.length - 1].title}</h3>
            <h7>{posts[posts.length - 1].summary}</h7>
            <p>{posts[posts.length - 1].author}</p>
            <p>{posts[posts.length - 1].message}</p>
            {this.renderImg(posts[posts.length - 1])}
          </div>
          <div className="post1">
            <h3>{posts[posts.length - 2].title}</h3>
            <h7>{posts[posts.length - 2].summary}</h7>
            <p>{posts[posts.length - 2].author}</p>
            <p>{posts[posts.length - 2].message}</p>
            {this.renderImg(posts[posts.length - 2])}
          </div>
        </div>
      </Styles>
    );
  }
}

export default Posts;
