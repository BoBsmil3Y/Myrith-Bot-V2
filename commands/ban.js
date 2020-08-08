const {
  MessageEmbed
} = require("discord.js");

module.exports = {

  name: "ban",
  description: "Banni le membre selectionné",
  usage: ".ban <@joueur> <raison>",
  permission: true,
  onlyAdmin: false,
  execute(client, message, args) {

    if (!message.guild.member(message.author).hasPermission('BAN_MEMBERS')) return;

    const sanctionChannel = message.guild.channels.cache.find(channel => channel.id === "739032782679834717"); // A changer
    const member = message.guild.members.cache.find(member => member.id === args[0].slice(3).replace(">", ""));

    let why = "";

    for (let i = 1; i < args.length; i++) {
      why = why + args[i] + " ";
    }

    if (!member || !args[1]) {
      message.author.send(`Tu as mal exécuté la commande. \nUsage : ${this.usage}. \nTa commande : ${message}`);
      message.delete();
      return;
    }

    console.log(`Args ${args}`)
    console.log(`Args ${args[1]}`)
    console.log(`Raison ${why}`)

    const muteEmbed = new MessageEmbed()
      .setTitle("📢 Sanction Discord  |  Ban")
      .setDescription(`Tu as été banni du serveur Discord. Tes messages envoyés ces derniers jours ont été supprimé.`)
      .addFields({
        name: `Raison`,
        value: `${why}`
      })
      .setThumbnail(member.user.avatarURL())
      .setTimestamp()
      .setFooter("Myrith", client.user.avatarURL())
      .setColor("#ff5252");

    member.send(muteEmbed).then(() => {
      muteEmbed.setDescription(`» ${member.user} a été sanctionné par ${message.author}`);
      sanctionChannel.send(muteEmbed);

      member.ban({
        days: 7,
        reason: why
      }).catch(console.error);

    });



  }

}