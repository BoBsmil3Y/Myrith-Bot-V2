const {
  MessageEmbed
} = require("discord.js");

module.exports = {

  name: "delete",
  description: "Supprime le nombre de message demandé. Ne peut pas supprimer les messages de plus de 14 jours.",
  usage: ".delete <nombre>",
  permission: true,
  onlyAdmin: false,
  execute(client, message, args) {

    const author = message.guild.member(message.author);

    if (!author.hasPermission('BAN_MEMBERS')) return;


    const deleteCount = parseInt(args[0], 10);

    if (!deleteCount || deleteCount < 1 || deleteCount > 100) return;

    message.channel.bulkDelete(deleteCount + 1).catch(error => message.reply(`Couldn't delete messages because of: ${error}`));


  }
}