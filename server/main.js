import { Meteor } from 'meteor/meteor';
import '../imports/api/players.js';
//import '../imports/api/tournament.js';
import { Tournament } from '../imports/api/tournament.js';

Meteor.startup(() => {
  // code to run on server at startup
  // Ensure we always have one Tournament
  var count = Tournament.find().count();
  if (count < 1 ) {
    Tournament.insert({ 
          started: false,
          timeAllowedSeconds: 600,
          startTime: null,
      });
  }
});
