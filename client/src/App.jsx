import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import AddTask from "./components/AddTask";
import Archived from "./components/Archive";
import HowTos from "./components/HowTo";
import Register from "./components/Register";
import Login from "./components/Login";

function Main() {
  return (
    <div>
      <center>
        <AddTask />
      </center>
    </div>
  );
}

function Archive() {
  return (
    <center>
      <Archived />
    </center>
  );
}

function HowTo() {
  return <HowTos />;
}

class App extends Component {
  //renders data to the DOM
  render() {
    return (
      <Router>
        <div className="LinksGroup">
          <nav>
            <Link className="Links" to="/">
              Register|
            </Link>
            <Link className="Links" to="/login">
              Login|
            </Link>
            <Link className="Links" to="/main/">
              Main|
            </Link>
            <Link className="Links" to="/archive/">
              Archive|
            </Link>
            <Link className="Links" to="/howto/">
              How To|
            </Link>
          </nav>

          <Route path="/" exact component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/main/" component={Main} />
          <Route path="/archive/" component={Archive} />
          <Route path="/howto/" component={HowTo} />
        </div>
      </Router>
    );
  }
}

export default App;
