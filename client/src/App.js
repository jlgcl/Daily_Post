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

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <React.Fragment>
        <NavigationBar />
        <Router>
          <div>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path="/signup" component={Signup} />
            {/* <Route path="/about" component={About} /> */}
            <Route path="/posts" component={Posts} />
            <Route path="/politics" component={Politics} />
            <Route path="/economics" component={Economics} />
            <Route path="/business" component={Business} />
            <Route path="/technology" component={Technology} />
            <Route path="/create_post" component={CreatePost} />
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
