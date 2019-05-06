import React, { Component } from "react";
import $ from "jquery";
import Spinner from "react-bootstrap/Spinner";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      password: "",
      list: false
    };
    this.getData = this.getData.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.resgisterPassword = this.loginPassword.bind(this);
    this.handleUser = this.handleUser.bind(this);
    this.onClicker = this.onClicker.bind(this);
  }

  onClicker() {
    this.setState({ list: true });
  }

  handleUser(user) {
    this.setState({
      name: user
    });
  }

  loginPassword(password) {
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
  loginUser(name, password) {
    console.log(`New task added: ${(name, password)}`);
    $.ajax({
      method: "POST",
      url: "/login",
      contentType: "application/json",
      data: JSON.stringify({
        name,
        password
      })
    }).done(() => {
      this.setState({
        name,
        password,
        link: true
      });
    });
  }
  /*
  componentDidMount() {
    console.log("Initial load of DB");
    this.getData();
    this.loginUser();
  }
  */

  render() {
    console.log(this.state.name, this.state.password);
    return (
      <div className="LoginMessage">
        <center>
          <br />
          <h2>
            Thanks for registering to
            <mark className="KaizenW">Kaizen 2.0</mark>
            <br />
            <h4>Please login!!</h4>
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
                  this.loginUser(this.state.name);
                }
              }}
            />
            <input
              placeholder="Password"
              type="text"
              onChange={e => this.loginPassword(e.target.value)}
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
                  this.loginUser(this.state.name, this.state.password);
                }
              }}
            />
            <button
              onClick={this.loginUser(this.state.name, this.state.password)}
            >
              Login
            </button>
          </form>
          <Link className="LinksPW" to="/main/">
            <button disabled={!this.state.list} type="button">
              Access
            </button>
          </Link>
        </center>
      </div>
    );
  }
}
