import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Players } from '../api/players.js';

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
       highScore: 0,
       player: null,
    };
  }
 
  handlePlayerCreated(error, player_id) {
    let player = Players.findOne(player_id);
    // this.state.player = player;
    // this.forceUpdate();
    this.setState({
        player: player
    });
  }
  
  handlePlayerSubmit(event) {
    event.preventDefault();
 
    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
 
    Players.insert({
      text,
      createdAt: new Date(), // current time
      score: 0
    }, this.handlePlayerCreated.bind(this));
 
    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
    
    this.timerID = setInterval(
      () => this.tick(getFlashMovieObject("myFlashMovie").GetVariable("_root.score")),
      1000
    );
  }

  handleSteamLogin() {
      Meteor.loginWithSteam();
  }
  handleSteamLogout() {
      Meteor.logout();
      return false;
  }

  render() {
    return <div>
        <header>
        { !Meteor.user() ? 
            <button id="login" onClick={this.handleSteamLogin}>Log in with Steam</button> : 
            <span><img width="32" height="32" src={Meteor.user().profile.steamavatar}/><h2>Welcome {Meteor.user().profile.steamname}</h2><a href="/" onClick={this.handleSteamLogout}>Logout</a></span>
        }
        </header>
        { Meteor.user() ? 
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
        Players.update(this.state.player._id, {$set: { score: score }})
    }
  }

  componentDidMount() {
  }

  componentWillUnmount() {
      clearInterval(this.timerID);
  }
}
 
Game.propTypes = {
  // This component gets the player to display through a React prop.
  // We can use propTypes to indicate it is required
  
};