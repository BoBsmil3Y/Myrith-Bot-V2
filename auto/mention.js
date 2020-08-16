const { MessageEmbed } = require("discord.js");

module.exports = {

  description: "Envoi un message privée au membre mentionné s'il fait partie du Staff.",

  run: (client, message) => {

    if (message.author.bot) return;

    const mention = message.mentions.users.first();

    if (!mention) return;
    if (!message.member.hasPermission("KICK_MEMBERS")) return;

    const guild = message.guild;

    const category = ["659141545307406343", "659145015024680960", "742013658418118708"];


    category.forEach(item => {

      let actualCategory = guild.channels.cache.get(item);

      if (actualCategory.children.get(message.channel.id)) {
        mentionEmbed = new MessageEmbed()
          .setTitle(":man_detective:  Mention")
          .setDescription(`Tu as été mentionné par ${message.author} dans le salon ${message.channel}`)
          .setTimestamp()
          .setFooter("Myrith", client.user.avatarURL())
          .setColor("#f1f2f6");

        mention.send(mentionEmbed);
      }

    })

  }
}