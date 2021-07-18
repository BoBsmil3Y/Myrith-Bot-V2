const config = require("../config.json");

module.exports = {
  description: "Compte le nombre de membre connecté en temps réel.",
  run: client => {

    const server = client.guilds.cache.get(config.channels.guild);

    let onlineMembers = server.members.cache.filter(member => member.presence.status !== "offline").size;

    if (onlineMembers < 2)
      server.channels.cache.get(config.channels.onlineMember).setName(`🤵\u2009\u2009•\u2009\u2009${onlineMembers}\u2009\u2009en\u2009ligne.`);
    else
      server.channels.cache.get(config.channels.onlineMember).setName(`🤵\u2009\u2009•\u2009\u2009${onlineMembers}\u2009\u2009en\u2009lignes.`);
  }
};
