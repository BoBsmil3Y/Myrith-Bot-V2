const Discord = require("discord.js");
const config = require("../config.json");


module.exports = {

  description: "Dit au revoir au membre partie.",
  run: (bot, quitMember) => {

    console.log(quitMember.username + "a quitté");

    const guild = bot.guilds.cache.get(config.channels.guild);
    const welcomeChannel = guild.channels.cache.get(config.channels.welcome);

    const embed = new Discord.MessageEmbed()
      .setDescription(`» **${quitMember.user.username}** quitte le serveur ! 😭 Quelle tristesse ...`)
      .setColor("#3E3E3E")
      .setFooter("Myrith", bot.user.avatarURL())
      .setTimestamp();

    welcomeChannel.send(embed);

  }

};