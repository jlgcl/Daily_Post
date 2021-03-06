import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./routes/home";
import NavigationBar from "./components/navigation";
import { Footer } from "./routes/footer";
import Login from "./routes/login";
import Logout from "./routes/logout";
import Signup from "./routes/signup";
import Posts from "./routes/posts";
import Politics from "./routes/politics";
import Economics from "./routes/economics";
import Business from "./routes/business";
import Technology from "./routes/technology";
import CreatePost from "./routes/createPost";
import Unpublished from "./routes/unpubposts";
import PostDetail from "./routes/postdetail";
import Users from "./routes/users";
import { About } from "./routes/about";
import { Contact } from "./routes/contact";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: [
        {
          title: "",
          summary: "'",
        },
        {
          title: "",
          summary: "'",
        },
        {
          title: "",
          summary: "'",
        },
      ],
      img: [
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
      let postReq = await fetch("/posts", settings);
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
    const posts = this.state.post;
    const img = this.state.img;
    return (
      <React.Fragment>
        <NavigationBar />
        <Router>
          <div>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/loginPage" component={Login} />
              <Route path="/logoutPage" component={Logout} />
              <Route path="/signupPage" component={Signup} />
              <Route exact path="/aboutPage" component={About} />
              <Route path="/contactPage" component={Contact} />
              <Route path="/postsPage" component={Posts} />
              <Route path="/politicsPage" component={Politics} />
              <Route path="/economicsPage" component={Economics} />
              <Route path="/businessPage" component={Business} />
              <Route path="/technologyPage" component={Technology} />
              <Route path="/create_postPage" component={CreatePost} />
              <Route path="/unpublishedPage" component={Unpublished} />
              <Route path="/usersPage" component={Users} />
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
              <Route exact path={`/${posts[posts.length - 3]._id}`}>
                <PostDetail
                  post={posts[posts.length - 3]}
                  onImg={this.renderImg(posts[posts.length - 3])}
                />
              </Route>
            </Switch>
          </div>
        </Router>
        <div className="footer">
          <Footer />
        </div>
      </React.Fragment>
    );
  }
}

export default App;
