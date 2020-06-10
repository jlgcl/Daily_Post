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
