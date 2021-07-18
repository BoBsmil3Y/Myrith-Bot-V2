const config = require("../config.json");
const request = require('request');

module.exports = {
  description: "Compte le nombre de membre connecté en temps réel.",
  run: async client => {

    const server = client.guilds.cache.get(config.channels.guild);

    let onlineMembers = await request('https://discord.com/api/v9/invites/' + config.invite + '?with_counts=true', function (error, response, body) {

      console.error('error:', error);
      const res = JSON.parse(body);

      onlineMembers = res.approximate_presence_count;

      if (onlineMembers < 2)
        server.channels.cache.get(config.channels.onlineMember).setName(`🤵\u2009\u2009•\u2009\u2009${onlineMembers}\u2009\u2009en\u2009ligne.`);
      else
        server.channels.cache.get(config.channels.onlineMember).setName(`🤵\u2009\u2009•\u2009\u2009${onlineMembers}\u2009\u2009en\u2009lignes.`);
    });


  }
};
