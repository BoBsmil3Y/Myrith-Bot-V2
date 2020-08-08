const {
  MessageEmbed
} = require("discord.js");

module.exports = {

  name: "unmute",
  description: "Redonne la parole au membre donnée.",
  usage: ".unmute <@joueur>",
  permission: true,
  onlyAdmin: false,
  execute(client, message, args) {

    if (!message.guild.member(message.author).hasPermission('KICK_MEMBERS')) return;

    const sanctionChannel = message.guild.channels.cache.find(channel => channel.id === "739032782679834717"); // A changer
    const member = message.guild.members.cache.find(member => member.id === args[0].slice(3).replace(">", ""));
    let muteRole = message.guild.roles.cache.find(role => role.name === "mute");

    if (!member) {
      message.author.send(`Tu as mal exécuté la commande. \nUsage : ${this.usage}. \nTa commande : ${message}`);
      message.delete();
      return;
    }

    if (!member.roles.cache.find(role => role.id === muteRole)) {
      message.author.send(`${member} n'est pas mute ! Tu ne peux donc pas le démute !`);
      message.delete();
      return;
    }

    member.roles.remove(muteRole);

    const muteEmbed = new MessageEmbed()
      .setTitle(":white_check_mark: Sanction Discord")
      .setDescription(`Tu as été unmute par ${message.author} !`)
      .setTimestamp()
      .setFooter("Myrith", client.user.avatarURL())
      .setColor("#0be881");

    member.send(muteEmbed).then(() => {
      muteEmbed.setDescription(`» ${member.user} a été démute par ${message.author}`);
      sanctionChannel.send(muteEmbed);
    });

  }

}