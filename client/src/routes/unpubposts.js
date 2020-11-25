import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import PostDetail from "./postdetail";

const Styles = styled.div``;

class Unpublished extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: [
        {
          title: "",
          date: "",
          summary: "",
        },
      ],
      img: [
        {
          uid: "",
        },
      ],
    };
    this.fetchPosts = this.fetchPosts.bind(this);
    this.getImages = this.getImages.bind(this);
    this.renderImg = this.renderImg.bind(this);
  }

  componentDidMount() {
    this.fetchPosts();
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

  async fetchPosts() {
    const settings = {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
    };
    try {
      let postReq = await fetch("/unpubposts", settings);
      let postRes = await postReq.json();
      this.setState({
        post: postRes,
      });
      this.getImages(this.state.post);
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
    const postList = this.state.post;
    let posts = postList.map((post) => (
      <div>
        <li key={post.title}>
          <Link to={`/${post._id}`}>{post.title}</Link>, {post.date}
        </li>
      </div>
    ));
    let postRoutes = postList.map((post) => (
      <Route exact path={`/${post._id}`}>
        <PostDetail post={post} onImg={this.renderImg(post)} />
      </Route>
    ));

    return (
      <Router>
        <Switch>
          <Route
            expact
            path="/unpublishedPage"
            exact
            render={() => {
              return (
                <Styles>
                  <h2 style={{ marginLeft: "5%", marginTop: "25px" }}>
                    Unpublished Posts
                  </h2>
                  <div style={{ marginLeft: "5%", marginTop: "25px" }}>
                    {posts}
                  </div>
                </Styles>
              );
            }}
          />
          {postRoutes}
        </Switch>
      </Router>
    );
  }
}

export default Unpublished;
