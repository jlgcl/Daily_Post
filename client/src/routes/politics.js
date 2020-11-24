import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import PostDetail from "./postdetail";
import "./sections.css";

const Styles = styled.div`
  .topPosts {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: space-evenly;
    margin-top: 20px;
    margin-left: 50px;
    margin-right: 50px;
    height: 700px;
    box-sizing: border-box;
    overflow: hidden;
  }
  a {
    color: black;
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
    margin-left: -20px
    margin-right: 20px;
    flex-direction: column;
    justify-content: center;
    padding-left: 70px;
    font-family: georgia, "times new roman", times, serif;
  }

  #imgContainer {
    width: 70%;
    height: 100%;
    display: flex;
    justify-content: center;
    padding-left: 10px;
    padding-right: 30px;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }

  .mainPosts {
    display: flex;
    flex-direction: column;
    align-content: center;
    width: 100%;
    height: 1500px;
    margin-top: 100px;
    font-family: georgia, "times new roman", times, serif;
  }
  .postCard {
    display: flex;
    flex-direction: row;
    margin-left: 15%;
    margin-right: 15%;
    margin-top: 15px;
  }
  #mainContent {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 60%;
    margin-right: 15px;
  }
  .postCard #imgContainer {
    width: 40%;
    display: flex;
    justify-content: center;
    padding-left: 10px;
    padding-right: 30px;
  }
  .postCard #date {
    font-size: 12px;
    color: #ccbfbc;
  }
`;

function MainPosts(props) {
  const posts = props.onPosts;
  return (
    <div className="mainPosts">
      <h3
        style={{
          marginLeft: "5%",
          marginTop: "30px",
          marginBottom: "20px",
          fontFamily: "times new roman",
        }}
      >
        All Posts
      </h3>
      <div className="postCard">
        <div id="date">{posts[posts.length - 4].date}</div>
        <div id="mainContent">
          <Link to={"/" + posts[posts.length - 4]._id}>
            <h3
              style={{
                fontSize: "25px",
                fontWeight: "700",
                wordWrap: "break-word",
              }}
            >
              {posts[posts.length - 4].title}
            </h3>
          </Link>
          <h7 style={{ fontSize: "15px" }}>
            {posts[posts.length - 4].summary}
          </h7>
          <p style={{ fontSize: "10px" }}>
            By {posts[posts.length - 4].author}
          </p>
        </div>
        <div
          id="imgContainer"
          style={{
            backgroundImage: `url(" ${props.onRenderImg(
              posts[posts.length - 4]
            )} ")`,
          }}
        ></div>
      </div>
      <hr style={{ width: "70%", marginTop: "30px" }}></hr>
      <div className="postCard">
        <div id="date">{posts[posts.length - 5].date}</div>
        <div id="mainContent">
          <Link to={"/" + posts[posts.length - 5]._id}>
            <h3
              style={{
                fontSize: "25px",
                fontWeight: "700",
                wordWrap: "break-word",
              }}
            >
              {posts[posts.length - 5].title}
            </h3>
          </Link>
          <h7 style={{ fontSize: "15px" }}>
            {posts[posts.length - 5].summary}
          </h7>
          <p style={{ fontSize: "10px" }}>
            By {posts[posts.length - 5].author}
          </p>
        </div>
        <div
          id="imgContainer"
          style={{
            backgroundImage: `url(" ${props.onRenderImg(
              posts[posts.length - 5]
            )} ")`,
          }}
        ></div>
      </div>
    </div>
  );
}

