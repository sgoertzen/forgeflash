import React, { Component, PropTypes } from 'react';
import { Tournament } from '../api/tournament.js';

export default class TournamentTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
       timeremaining: 0,
    };
  }
 
  formatTime (sec_num) {
      var minutes = Math.floor(sec_num / 60);
      var seconds = sec_num - (minutes * 60);

      if (minutes < 10) {minutes = "0"+minutes;}
      if (seconds < 10) {seconds = "0"+seconds;}
      return minutes+':'+seconds;
  }

  render() {
    var adminSteamIds = ["76561197970529465"]
    var admin = Meteor.user() && (adminSteamIds.indexOf(Meteor.user().profile.steamid) >= 0 );

    var tournament = (this.props.tournament && this.props.tournament.length > 0 && this.props.tournament[0]);
    var started = (tournament ? tournament.endTime : false);
    
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