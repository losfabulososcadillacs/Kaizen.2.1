import React, { Component } from "react";
import $ from "jquery";
import Spinner from "react-bootstrap/Spinner";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      password: "",
      list: []
    };
    this.getData = this.getData.bind(this);
    this.registerUser = this.registerUser.bind(this);
    this.resgisterPassword = this.registerPassword.bind(this);
    this.handleUser = this.handleUser.bind(this);
  }

  handleUser(user) {
    this.setState({
      name: user
    });
  }

  registerPassword(password) {
    this.setState({
      password: password
    });
  }

  getData() {
    $.ajax({
      url: "/users",
      method: "GET",
      success: data => {
        this.setState({ list: data });
        console.log(`This is what currently is listed in Database:`, data);
      },
      error: (xhr, err) => {
        console.log("you have an err", err);
      }
    });
  }
  registerUser(name, password) {
    console.log(`New task added: ${(name, password)}`);
    $.ajax({
      method: "POST",
      url: "/register",
      contentType: "application/json",
      data: JSON.stringify({
        name,
        password
      })
    }).done(() => {
      this.getData();
      this.setState({
        name,
        password
      });
    });
  }
  // initial getData

  componentDidMount() {
    console.log("Initial load of DB");
    this.getData();
  }

  render() {
    /*
    if (this.state.list.length === 0) {
      return (
        <div>
          <br />
          <br />
          <br />
          <Spinner animation="border" variant="success" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      );
    }
    */
    console.log("I am uuseer", this.state.name);
    return (
      <div className="LoginMessage">
        <center>
          <br />
          <h2>
            Welcome to <mark className="KaizenW">Kaizen 2.0</mark>
            <br />
            <h4>Please Register!!</h4>
          </h2>
          <br />
          <form>
            <input
              placeholder="Enter User Name"
              type="text"
              onChange={e => this.handleUser(e.target.value)}
              // set value to the userInput from state
              value={this.state.name}
              type="text"
              onKeyDown={e => {
                if (e.key === "Enter") {
                  console.log("user in submitted", this.state.name);
                  this.User(this.state.name);
                }
              }}
            />
            <input
              placeholder="Password"
              type="password"
              id="pass"
              name="password"
              onChange={e => this.registerPassword(e.target.value)}
              // set value to the userInput from state
              value={this.state.password}
              type="text"
              onKeyDown={e => {
                if (e.key === "Enter") {
                  console.log(
                    "password submitted",
                    this.state.user,
                    this.state.password
                  );
                  this.registerUser(this.state.name, this.state.password);
                }
              }}
            />
            <button
              onClick={() => {
                console.log(
                  " final user submitted",
                  this.state.name,
                  this.state.password
                );
                this.registerUser(this.state.name, this.state.password);
              }}
            >
              Register
            </button>
          </form>
          <button>
            <Link className="LinksPW" to="/login/">
              Go to Login
            </Link>
          </button>
        </center>
      </div>
    );
  }
}
