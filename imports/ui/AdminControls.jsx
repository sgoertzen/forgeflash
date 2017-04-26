import React, { Component, PropTypes } from 'react';
import { Players } from '../api/players.js';
import { Tournament } from '../api/tournament.js';

// Task component - represents a single todo item
export default class AdminControls extends Component {
 
  startTournament() {
    var tournament = (this.props.tournament && this.props.tournament.length > 0 && this.props.tournament[0]);
    var serverTime = TimeSync.serverTime();
    var endTime = serverTime + tournament.duration * 1000;
    Tournament.update(tournament._id, {$set:{endTime:endTime}});
  }
  endTournament() {
    var tournament = (this.props.tournament && this.props.tournament.length > 0 && this.props.tournament[0]);
    Tournament.update(tournament._id, {$set:{ended:true, endTime:TimeSync.serverTime()}});
  }

  resetTournament() {
    var tournament = (this.props.tournament && this.props.tournament.length > 0 && this.props.tournament[0]);
    Tournament.update(tournament._id, {$set:{endTime:null, ended:false}});
    this.props.players.map((player) => 
      Players.update(player._id, {$set: { score: 0}})
    );
  }
 
  switchGame() {
    var tournament = (this.props.tournament && this.props.tournament.length > 0 && this.props.tournament[0]);
    var newGame = tournament.game == "cursor" ? "multitask" : "cursor";
    Tournament.update(tournament._id, {$set: {game:newGame}})
  }
  render() {
    var adminSteamIds = ["76561197970529465"]
    var admin = Meteor.user() && (adminSteamIds.indexOf(Meteor.user().profile.steamid) >= 0 );
    var tournament = (this.props.tournament && this.props.tournament.length > 0 && this.props.tournament[0]);

    if (!admin) { 
        return <div></div>
    }

    return (
      <div className="AdminControls">
        Current Game: <b>{tournament.game}</b>  <a href="#" onClick={this.switchGame.bind(this)}>Switch Game</a> 
        <a href="#" onClick={this.startTournament.bind(this)}>Start</a>
        <a href="#" onClick={this.endTournament.bind(this)}>End</a>
        <a href="#" onClick={this.resetTournament.bind(this)}>Reset</a>
        
      </div>
    );
  }
}
 
AdminControls.propTypes = {
  // This component gets the player to display through a React prop.
  // We can use propTypes to indicate it is required
  players: PropTypes.array.isRequired,
  tournament: PropTypes.array.isRequired,
};