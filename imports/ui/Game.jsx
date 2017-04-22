import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Users } from '../api/users.js';

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
       highScore: 0,
       user: null,
    };
  }
 
  handleUserCreated(error, user_id) {
    let user = Users.findOne(user_id);
    // this.state.user = user;
    // this.forceUpdate();
    this.setState({
        user: user
    });
  }
  
  handleUserSubmit(event) {
    event.preventDefault();
 
    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
 
    Users.insert({
      text,
      createdAt: new Date(), // current time
      score: 0
    }, this.handleUserCreated.bind(this));
 
    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
    
    this.timerID = setInterval(
      () => this.tick(getFlashMovieObject("myFlashMovie").GetVariable("_root.score")),
      1000
    );
  }

  render() {
    return <div>
        <header>
        { !this.state.user ? 
            <form className="new-user" onSubmit={this.handleUserSubmit.bind(this)} >
                <input
                type="text"
                ref="textInput"
                placeholder="Enter your gaming handle and press enter"
                />
            </form> : 
            <h2>Welcome {this.state.user.text}</h2>
        }
        </header>
        { this.state.user ? 
            <div>
                <h3>Your highest score: {this.state.highScore}</h3>
                <object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="" id="myFlashMovie" width="600" height="430">
                    <param name="movie" value="/images/multitask.swf"/>
                    <embed play="false" swliveconnect="true" name="myFlashMovie" src="/images/multitask.swf" quality="high" bgcolor="#FFFFFF" width="600" height="430" type="application/x-shockwave-flash">
                    </embed>
                </object>
            </div>
            : '' 
         }
        
        </div>;
  }

  tick(score) {
    score = parseInt(score)
    if (score > this.state.highScore)
    {
        this.setState({
            highScore: score
        });
        Users.update(this.state.user._id, {$set: { score: score }})
    }
  }

  componentDidMount() {
  }

  componentWillUnmount() {
      clearInterval(this.timerID);
  }
}
 
Game.propTypes = {
  // This component gets the user to display through a React prop.
  // We can use propTypes to indicate it is required
  
};