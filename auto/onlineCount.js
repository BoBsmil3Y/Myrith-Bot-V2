module.exports = {

  description: "Compte le nombre de membre connecté en temps réel.",
  run: (client, oldPresence, newPresence) => {

    if (newPresence.member.presence.status !== newPresence.member.presence.status || newPresence.user.bot) return;

    const guild = newPresence.member.guild;
    const online = guild.members.cache.filter(member => (member.presence.status === ("online") | member.presence.status === ("idle") | member.presence.status === ("dnd")) && !member.user.bot);

    guild.channels.cache.get("744120600028774440").setName(`🤵\u2009\u2009•\u2009\u2009${online.size}\u2009\u2009en\u2009lignes.`);

  }

};