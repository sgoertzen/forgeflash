import React, { Component, PropTypes } from 'react';
import { Users } from '../api/users.js';

// Task component - represents a single todo item
export default class User extends Component {
 
  deleteThisUser() {
    Users.remove(this.props.user._id);
  }

  render() {
    // Give users a different className when they are checked off,
    // so that we can style them nicely in CSS 
    return (
      <li>
        <button className="delete" onClick={this.deleteThisUser.bind(this)}>
            &times;
          </button>
        <span className="text">{this.props.user.text} ({this.props.user.score})</span>
      </li>
    );
  }
}
 
User.propTypes = {
  // This component gets the user to display through a React prop.
  // We can use propTypes to indicate it is required
  user: PropTypes.object.isRequired,
};