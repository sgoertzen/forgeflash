import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';


import { Players } from '../api/players.js';
import { Tournament } from '../api/tournament.js';

import Game from './Game.jsx';
import Login from './Login.jsx';
import LoggedIn from './LoggedIn.jsx';
import Player from './Player.jsx';

// App component - represents the whole app
class App extends Component {

  renderPlayers() {
    let filteredPlayers = this.props.players
    filteredPlayers = filteredPlayers.filter(player => player.createdAt);
    return this.props.players.map((player) => (
      <Player key={player._id} player={player} />
    ));
  }

  renderTournament() {
    //var tourney = this.props.tournament.first()
    return (
      <h1>{ this.props.tournament }</h1>
    );
  }

  render() {
    return (
      <div className="container">
        <div className="header">
          <img width="800px" src="/images/default_header.jpg" alt="ForgeFlash"/>
        </div>
        <div className="content">
          {this.renderTournament()}
          { this.props.currentUser ? <LoggedIn/> : <Login/> }
          <Game/>
        </div>
        <div className="players">
          <ul>
            {this.renderPlayers()} 
          </ul>
        </div>
      </div>
    );
  }
}
App.propTypes = {
  players: PropTypes.array.isRequired,
  tournament: PropTypes.number.isRequired,
};
 
export default createContainer(() => {
  return {
    players: Players.find({}, {sort: {score: -1}}).fetch(),
    tournament: Tournament.find().fetch().length,
    currentUser: Meteor.user(),
  };
}, App);