import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

export default class Login extends Component {

  handleSteamLogin() {
      Meteor.loginWithSteam();
  }

  render() {
    return (
      <div>
        <header className="centered"><button className="btn" id="login" onClick={this.handleSteamLogin}>Log in with Steam to Start</button></header> 
        <div className="message centered">You will need to log in to Steam to participate.  Please use the button above to get started.</div>
      </div>);
  }
}