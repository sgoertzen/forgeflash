import { Meteor } from 'meteor/meteor';
import '../imports/api/players.js';

Meteor.startup(() => {
  // code to run on server at startup
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
// Accounts.onCreateUser((options, user) => {
// });

Accounts.onLogin((user) => {
  var steamid = user.user.services.steam.id;
  var url = 'http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=0649D4EAC77DD2EB8682870489FE80CC&steamids=' + steamid

  HTTP.get(url, function(error, results) {
    var steamname = results.data.response.players[0].personaname;
    var steamavatar = results.data.response.players[0].avatar;

    Meteor.users.update({_id:Meteor.user()._id}, { $set: { profile: {steamname: steamname, steamavatar: steamavatar }} });
  })
});
