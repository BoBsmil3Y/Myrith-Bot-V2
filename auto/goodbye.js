const Discord = require("discord.js");

module.exports = {

  description: "Dit au revoir au membre partie.",
  run: (bot, quitMember) => {

    const guild = bot.guilds.cache.find(guild => guild.id === "659141545307406342");
    const welcomeChannel = guild.channels.cache.find(channel => channel.id === "737770503246184532");

    const embed = new Discord.MessageEmbed()
      .setDescription(`» **${quitMember.user.username}** quitte le serveur ! 😭 Quelle tristesse ...`)
      .setColor("#525252")
      .setFooter("Myrith", bot.user.avatarURL())
      .setTimestamp();

    welcomeChannel.send(embed);

  }

};