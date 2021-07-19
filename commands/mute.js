const { MessageEmbed } = require("discord.js");
const ms = require("ms");
const config = require("../config.json");


module.exports = {

  name: "mute",
  description: "Réduit au silence le membre donné.",
  usage: ".mute <@joueur> <temps> <raison>",
  permission: true,
  onlyAdmin: false,
  execute(client, message, args) {

    if (!message.guild.member(message.author).hasPermission('KICK_MEMBERS')) return;

    if (args.length < 3) {
      message.author.send(`Tu as mal exécuté la commande. \nUsage : ${this.usage}. \nTa commande : ${message}`);
      message.delete();
      return;
    }

    const sanctionChannel = message.guild.channels.cache.get(config.channels.sanction);
    const muteRole = message.guild.roles.cache.get(config.roles.mute);
    const member = message.guild.members.cache.get(message.mentions.users.first().id);
    let trash = args.shift();
    const muteTime = ms(args.shift());
    const reason = args.join(' ');

    if (!member || muteTime === 0) {
      message.author.send(`Tu as mal exécuté la commande. \nUsage : ${this.usage}. \nTa commande : ${message}`);
      message.delete();
      return;
    }

    if (member.roles.cache.find(role => role === muteRole)) {
      message.author.send(`${member} est déjà mute ! Tu ne peux donc pas le mute de nouveau !`);
      message.delete();
      return;
    }

    member.roles.add(muteRole).then(() => {

      setTimeout(() => {
        if (member.roles.cache.find(role => role === muteRole))
          member.roles.remove(muteRole);
        else
          sanctionChannel.send(`**Erreur** Impossible d'enlever le grade 'mute' du membre : _${member.user.username}_, il n'est pas mute.`)
      }, muteTime);

    });

    const muteEmbed = new MessageEmbed()
      .setTitle("📢 Sanction Discord  |  Mute")
      .setDescription(`Tu as été rendu muet sur le serveur Discord à cause d'un de tes messages. Un message a été automatiquement envoyé dans le salon des sanctions du Staff. Si nous te voyons trop souvent là bas, tu seras définitivement banni du serveur !`)
      .addFields({
        name: `Durée`,
        value: `${ms(muteTime, { long: true })}`,
        inline: true
      }, {
        name: `Raison`,
        value: `${reason}`,
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

    message.delete();

  }

}