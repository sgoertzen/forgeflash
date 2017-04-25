import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Players } from '../api/players.js';
import { Tournament } from '../api/tournament.js';

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
       highScore: 0,
       player: null,
       game: "multitask",  // Either cursor or multitask
    };
  }
 
  render() {
    var gamefile = this.state.game == "cursor" ? "/games/cursor.swf" : "/games/multitask.swf";
    var tournament = (this.props.tournament && this.props.tournament.length > 0 ? this.props.tournament[0] : null);
    var started = (tournament ? tournament.started : false);
    var ended = (tournament ? tournament.ended : false);
    return (
        <div>
        { Meteor.userId() && started && !ended ? 
            <div>
            <h3>Your highest score: {this.state.highScore}</h3>
            <object classID="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" id="myFlashMovie" width="600" height="430">
                <param name="movie" value={gamefile}/>
                <embed name="myFlashMovie" src={gamefile} width="600" height="430" type="application/x-shockwave-flash">
                </embed>
            </object>
            </div>
        :
          <div>
            <h3>You are set!  Just wait for the tournament to start!</h3>
          </div>  
        }
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
    var variableName = this.state.game == "cursor" ? "_root.high_score" : "_root.score";
    that = this;
    this.timerID = setInterval(function() {
      var movie = getFlashMovieObject("myFlashMovie");
      if (movie) {
        that.tick(movie.GetVariable(variableName))
      }
    },1000);
  }

  componentWillUnmount() {
      clearInterval(this.timerID);
  }
}

Game.propTypes = {
  tournament: PropTypes.array ,
};