import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

export default class LoggedIn extends Component {

  handleSteamLogout() {
      Meteor.logout();
      return false;
  }

  render() {
     return <header>
        <span>
            <h2>Welcome { Meteor.user().profile.steamname }</h2>
            <a href="/" onClick={this.handleSteamLogout}>Logout</a>
        </span>
    </header>;
  }
}