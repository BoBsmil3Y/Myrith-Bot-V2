const { MessageEmbed } = require("discord.js");

module.exports = {

  description: "Souhaite la bienvenue aux nouveau membres.",
  run: (bot, newMember) => {

    const guild = bot.guilds.cache.find(guild => guild.id === "659141545307406342");
    const welcomeChannel = guild.channels.cache.find(channel => channel.id === "737770503246184532");

    const embed = new MessageEmbed()
      .setTitle(`Un nouveau membre apparaît !`)
      .setDescription(`» Bienvenue à **${newMember.user.username}** sur le serveur Discord ! 🎉`)
      .setColor("#ff7844")
      .setThumbnail(newMember.user.avatarURL())
      .setFooter("Myrith", bot.user.avatarURL())
      .setTimestamp();

    welcomeChannel.send(embed).then(message => {
      message.react('🥳');
      message.react('🎊');
    });

  }

};