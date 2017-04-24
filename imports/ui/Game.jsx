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
 
  render() {
    return (
        <div>
        { Meteor.userId() ? 
            <div>
            <h3>Your highest score: {this.state.highScore}</h3>
            <object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="" id="myFlashMovie" width="600" height="430">
                <param name="movie" value="/images/multitask.swf"/>
                <embed play="false" swliveconnect="true" name="myFlashMovie" src="/images/multitask.swf" quality="high" bgcolor="#FFFFFF" width="600" height="430" type="application/x-shockwave-flash">
                </embed>
            </object>
            </div>
        : '' }
        </div>
    );
  }

  tick(score) {
    score = parseInt(score)
    if (score > this.state.highScore)
    {
        this.setState({
            highScore: score
        });
        Players.update(Meteor.user().profile.steamid, {$set: { score: score }})
    }
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(getFlashMovieObject("myFlashMovie").GetVariable("_root.score")),
      1000
    );
  }

  componentWillUnmount() {
      clearInterval(this.timerID);
  }
}
 
Game.propTypes = {
  // This component gets the player to display through a React prop.
  // We can use propTypes to indicate it is required
  
};