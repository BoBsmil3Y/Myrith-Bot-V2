const { MessageEmbed } = require("discord.js");
const config = require("../config.json");

module.exports = {

  description: "Souhaite la bienvenue aux nouveau membres.",
  run: (bot, newMember) => {

    const guild = bot.guilds.cache.get(config.channels.guild);
    const welcomeChannel = guild.channels.cache.get(config.channels.welcome);

    const embed = new MessageEmbed()
      .setTitle(`Un nouveau membre apparaît !`)
      .setDescription(`» Bienvenue à **${newMember.user.username}** sur le serveur Discord ! 🎉`)
      .setColor("#F5BF5D")
      .setThumbnail(newMember.user.displayAvatarURL())
      .setFooter("Myrith", bot.user.displayAvatarURL())
      .setTimestamp();

    welcomeChannel.send(embed).then(message => {
      message.react('🥳');
      message.react('🎊');
    });

  }

};