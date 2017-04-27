import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Players } from '../api/players.js';
import { Tournament } from '../api/tournament.js';

export default class WaitMessage extends Component {

  render() {
    return (
      <div>
        <div className="centered"><h3>You are all set!  Just wait for the tournament to start!</h3></div>
        <div className="centered"><img src="/images/orange-hourglass-hi.png"/></div>
      </div>
    );
  }

}

WaitMessage.propTypes = {
};