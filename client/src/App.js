import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./routes/home";
import { NavigationBar } from "./components/navigation";
import { Footer } from "./routes/footer";
import Login from "./routes/login";

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
            {/* <Route path="/about" component={About} />
            <Route path="/posts" component={Posts} /> */}
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
