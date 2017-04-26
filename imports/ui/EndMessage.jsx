import React, { Component, PropTypes } from 'react';
import { Players } from '../api/players.js';

// Task component - represents a single todo item
export default class EndMessage extends Component {
 
  render() {
    var admin = Meteor.user() && (Meteor.user().profile.steamid == "76561197970529465");
    var tournament = (this.props.tournament && this.props.tournament.length > 0 && this.props.tournament[0]);
    var ended = (tournament && tournament.ended);

    if (!ended) { 
        return <div></div>
    }

    return (
      <div className="EndMessage">
        <div className="">Tournament complete!

            {tournament.winner ? 
            <div className="winner">
                <div className="title">
                    <img className="avatarfull" src={tournament.winner.steamavatarfull} width="100px" height="100px"/> 
                    {tournament.winner.steamname}
                </div>
                was our winner with a score of <span className="score">{tournament.winner.score}</span>
            </div> : '' }
        </div>
      </div>
    );
  }
}
 
EndMessage.propTypes = {
  // This component gets the player to display through a React prop.
  // We can use propTypes to indicate it is required
  players: PropTypes.array.isRequired,
  tournament: PropTypes.array.isRequired,
};