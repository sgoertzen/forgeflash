import React, { Component, PropTypes } from 'react';
import { Tournament } from '../api/tournament.js';

export default class TournamentTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
       timeremaining: 0,
    };
  }
 
  startTournament() {
    var tournament = (this.props.tournament && this.props.tournament.length > 0 && this.props.tournament[0]);
    var serverTime = TimeSync.serverTime();
    var endTime = serverTime + tournament.duration * 1000;
    Tournament.update(tournament._id, {$set:{endTime:endTime}});
  }
  endTournament() {
    var tournament = (this.props.tournament && this.props.tournament.length > 0 && this.props.tournament[0]);
    Tournament.update(tournament._id, {$set:{ended:true}});
  }

  resetTournament() {
    var tournament = (this.props.tournament && this.props.tournament.length > 0 && this.props.tournament[0]);
    Tournament.update(tournament._id, {$set:{endTime:null, ended:false}});
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
    var started = (tournament ? tournament.endTime : false);
    var admin = Meteor.user() && (Meteor.user().profile.steamid == "76561197970529465");

    var timeleft = '-';
    if (tournament && !started) {
      timeleft = this.formatTime(this.props.tournament[0].duration);
    } else if (tournament) {
      secondsLeft = Math.round((tournament.endTime - TimeSync.serverTime()) / 1000);
      if (secondsLeft > 0) {
        timeleft = this.formatTime(secondsLeft);
      } else {
        timeleft = this.formatTime(0);
      }
    }

    return (
      <div className="centered">
      <div className="timer">{timeleft}</div>
      {admin ? 
        <div>
          <a href="#" className="tinylink" onClick={this.startTournament.bind(this)}>Start</a><br/>
          <a href="#" className="tinylink" onClick={this.endTournament.bind(this)}>End</a><br/>
          <a href="#" className="tinylink" onClick={this.resetTournament.bind(this)}>Reset</a></div> : ''}
      </div>
    );
  }

  componentDidMount() {
    this.startCountdown();
  }

  componentWillUnmount() {
      stopCountdown();
  }

  startCountdown() {
    var that = this;
    if (!this.timerID) {
      this.timerID = setInterval(function() {   
          that.forceUpdate();
      },1000);
    }
  }

  stopCountdown() {
    if (this.timerID) {
      clearInterval(this.timerID);
    }
  }
}

TournamentTime.propTypes = {
  // This component gets the player to display through a React prop.
  // We can use propTypes to indicate it is required
  tournament: PropTypes.array,
};