const config = require("../config.json");

module.exports = {

  description: "Met à jour un compteur de membre.",

  run: client => {

    const server = client.guilds.cache.get(config.channels.guild);

    server.channels.cache.get(config.channels.memberCount).setName(`🔥\u2009\u2009•\u2009\u2009${server.memberCount}\u2009\u2009membres.`);

  }
}