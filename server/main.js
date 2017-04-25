import { Meteor } from 'meteor/meteor';
import { Players } from '../imports/api/players.js';
import { Tournament } from '../imports/api/tournament.js';

Meteor.startup(() => {
  // Ensure we always have one Tournament
  var count = Tournament.find().count();
  if (count < 1 ) {
    Tournament.insert({ 
          started: false,
          ended: false,
          timeAllowedSeconds: 15,
          startTime: null,
      });
  }


  ServiceConfiguration.configurations.upsert(
    { service: 'steam' },
    {
      $set: {
        loginStyle: 'redirect',
        timeout: 10000
      }
    }
  );
});

Accounts.onLogin((user) => {
  var steamid = user.user.services.steam.id;
  var url = 'http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=0649D4EAC77DD2EB8682870489FE80CC&steamids=' + steamid

  HTTP.get(url, function(error, results) {
    if (error) {
      console.log("Unable to fetch the steam user details at " + url);
      console.log(error)
      return;
    }
    var steamname = results.data.response.players[0].personaname;
    var steamavatar = results.data.response.players[0].avatar;

    Meteor.users.update({_id:Meteor.user()._id}, { $set: { profile: {steamname: steamname, steamavatar: steamavatar, steamid: steamid }} });

    Players.upsert(
      { 
        // Selector
        _id: steamid }, 
      {
        // Values
        $set: {
          _id: steamid,
          steamname,
          steamavatar,
          createdAt: new Date(), // current time
          score: 0
        }
      }
    );
  })
});
