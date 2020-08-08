const {
  MessageEmbed
} = require("discord.js");

module.exports = {

  name: "help",
  description: "Vous envois cette liste de commandes.",
  usage: ".help",
  permission: false,
  onlyAdmin: false,
  execute(client, message, args) {

    let staff;
    let author = message.guild.member(message.author);

    if (author.hasPermission('KICK_MEMBERS')) staff = true;

    const helpEmbed = new MessageEmbed()
      .setTitle(`:scroll:  Commandes du bot`)
      .setTimestamp()
      .setFooter("Myrith", client.user.avatarURL())
      .setColor("#9980FA");

    client.commands.forEach(command => {

      if (command.onlyAdmin && author.hasPermission('ADMINISTRATOR')) helpEmbed.addField(`• ${command.name}  |  ADMIN`, `Utilisation : **${command.usage}** \nDescription : *${command.description}*`);

      if (command.permission && staff && !command.onlyAdmin) helpEmbed.addField(`• ${command.name}  |  STAFF`, `Utilisation : **${command.usage}** \nDescription : *${command.description}*`);

      if (!command.permission && !command.onlyAdmin) helpEmbed.addField(`• ${command.name}`, `Utilisation : **${command.usage}** \nDescription : *${command.description}*`);

    });

    message.channel.send(helpEmbed).then(m => m.react("♥️"));
    message.delete();

  }
}