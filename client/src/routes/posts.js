import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CreatePost from "./createPost";

const Styles = styled.div`
  .topPosts {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: space-evenly;
    margin-top: 20px;
    margin-left: 45px;
    margin-right: 50px;
    height: 400px;
    box-sizing: border-box;
    overflow: hidden;
  }

  .topLine {
    width: 95%;
  }
  .subLine {
    margin-left: 2%;
    margin-right: 2%;
    color: cyan;
  }
  .vl {
    border-left: 1px solid cyan;
    height: 100%;
  }
  .post1 {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    height: 100%;
    box-sizing: border-box;
    overflow: hidden;
  }
  .post2 {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    height: 40%;
    box-sizing: border-box;
    overflow: hidden;
  }
  #topContent {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 70px;
    font-family: georgia, "times new roman", times, serif;
  }

  #imgContainer {
    width: 70%;
    display: flex;
    justify-content: center;
    padding-left: 10px;
    padding-right: 30px;
  }
`;

function MainPosts(props) {
  return (
    <div className="mainPosts">
      <h3 style={{ marginLeft: "5%" }}>All Posts</h3>
    </div>
  );
}

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

  renderImg(post, widthSize) {
    let isImage = this.state.img;
    let isPost = post;
    let img;

    let imgInd = isImage.find((img) => img.uid === isPost.uid);
    if (imgInd) {
      img = (
        <img
          style={{
            width: `${widthSize}%`,
            height: "100%",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
          src={imgInd.path}
        />
      );
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
          <h1
            style={{
              fontFamily: "helvetica,arial,sans-serif",
              marginTop: "20px",
              marginLeft: "30px",
            }}
          >
            Posts
          </h1>
          <hr className="topLine"></hr>
          <a
            style={{ marginLeft: "85%" }}
            href="http://localhost:3000/create_post"
          >
            Create a Post
          </a>
          <h3 style={{ marginLeft: "5%" }}>Latest</h3>
          <div className="topPosts">
            <div className="post1">
              <div id="topContent">
                <h3 style={{ fontSize: "25px", fontWeight: "700" }}>
                  {posts[posts.length - 1].title}
                </h3>
                <h7 style={{ fontSize: "18px" }}>
                  {posts[posts.length - 1].summary}
                </h7>
                <p style={{ fontSize: "12px" }}>
                  By {posts[posts.length - 1].author}
                </p>
              </div>
              <div id="imgContainer">
                {this.renderImg(posts[posts.length - 1], 100)}
              </div>
            </div>
            <div class="vl"></div>
            <div className="post2">
              <div id="topContent">
                <h3 style={{ fontSize: "23px", fontWeight: "700" }}>
                  {posts[posts.length - 2].title}
                </h3>
                <h7 style={{ fontSize: "18px" }}>
                  {posts[posts.length - 2].summary}
                </h7>
                <p style={{ fontSize: "12px" }}>
                  {posts[posts.length - 2].author}
                </p>
              </div>
              <div id="imgContainer">
                {this.renderImg(posts[posts.length - 2], 100)}
              </div>
            </div>
            <hr className="subLine"></hr>
            <div className="post2">
              <div id="topContent">
                <h3 style={{ fontSize: "23px", fontWeight: "700" }}>
                  {posts[posts.length - 3].title}
                </h3>
                <h7 style={{ fontSize: "18px" }}>
                  {posts[posts.length - 3].summary}
                </h7>
                <p style={{ fontSize: "12px" }}>
                  {posts[posts.length - 3].author}
                </p>
              </div>
              <div id="imgContainer">
                {this.renderImg(posts[posts.length - 3], 100)}
              </div>
            </div>
          </div>
          <MainPosts
            onPosts={this.state.posts}
            onImg={this.state.img}
            onRenderImg={this.renderImg}
          />
        </div>
      </Styles>
    );
  }
}

export default Posts;
