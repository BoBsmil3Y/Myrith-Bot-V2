module.exports = {

  description: "Met à jour un compteur de membre.",

  run: (client, member) => {

    const guild = member.guild;

    guild.channels.cache.get("742469804987777105").setName(`🔥\u2009\u2009•\u2009\u2009${guild.memberCount}\u2009\u2009membres.`);

  }
}