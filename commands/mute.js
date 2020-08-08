const {
  MessageEmbed
} = require("discord.js");
const ms = require("ms");

module.exports = {

  name: "mute",
  description: "Réduit au silence le membre donné.",
  usage: ".mute <@joueur> <temps> <raison>",
  permission: true,
  onlyAdmin: false,
  execute(client, message, args) {

    if (!message.guild.member(message.author).hasPermission('KICK_MEMBERS')) return;

    const sanctionChannel = message.guild.channels.cache.find(channel => channel.id === "739032782679834717"); // A changer
    const member = message.guild.members.cache.find(member => member.id === args[0].slice(3).replace(">", ""));
    let muteRole = message.guild.roles.cache.find(role => role.name === "mute");

    const muteTime = ms(args[1]);
    let why = "";

    for (let i = 2; i < args.length; i++) {
      why = why + args[i] + " ";
    }

    if (!member || muteTime === 0 || !args[2]) {
      message.author.send(`Tu as mal exécuté la commande. \nUsage : ${this.usage}. \nTa commande : ${message}`);
      message.delete();
      return;
    }

    if (member.roles.cache.find(role => role.id === muteRole)) {
      message.author.send(`${member} est déjà mute ! Tu ne peux donc pas le mute de nouveau !`);
      message.delete();
      return;
    }

    member.roles.add(muteRole).then(() => {

      setTimeout(() => {
        member.roles.remove(muteRole);
      }, muteTime);

    });

    const muteEmbed = new MessageEmbed()
      .setTitle("📢 Sanction Discord  |  Mute")
      .setDescription(`Tu as été rendu muet sur le serveur Discord à cause d'un de tes messages. Un message a été automatiquement envoyé dans le salon des sanctions du Staff. Si nous te voyons trop souvent là bas, tu seras définitivement banni du serveur !`)
      .addFields({
        name: `Durée`,
        value: `${args[1]}`,
        inline: true
      }, {
        name: `Raison`,
        value: `${why}`,
        inline: true
      })
      .setThumbnail(member.user.avatarURL())
      .setTimestamp()
      .setFooter("Myrith", client.user.avatarURL())
      .setColor("#ff5252");

    member.send(muteEmbed).then(() => {
      muteEmbed.setDescription(`» ${member.user} a été sanctionné par ${message.author}`);
      sanctionChannel.send(muteEmbed);
    });

  }

}