import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Players } from '../api/players.js';
import { Tournament } from '../api/tournament.js';

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
       highScore: 0,
       player: null,
    };
  }
 
  handlePlayerCreated(error, player_id) {
    let player = Players.findOne(player_id);
    // this.state.player = player;
    // this.forceUpdate();
    this.setState({
        player: player
    });
  }
  
  handlePlayerSubmit(event) {
    event.preventDefault();
 
    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
 
    Players.insert({
      text,
      createdAt: new Date(), // current time
      score: 0
    }, this.handlePlayerCreated.bind(this));
 
    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
    
    this.timerID = setInterval(
      () => this.tick(getFlashMovieObject("myFlashMovie").GetVariable("_root.score")),
      1000
    );
        Tournament.insert({ 
        started: false,
        timeAllowedSeconds: 600,
        startTime: null,
    });
  }

  render() {
    //var tourney = Tournament.findOne().fetch();
    return <div>
        <header>
        <span>Forge Flash </span>
        <span> tournament.timeAllowedSeconds </span>
        { !this.state.player ? 
            <form className="new-player" onSubmit={this.handlePlayerSubmit.bind(this)} >
                <input
                type="text"
                ref="textInput"
                placeholder="Enter your gaming handle and press enter"
                />
            </form> : 
            <h2>Welcome {this.state.player.text}</h2>
        }
        </header>
        { this.state.player ? 
            <div>
                <h3>Your highest score: {this.state.highScore}</h3>
                <object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="" id="myFlashMovie" width="600" height="430">
                    <param name="movie" value="/images/multitask.swf"/>
                    <embed play="false" swliveconnect="true" name="myFlashMovie" src="/images/multitask.swf" quality="high" bgcolor="#FFFFFF" width="600" height="430" type="application/x-shockwave-flash">
                    </embed>
                </object>
            </div>
            : '' 
         }
        
        </div>;
  }

  tick(score) {
    score = parseInt(score)
    if (score > this.state.highScore)
    {
        this.setState({
            highScore: score
        });
        Players.update(this.state.player._id, {$set: { score: score }})
    }
  }

  componentDidMount() {
  }

  componentWillUnmount() {
      clearInterval(this.timerID);
  }
}
 
Game.propTypes = {
  //tournament: PropTypes.array.isRequired,
};