import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { Users } from '../api/users.js';

import Game from './Game.jsx';
import User from './User.jsx';
import Login from './Login.jsx';

// App component - represents the whole app
class App extends Component {

  renderUsers() {
    let filteredUsers = this.props.users
    filteredUsers = filteredUsers.filter(user => user.createdAt);
    return filteredUsers.map((user) => (
      <User key={user._id} user={user} />
    ));
  }

  render() {
    return (
      <div className="container">
        <div className="header">
          <img width="800px" src="/images/default_header.jpg" alt="ForgeFlash"/>
        </div>
        <div className="content">
          <Game/>
        </div>
        <div className="users">
          <ul>
            {this.renderUsers()} 
          </ul>
        </div>
        <div className="footer"></div>
      </div>
    );
  }
}
App.propTypes = {
  users: PropTypes.array.isRequired,
};
 
export default createContainer(() => {
  return {
    users: Users.find({}, {sort: {score: -1}}).fetch(),
  };
}, App);