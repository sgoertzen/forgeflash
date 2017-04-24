import React, { Component, PropTypes } from 'react';
import { Players } from '../api/players.js';

// Task component - represents a single todo item
export default class Player extends Component {
 
  deleteThisPlayer() {
    Players.remove(this.props.player._id);
  }

  render() {
    return (
      <li>
        <button className="delete" onClick={this.deleteThisPlayer.bind(this)}>
            &times;
          </button>
        <img className="avatar" src={this.props.player.steamavatar}/><span className="text">{this.props.player.steamname} ({this.props.player.score})</span>
      </li>
    );
  }
}
 
Player.propTypes = {
  // This component gets the player to display through a React prop.
  // We can use propTypes to indicate it is required
  player: PropTypes.object.isRequired,
};