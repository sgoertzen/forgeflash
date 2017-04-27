import { Meteor } from 'meteor/meteor';
import { Players } from '../imports/api/players.js';
import { Tournament } from '../imports/api/tournament.js';

Meteor.startup(() => {
  // Ensure we always have one Tournament
  var count = Tournament.find().count();
  if (count > 0 ) {
    Tournament.remove({});
  }
  Tournament.insert({ 
      endTime: null,
      ended: false,
      duration: 30,
      game: 'multitask',  // multitask or cursor 
      winner: null,
    });
  
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

Meteor.setInterval(function() {
  var tournament = Tournament.findOne({$query:{}});
  if (tournament.endTime && tournament.endTime < new Date() && !tournament.winner) {
    var topPlayer = Players.findOne({$query:{},$orderby:{score:1}})
    Tournament.update(tournament._id, {$set:{winner: topPlayer, ended: true}})
  }
}, 500);

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
    var steamavatarfull = results.data.response.players[0].avatarfull;
    
    Meteor.users.update({_id:Meteor.user()._id}, { $set: 
      { profile: {steamname: steamname, steamavatar: steamavatar, steamid: steamid, steamavatarfull: steamavatarfull }} }
    );

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
          steamavatarfull,
          createdAt: new Date(), // current time
          score: 0,
          scoreUpdatedAt: new Date()
        }
      }
    );
  })
});
