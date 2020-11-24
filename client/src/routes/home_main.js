import React from "react";
import styled from "styled-components";
import Card from "react-bootstrap/Card";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import PostDetail from "./postdetail";

const Styles = styled.div`
  .card-container {
    display: flex;
    margin-bottom: 30px;
    width: 100%;
    max-width: 100%;
    overflow-x: auto;
    color: black;
    font-family: times new roman;
    text-decoration: none;
  }
  .card-container::-webkit-scrollbar {
    display: none;
  }
  .card {
    box-shadow: 10px 10px 22px -10px rgba(0, 0, 0, 0.75);
    min-width: 300px;
    margin-left: 50px;
    margin-right: 100px;
  }
  .card-img-top {
    width: 100%;
    height: 15vw;
    object-fit: cover;
  }
`;

class HomeMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postsBus: [
        {
          title: "",
          summary: "",
        },
        {
          title: "",
          summary: "",
        },
        {
          title: "",
          summary: "",
        },
        {
          title: "",
          summary: "",
        },
        {
          title: "",
          summary: "",
        },
      ],
      postsPol: [
        {
          title: "",
          summary: "",
        },
        {
          title: "",
          summary: "",
        },
        {
          title: "",
          summary: "",
        },
        {
          title: "",
          summary: "",
        },
        {
          title: "",
          summary: "",
        },
      ],
      postsEcon: [
        {
          title: "",
          summary: "",
        },
        {
          title: "",
          summary: "",
        },
        {
          title: "",
          summary: "",
        },
        {
          title: "",
          summary: "",
        },
        {
          title: "",
          summary: "",
        },
      ],
      postsTech: [
        {
          title: "",
          summary: "",
        },
        {
          title: "",
          summary: "",
        },
        {
          title: "",
          summary: "",
        },
        {
          title: "",
          summary: "",
        },
        {
          title: "",
          summary: "",
        },
      ],
      polImg: [
        {
          path: "",
        },
        {
          path: "",
        },
        {
          path: "",
        },
        {
          path: "",
        },
        {
          path: "",
        },
      ],
      econImg: [
        {
          path: "",
        },
        {
          path: "",
        },
        {
          path: "",
        },
        {
          path: "",
        },
        {
          path: "",
        },
      ],
      busImg: [
        {
          path: "",
        },
        {
          path: "",
        },
        {
          path: "",
        },
        {
          path: "",
        },
        {
          path: "",
        },
      ],
      techImg: [
        {
          path: "",
        },
        {
          path: "",
        },
        {
          path: "",
        },
        {
          path: "",
        },
        {
          path: "",
        },
      ],
    };
    this.fetchPoliticsPosts = this.fetchPoliticsPosts.bind(this);
    this.fetchBusinessPosts = this.fetchBusinessPosts.bind(this);
    this.fetchEconPosts = this.fetchEconPosts.bind(this);
    this.fetchTechPosts = this.fetchTechPosts.bind(this);
    this.fetchImg = this.fetchImg.bind(this);
    this.getImg = this.getImg.bind(this);
    this.renderImg = this.renderImg.bind(this);
  }
  componentDidMount() {
    this.fetchPoliticsPosts();
    this.fetchBusinessPosts();
    this.fetchEconPosts();
    this.fetchTechPosts();
  }
  getImg(posts) {
    let bodyReq = {};
    posts.map((post) => {
      bodyReq = {
        uid: post.uid,
      };
      let category = post.category;

      const setting = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(bodyReq),
      };
      this.fetchImg(setting, category);
    });
  }
  async fetchImg(setting, category) {
    try {
      let imgReq = await fetch("/getimages", setting);
      let imgRes = await imgReq.json();

      if (category === "politics") {
        this.setState((state) => ({
          polImg: state.polImg.concat(imgRes),
        }));
      } else if (category === "business") {
        this.setState((state) => ({
          busImg: state.busImg.concat(imgRes),
        }));
      } else if (category === "economics") {
        this.setState((state) => ({
          econImg: state.econImg.concat(imgRes),
        }));
      } else if (category === "technology") {
        this.setState((state) => ({
          techImg: state.techImg.concat(imgRes),
        }));
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  async fetchPoliticsPosts() {
    let setting = {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
    };
    try {
      let postReq = await fetch("/politics", setting);
      let postRes = await postReq.json();

      this.setState({
        postsPol: postRes,
      });
      this.getImg(this.state.postsPol);
    } catch (err) {
      console.log(err.message);
    }
  }
  async fetchBusinessPosts() {
    try {
      let setting = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      };
      let postReq = await fetch("/business", setting);
      let postRes = await postReq.json();

      this.setState({
        postsBus: postRes,
      });
      this.getImg(this.state.postsBus);
    } catch (err) {
      console.log(err.message);
    }
  }
  async fetchEconPosts() {
    try {
      let setting = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      };
      let postReq = await fetch("/economics", setting);
      let postRes = await postReq.json();

      this.setState({
        postsEcon: postRes,
      });
      this.getImg(this.state.postsEcon);
    } catch (err) {
      console.log(err.message);
    }
  }
  async fetchTechPosts() {
    try {
      let setting = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      };
      let postReq = await fetch("/technology", setting);
      let postRes = await postReq.json();

      this.setState({
        postsTech: postRes,
      });
      this.getImg(this.state.postsTech);
    } catch (err) {
      console.log(err.message);
    }
  }

  renderImg(post) {
    let imgP = this.state.polImg;
    let imgE = this.state.econImg;
    let imgB = this.state.busImg;
    let imgT = this.state.techImg;
    let images = imgP.concat(imgE, imgB, imgT);

    let isPost = post;

    let imgInd = images.find((img) => img.uid === isPost.uid);

    if (imgInd) {
      return imgInd.path;
    } else {
      return "";
    }
  }

  render() {
    const imgP = this.state.polImg;
    const imgE = this.state.econImg;
    const imgB = this.state.busImg;
    const imgT = this.state.techImg;
    const postP = this.state.postsPol;
    const postE = this.state.postsEcon;
    const postB = this.state.postsBus;
    const postT = this.state.postsTech;

    return (
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return (
                <Styles>
                  <div>
                    <h3 className="main_section_header">Politics</h3> <hr></hr>
                    <div className="card-container">
                      <Card style={{ width: "18rem" }}>
                        <Card.Img
                          variant="top"
                          src={imgP[imgP.length - 1].path}
                          className="cardImg"
                        />
                        <Card.Body>
                          <Card.Title style={{ fontWeight: "bold" }}>
                            <Link
                              to={`/${postP[postP.length - 1]._id}`}
                              style={{ color: "black" }}
                            >
                              {postP[postP.length - 1].title}
                            </Link>
                          </Card.Title>
                          <Card.Text>
                            {postP[postP.length - 1].summary}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                      <Card style={{ width: "18rem" }}>
                        <Card.Img
                          variant="top"
                          src={imgP[imgP.length - 2].path}
                        />
                        <Card.Body>
                          <Card.Title style={{ fontWeight: "bold" }}>
                            <Link
                              to={`/${postP[postP.length - 2]._id}`}
                              style={{ color: "black" }}
                            >
                              {postP[postP.length - 2].title}
                            </Link>
                          </Card.Title>
                          <Card.Text>
                            {postP[postP.length - 2].summary}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                      <Card style={{ width: "18rem" }}>
                        <Card.Img
                          variant="top"
                          src={imgP[imgP.length - 3].path}
                        />
                        <Card.Body>
                          <Card.Title style={{ fontWeight: "bold" }}>
                            <Link
                              to={`/${postP[postP.length - 3]._id}`}
                              style={{ color: "black" }}
                            >
                              {postP[postP.length - 3].title}
                            </Link>
                          </Card.Title>
                          <Card.Text>
                            {postP[postP.length - 3].summary}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                      <Card style={{ width: "18rem" }}>
                        <Card.Img
                          variant="top"
                          src={imgP[imgP.length - 4].path}
                        />
                        <Card.Body>
                          <Card.Title style={{ fontWeight: "bold" }}>
                            <Link
                              to={`/${postP[postP.length - 4]._id}`}
                              style={{ color: "black" }}
                            >
                              {postP[postP.length - 4].title}
                            </Link>
                          </Card.Title>
                          <Card.Text>
                            {postP[postP.length - 4].summary}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </div>
                    <h3 className="main_section_header">Business</h3> <hr></hr>
                    <div className="card-container">
                      <Card style={{ width: "18rem" }}>
                        <Card.Img
                          variant="top"
                          src={imgB[imgB.length - 1].path}
                        />
                        <Card.Body>
                          <Card.Title style={{ fontWeight: "bold" }}>
                            <Link
                              to={`/${postB[postB.length - 1]._id}`}
                              style={{ color: "black" }}
                            >
                              {postB[postB.length - 1].title}
                            </Link>
                          </Card.Title>
                          <Card.Text>
                            {postB[postB.length - 1].summary}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                      <Card style={{ width: "18rem" }}>
                        <Card.Img
                          variant="top"
                          src={imgB[imgB.length - 2].path}
                        />
                        <Card.Body>
                          <Card.Title style={{ fontWeight: "bold" }}>
                            <Link
                              to={`/${postB[postB.length - 2]._id}`}
                              style={{ color: "black" }}
                            >
                              {postB[postB.length - 2].title}
                            </Link>
                          </Card.Title>
                          <Card.Text>
                            {postB[postB.length - 2].summary}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                      <Card style={{ width: "18rem" }}>
                        <Card.Img
                          variant="top"
                          src={imgB[imgB.length - 3].path}
                        />
                        <Card.Body>
                          <Card.Title style={{ fontWeight: "bold" }}>
                            <Link
                              to={`/${postB[postB.length - 3]._id}`}
                              style={{ color: "black" }}
                            >
                              {postB[postB.length - 3].title}
                            </Link>
                          </Card.Title>
                          <Card.Text>
                            {postB[postB.length - 3].summary}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                      <Card style={{ width: "18rem" }}>
                        <Card.Img
                          variant="top"
                          src={imgB[imgB.length - 4].path}
                        />
                        <Card.Body>
                          <Card.Title style={{ fontWeight: "bold" }}>
                            <Link
                              to={`/${postB[postB.length - 4]._id}`}
                              style={{ color: "black" }}
                            >
                              {postB[postB.length - 4].title}
                            </Link>
                          </Card.Title>
                          <Card.Text>
                            {postB[postB.length - 4].summary}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </div>
                    <h3 className="main_section_header">Economics</h3> <hr></hr>
                    <div className="card-container">
                      <Card style={{ width: "18rem" }}>
                        <Card.Img
                          variant="top"
                          src={imgE[imgE.length - 1].path}
                        />
                        <Card.Body>
                          <Card.Title style={{ fontWeight: "bold" }}>
                            <Link
                              to={`/${postE[postE.length - 1]._id}`}
                              style={{ color: "black" }}
                            >
                              {postE[postE.length - 1].title}
                            </Link>
                          </Card.Title>
                          <Card.Text>
                            {postE[postE.length - 1].summary}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                      <Card style={{ width: "18rem" }}>
                        <Card.Img
                          variant="top"
                          src={imgE[imgE.length - 2].path}
                        />
                        <Card.Body>
                          <Card.Title style={{ fontWeight: "bold" }}>
                            <Link
                              to={`/${postE[postE.length - 2]._id}`}
                              style={{ color: "black" }}
                            >
                              {postE[postE.length - 2].title}
                            </Link>
                          </Card.Title>
                          <Card.Text>
                            {postE[postE.length - 2].summary}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                      <Card style={{ width: "18rem" }}>
                        <Card.Img
                          variant="top"
                          src={imgE[imgE.length - 3].path}
                        />
                        <Card.Body>
                          <Card.Title style={{ fontWeight: "bold" }}>
                            <Link
                              to={`/${postE[postE.length - 3]._id}`}
                              style={{ color: "black" }}
                            >
                              {postE[postE.length - 3].title}
                            </Link>
                          </Card.Title>
                          <Card.Text>
                            {postE[postE.length - 3].summary}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                      <Card style={{ width: "18rem" }}>
                        <Card.Img
                          variant="top"
                          src={imgE[imgE.length - 4].path}
                        />
                        <Card.Body>
                          <Card.Title style={{ fontWeight: "bold" }}>
                            <Link
                              to={`/${postE[postE.length - 4]._id}`}
                              style={{ color: "black" }}
                            >
                              {postE[postE.length - 4].title}
                            </Link>
                          </Card.Title>
                          <Card.Text>
                            {postE[postE.length - 4].summary}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </div>
                    <h3 className="main_section_header">Technology</h3>{" "}
                    <hr></hr>
                    <div className="card-container">
                      <Card style={{ width: "18rem" }}>
                        <Card.Img
                          variant="top"
                          src={imgT[imgT.length - 1].path}
                        />
                        <Card.Body>
                          <Card.Title style={{ fontWeight: "bold" }}>
                            <Link
                              to={`/${postT[postT.length - 1]._id}`}
                              style={{ color: "black" }}
                            >
                              {postT[postT.length - 1].title}
                            </Link>
                          </Card.Title>
                          <Card.Text>
                            {postT[postT.length - 1].summary}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                      <Card style={{ width: "18rem" }}>
                        <Card.Img
                          variant="top"
                          src={imgT[imgT.length - 2].path}
                        />
                        <Card.Body>
                          <Card.Title style={{ fontWeight: "bold" }}>
                            <Link
                              to={`/${postT[postT.length - 2]._id}`}
                              style={{ color: "black" }}
                            >
                              {postT[postT.length - 2].title}
                            </Link>
                          </Card.Title>
                          <Card.Text>
                            {postT[postT.length - 2].summary}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                      <Card style={{ width: "18rem" }}>
                        <Card.Img
                          variant="top"
                          src={imgT[imgT.length - 3].path}
                        />
                        <Card.Body>
                          <Card.Title style={{ fontWeight: "bold" }}>
                            <Link
                              to={`/${postT[postT.length - 3]._id}`}
                              style={{ color: "black" }}
                            >
                              {postT[postT.length - 3].title}
                            </Link>
                          </Card.Title>
                          <Card.Text>
                            {postT[postT.length - 3].summary}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                      <Card style={{ width: "18rem" }}>
                        <Card.Img
                          variant="top"
                          src={imgT[imgT.length - 4].path}
                        />
                        <Card.Body>
                          <Card.Title style={{ fontWeight: "bold" }}>
                            <Link
                              to={`/${postT[postT.length - 4]._id}`}
                              style={{ color: "black" }}
                            >
                              {postT[postT.length - 4].title}
                            </Link>
                          </Card.Title>
                          <Card.Text>
                            {postT[postT.length - 4].summary}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </div>
                  </div>
                </Styles>
              );
            }}
          />
          <Route exact path={`/${postP[postP.length - 1]._id}`}>
            <PostDetail
              post={postP[postP.length - 1]}
              onImg={this.renderImg(postP[postP.length - 1])}
            />
          </Route>
          <Route exact path={`/${postP[postP.length - 2]._id}`}>
            <PostDetail
              post={postP[postP.length - 2]}
              onImg={this.renderImg(postP[postP.length - 2])}
            />
          </Route>
          <Route exact path={`/${postP[postP.length - 3]._id}`}>
            <PostDetail
              post={postP[postP.length - 3]}
              onImg={this.renderImg(postP[postP.length - 3])}
            />
          </Route>
          <Route exact path={`/${postP[postP.length - 4]._id}`}>
            <PostDetail
              post={postP[postP.length - 4]}
              onImg={this.renderImg(postP[postP.length - 4])}
            />
          </Route>

          <Route exact path={`/${postB[postB.length - 1]._id}`}>
            <PostDetail
              post={postB[postB.length - 1]}
              onImg={this.renderImg(postB[postB.length - 1])}
            />
          </Route>
          <Route exact path={`/${postB[postB.length - 2]._id}`}>
            <PostDetail
              post={postB[postB.length - 2]}
              onImg={this.renderImg(postB[postB.length - 2])}
            />
          </Route>
          <Route exact path={`/${postB[postB.length - 3]._id}`}>
            <PostDetail
              post={postB[postB.length - 3]}
              onImg={this.renderImg(postB[postB.length - 3])}
            />
          </Route>
          <Route exact path={`/${postB[postB.length - 4]._id}`}>
            <PostDetail
              post={postB[postB.length - 4]}
              onImg={this.renderImg(postB[postB.length - 4])}
            />
          </Route>

          <Route exact path={`/${postE[postE.length - 1]._id}`}>
            <PostDetail
              post={postE[postE.length - 1]}
              onImg={this.renderImg(postE[postE.length - 1])}
            />
          </Route>
          <Route exact path={`/${postE[postE.length - 2]._id}`}>
            <PostDetail
              post={postE[postE.length - 2]}
              onImg={this.renderImg(postE[postE.length - 2])}
            />
          </Route>
          <Route exact path={`/${postE[postE.length - 3]._id}`}>
            <PostDetail
              post={postE[postE.length - 3]}
              onImg={this.renderImg(postE[postE.length - 3])}
            />
          </Route>
          <Route exact path={`/${postE[postE.length - 4]._id}`}>
            <PostDetail
              post={postE[postE.length - 4]}
              onImg={this.renderImg(postE[postE.length - 4])}
            />
          </Route>

          <Route exact path={`/${postT[postT.length - 1]._id}`}>
            <PostDetail
              post={postT[postT.length - 1]}
              onImg={this.renderImg(postT[postT.length - 1])}
            />
          </Route>
          <Route exact path={`/${postT[postT.length - 2]._id}`}>
            <PostDetail
              post={postT[postT.length - 2]}
              onImg={this.renderImg(postT[postT.length - 2])}
            />
          </Route>
          <Route exact path={`/${postT[postT.length - 3]._id}`}>
            <PostDetail
              post={postT[postT.length - 3]}
              onImg={this.renderImg(postT[postT.length - 3])}
            />
          </Route>
          <Route exact path={`/${postT[postT.length - 4]._id}`}>
            <PostDetail
              post={postT[postT.length - 4]}
              onImg={this.renderImg(postT[postT.length - 4])}
            />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default HomeMain;
