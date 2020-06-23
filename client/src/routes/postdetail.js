import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import UpdatePost from "./updatePost";
import Comments from "./comments";

const Styles = styled.div`
  .mainBody {
    margin-left: 25%;
    margin-right: 25%;
    margin-top: 5%;
    margin-bottom: 10%;
    display: block;
    height: 1000px;
  }
  #imgContainer {
    width: 100%;
    height: 50%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    margin-bottom: 10px;
  }
`;

class PostDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {
        post: {
          title: "",
          author: "",
          summary: "",
          date: "",
          message: "",
        },
      },
      userStatus: "",
    };
    this.fetchPostDetail = this.fetchPostDetail.bind(this);
    this.fetchUser = this.fetchUser.bind(this);
  }

  componentDidMount() {
    this.fetchPostDetail();
    this.fetchUser();
  }

  async fetchPostDetail() {
    const settings = {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Alow-Credentials": true,
      },
    };

    try {
      let postReq = await fetch(`/posts/${this.props.post._id}`, settings);
      let postRes = await postReq.json();
      this.setState({
        post: postRes,
      });
    } catch (err) {
      console.log(err.message);
    }
  }

  async fetchUser() {
    try {
      let userReq = await fetch("/user_data", { method: "GET" });
      let userRes = await userReq.json();
      this.setState({
        userStatus: userRes,
      });
    } catch (err) {
      console.log(err.message);
    }
  }

  render() {
    const postEl = this.state.post.post;
    const user = this.state.userStatus;
    let update;
    let updateMsg;

    if (user === postEl.author || user === "admin") {
      update = `/${postEl._id}/update`;
      updateMsg = "Update Post";
    } else {
      update = "";
      updateMsg = "";
    }

    return (
      <Router>
        <Switch>
          <Route
            exact
            path={`/${postEl._id}`}
            exact
            render={() => {
              return (
                <Styles>
                  <div className="mainBody">
                    <Link to={update}>
                      <h6>{updateMsg}</h6>
                    </Link>
                    <h1
                      style={{
                        color: "#121212",
                        fontWeight: "700",
                        fontSize: "2.7rem",
                        lineHeight: "2.25rem",
                        fontStyle: "italic",
                        fontFamily:
                          "nyt-cheltenham,georgia,'times new roman',times,serif",
                        marginBottom: "20px",
                      }}
                    >
                      {postEl.title}
                    </h1>
                    <h5
                      style={{
                        fontStyle: "normal",
                        fontWeight: "300",
                        fontSize: "1.25rem",
                        fontFamily:
                          "nyt-cheltenham,georgia,'times new roman',times,serif",
                        marginBottom: "20px",
                      }}
                    >
                      {postEl.summary}
                    </h5>
                    <div
                      id="imgContainer"
                      style={{
                        backgroundImage: `url("../${this.props.onImg}")`,
                      }}
                    ></div>
                    <span
                      style={{ fontWeight: "500", textDecoration: "underline" }}
                    >
                      {postEl.author}
                    </span>
                    <p style={{ marginBottom: "50px", marginTop: "20px" }}>
                      {postEl.date}
                    </p>
                    <p>{postEl.message}</p>
                  </div>
                  <Comments post={this.props.post} />
                </Styles>
              );
            }}
          />
          <Route exact path={update}>
            <UpdatePost post={this.props.post} />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default PostDetail;
