import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Users } from '../api/users.js';

export default class Login extends Component {
 constructor(props) {
    super(props);
 
     this.state = {
       user: null,
     };
  }

  handleUser(error, user_id) {
    let user = Users.findOne(user_id);
    this.state.user = user;
    this.forceUpdate();
  }
  
  handleSubmit(event) {
    event.preventDefault();
 
    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
 
    Users.insert({
      text,
      createdAt: new Date(), // current time
      score: 0
    }, this.handleUser.bind(this));
 
    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  render() {
    return <div>
        { !this.state.user ? 
            <form className="new-user" onSubmit={this.handleSubmit.bind(this)} >
                <input
                type="text"
                ref="textInput"
                placeholder="Enter your handle"
                />
            </form> : 
            <h2>Welcome {this.state.user.text}</h2>
        }
        </div>;
  }
}
 
Login.propTypes = {
};