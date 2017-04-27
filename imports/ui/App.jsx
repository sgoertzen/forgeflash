import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';


import { Players } from '../api/players.js';
import { Tournament } from '../api/tournament.js';

import AdminControls from './AdminControls.jsx'
import Game from './Game.jsx';
import Login from './Login.jsx';
import LoggedIn from './LoggedIn.jsx';
import Player from './Player.jsx';
import TournamentTime from './TournamentTime.jsx';
import EndMessage from './EndMessage.jsx';
import WaitMessage from './WaitMessage.jsx';

// App component - represents the whole app
class App extends Component {

  renderPlayers() {
    return this.props.players.map((player) => (
      <Player key={player._id} player={player} />
    ));
  }

  render() {
    var tournament = (this.props.tournament && this.props.tournament.length > 0 ? this.props.tournament[0] : null);
    var started = (tournament ? tournament.endTime : false);
    var ended = (tournament ? tournament.ended : false);

    return (
      <div className="container">
        <div className="header">
          <img width="800px" src="/images/default_header.jpg" alt="ForgeFlash"/>
        </div>
        <div className="content">
          { this.props.currentUser ? <LoggedIn/> : <Login/> }
          <AdminControls tournament={this.props.tournament} players={this.props.players}/>
          { Meteor.userId() && !started && !ended ? <WaitMessage/> : '' }
          { Meteor.userId() && started && !ended ? <Game tournament={this.props.tournament}/> : '' }
          <EndMessage tournament={this.props.tournament} players={this.props.players}/>
        </div>
        <div className="players">
          <ul>
            <li><TournamentTime tournament={this.props.tournament}/></li>
            {this.renderPlayers()} 
          </ul>
        </div>
      </div>
    );
  }
}
App.propTypes = {
  players: PropTypes.array.isRequired,
  tournament: PropTypes.array.isRequired,
};
 
export default createContainer(() => {
  return {
    players: Players.find({}, {sort: {score: -1}}).fetch(),
    tournament: Tournament.find().fetch(),
    currentUser: Meteor.user(),
  };
}, App);