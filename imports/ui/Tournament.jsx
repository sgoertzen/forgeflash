import React, { Component, PropTypes } from 'react';

export default class Tournament extends Component {
  render() {
      // {this.props.tournament.timeAllowedSeconds}
     return <h1>hi</h1>;
  }
}

Tournament.propTypes = {
  // This component gets the player to display through a React prop.
  // We can use propTypes to indicate it is required
  //tournament: PropTypes.object.isRequired,
};