class Politics extends React.Component {
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
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
    };
    try {
      let getPost = await fetch("/politics", settings);
      let getRes = await getPost.json();
      this.setState({
        posts: getRes,
      });

      this.getImages(this.state.posts);
    } catch (err) {
      console.log(err.message);
    }
  }

  renderImg(post) {
    let isImage = this.state.img;

    let isPost = post;
    let img;

    let imgInd = isImage.find((img) => img.uid === isPost.uid);

    if (imgInd) {
      return imgInd.path;
    } else {
      return "";
    }
  }

  render() {
    const posts = this.state.posts;

    return (
      <Router>
        <Switch>
          <Route
            exact
            path="/politics"
            exact
            render={() => {
              return (
                <Styles>
                  <div>
                    <h1
                      style={{
                        fontFamily: "Merriweather",
                        marginTop: "20px",
                        marginLeft: "30px",
                        className: "section_title",
                      }}
                    >
                      Politics
                    </h1>
                    <hr className="topLine"></hr>
                    <a style={{ marginLeft: "85%" }} href="/create_post">
                      Create a Post
                    </a>
                    <h3
                      style={{
                        marginLeft: "5%",
                        fontFamily: "times new roman",
                      }}
                    >
                      Latest
                    </h3>
                    <div className="topPosts">
                      <div className="post1">
                        <div id="topContent" style={{ height: "80%" }}>
                          <Link to={`/${posts[posts.length - 1]._id}`}>
                            <h3
                              style={{
                                fontSize: "25px",
                                fontWeight: "700",
                                wordWrap: "break-word",
                              }}
                            >
                              {posts[posts.length - 1].title}
                            </h3>
                          </Link>
                          <h7
                            style={{
                              fontSize: "18px",
                              wordWrap: "break-word",
                              marginRight: "40px",
                            }}
                          >
                            {posts[posts.length - 1].summary}
                          </h7>
                          <p style={{ fontSize: "12px" }}>
                            By {posts[posts.length - 1].author}
                          </p>
                        </div>
                        <div
                          id="imgContainer"
                          style={{
                            marginRight: "20px",
                            backgroundImage: `url(" ${this.renderImg(
                              posts[posts.length - 1]
                            )} ")`,
                          }}
                        ></div>
                      </div>
                      <div class="vl"></div>
                      <div className="post2">
                        <div id="topContent">
                          <Link to={`/${posts[posts.length - 2]._id}`}>
                            <h3
                              style={{
                                fontSize: "25px",
                                fontWeight: "700",
                                wordWrap: "break-word",
                              }}
                            >
                              {posts[posts.length - 2].title}
                            </h3>
                          </Link>
                          <h7
                            style={{ fontSize: "18px", wordWrap: "break-word" }}
                          >
                            {posts[posts.length - 2].summary}
                          </h7>
                          <p style={{ fontSize: "12px" }}>
                            By {posts[posts.length - 2].author}
                          </p>
                        </div>
                        <div
                          id="imgContainer"
                          style={{
                            backgroundImage: `url(" ${this.renderImg(
                              posts[posts.length - 2]
                            )} ")`,
                          }}
                        ></div>
                      </div>
                      <hr className="subLine"></hr>
                      <div className="post2">
                        <div id="topContent">
                          <Link to={"/" + posts[posts.length - 3]._id}>
                            <h3
                              style={{
                                fontSize: "25px",
                                fontWeight: "700",
                                wordWrap: "break-word",
                              }}
                            >
                              {posts[posts.length - 3].title}
                            </h3>
                          </Link>
                          <h7
                            style={{ fontSize: "18px", wordWrap: "break-word" }}
                          >
                            {posts[posts.length - 3].summary}
                          </h7>
                          <p style={{ fontSize: "12px" }}>
                            By {posts[posts.length - 3].author}
                          </p>
                        </div>
                        <div
                          id="imgContainer"
                          style={{
                            backgroundImage: `url(" ${this.renderImg(
                              posts[posts.length - 3]
                            )} ")`,
                          }}
                        ></div>
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
            }}
          />

          <Route exact path={`/${posts[posts.length - 1]._id}`}>
            <PostDetail
              post={posts[posts.length - 1]}
              onImg={this.renderImg(posts[posts.length - 1])}
            />
          </Route>
          <Route exact path={`/${posts[posts.length - 2]._id}`}>
            <PostDetail
              post={posts[posts.length - 2]}
              onImg={this.renderImg(posts[posts.length - 2])}
            />
          </Route>
          <Route exact path={"/" + posts[posts.length - 3]._id}>
            <PostDetail
              post={posts[posts.length - 3]}
              onImg={this.renderImg(posts[posts.length - 3])}
            />
          </Route>
          <Route exact path={"/" + posts[posts.length - 4]._id}>
            <PostDetail
              post={posts[posts.length - 4]}
              onImg={this.renderImg(posts[posts.length - 4])}
            />
          </Route>
          <Route exact path={"/" + posts[posts.length - 5]._id}>
            <PostDetail
              post={posts[posts.length - 5]}
              onImg={this.renderImg(posts[posts.length - 5])}
            />
          </Route>
          {/* <Route exact path={"/posts/" + posts[posts.length - 6]._id}>
            <PostDetail post={posts[posts.length - 6]} />
          </Route>
          <Route exact path={"/posts/" + posts[posts.length - 7]._id}>
            <PostDetail post={posts[posts.length - 7]} />
          </Route> */}
        </Switch>
      </Router>
    );
  }
}

export default Politics;
