const { MessageEmbed } = require("discord.js");
const config = require("../config.json");


module.exports = {

  description: "Envoi un message privée au membre mentionné s'il fait partie du Staff.",

  run: (client, message) => {

    if (message.author.bot) return;

    const mention = message.mentions.users.first();

    if (!mention) return;
    if (!message.guild.members.cache.get(mention.id).hasPermission("KICK_MEMBERS")) return;

    const categories = config.channels.categoryToTrackMention;
    const idCategory = message.channel.parentID;

    if (!categories.includes(idCategory)) return;

    let actualCategory = message.guild.channels.cache.get(idCategory);

    if (actualCategory.children.get(message.channel.id)) {
      mentionEmbed = new MessageEmbed()
        .setTitle(":man_detective:  Mention")
        .setDescription(`${mention} a été mentionné par ${message.author} dans le salon ${message.channel}`)
        .setTimestamp()
        .setFooter("Myrith", client.user.avatarURL())
        .setColor("#f1f2f6");

      let logChannel = message.guild.channels.cache.get(config.channels.log);
      logChannel.send(mentionEmbed);
    }

  }
}