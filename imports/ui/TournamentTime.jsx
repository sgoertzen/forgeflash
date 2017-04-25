import React, { Component, PropTypes } from 'react';
import { Tournament } from '../api/tournament.js';

export default class TournamentTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
       secondsRemaining: 0,
    };
  }
 
  startTournament() {
    var tournament = (this.props.tournament && this.props.tournament.length > 0 && this.props.tournament[0]);
    Tournament.update(tournament._id, {$set:{started:true}});
  }
  endTournament() {
    var tournament = (this.props.tournament && this.props.tournament.length > 0 && this.props.tournament[0]);
    Tournament.update(tournament._id, {$set:{ended:true}});
  }

  resetTournament() {
    var tournament = (this.props.tournament && this.props.tournament.length > 0 && this.props.tournament[0]);
    Tournament.update(tournament._id, {$set:{started:false, ended:false}});
  }
 
  formatTime (sec_num) {
      var minutes = Math.floor(sec_num / 60);
      var seconds = sec_num - (minutes * 60);

      if (minutes < 10) {minutes = "0"+minutes;}
      if (seconds < 10) {seconds = "0"+seconds;}
      return minutes+':'+seconds;
  }

  render() {
    var tournament = (this.props.tournament && this.props.tournament.length > 0 && this.props.tournament[0]);
    var started = (tournament ? tournament.started : false);
    var admin = Meteor.user() && (Meteor.user().profile.steamid == "76561197970529465");

    return (
      <div className="timer">
      {tournament ? this.formatTime(this.props.tournament[0].timeAllowedSeconds) : '-' }
      {admin ? 
        <div>
          <a href="#" className="tinylink" onClick={this.startTournament.bind(this)}>Start</a><br/>
          <a href="#" className="tinylink" onClick={this.endTournament.bind(this)}>End</a><br/>
          <a href="#" className="tinylink" onClick={this.resetTournament.bind(this)}>Reset</a></div> : ''}
      </div>
    );
  }
}

TournamentTime.propTypes = {
  // This component gets the player to display through a React prop.
  // We can use propTypes to indicate it is required
  tournament: PropTypes.array,
};