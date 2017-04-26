import { Meteor } from 'meteor/meteor';
import { Players } from '../imports/api/players.js';
import { Tournament } from '../imports/api/tournament.js';

Meteor.startup(() => {
  // Ensure we always have one Tournament
  var count = Tournament.find().count();
  if (count > 0 ) {
    Tournament.remove({});
  }
  // TODO: replace this with max score query
  var topPlayer = Players.find({score:0}).fetch()[0];
  console.log("Top player: " + topPlayer.steamname);
  Tournament.insert({ 
      endTime: null,
      ended: false,
      duration: 30,
      game: 'multitask',  // multitask or cursor 
      winner: topPlayer,
    });
  

  // setInterval(function() {
  //   console.log("checking for expired tournament");
  //   var tournaments = Tournament.find().count();
  //   console.log("count: " + tournaments);
  //   // if (!tournaments || tournaments.count() == 0) {
  //   //  console.log("No tournament found!");
  //   //  return;
  //   // }
  //   // var tournament = tournaments[0];
  //   // console.log("endtime" + tournament.endtime);
  //   // console.log("Server date: " + new Date());
  //   // if (tournament.endTime && tournament.endTime < new Date()) {
  //   //   console.log("Tournament ended!  Update the thing!")
  //   // }
  // }, 2000);

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
          createdAt: new Date(), // current time
          score: 0
        }
      }
    );
  })
});
