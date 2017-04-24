import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

export default class LoggedIn extends Component {

  handleSteamLogout() {
      Meteor.logout();
      return false;
  }

  render() {
     return <header>
            <span className="welcome">Welcome { Meteor.user().profile.steamname }</span>
            <a className="tinylink" href="/" onClick={this.handleSteamLogout}>Logout</a>
    </header>;
  }
}