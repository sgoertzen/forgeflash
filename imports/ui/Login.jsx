import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

export default class Login extends Component {

  handleSteamLogin() {
      Meteor.loginWithSteam();
  }

  render() {
     return <header><button id="login" onClick={this.handleSteamLogin}>Log in with Steam</button></header>;
  }
}