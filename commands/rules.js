const {
  MessageEmbed
} = require("discord.js");

module.exports = {

  name: "rules",
  description: "Envoi les règles du Discord sous forme d'image.",
  usage: ".rules",
  permission: false,
  onlyAdmin: false,
  execute(client, message, args) {

    const rulesEmbed = new MessageEmbed()
      .setAuthor("📑  |  Règles Discord")
      .setDescription("*» Si vous êtes sur PC et que vous avez du mal à lire, cliquez sur l'image, puis cliquez sur 'Ouvrir l'original'*.")
      .attachFiles(['./images/rules.png'])
      .setImage('attachment://rules.png')
      .setThumbnail(client.user.avatarURL())
      .setTimestamp()
      .setFooter("Myrith", client.user.avatarURL())
      .setColor("#9980FA");

    message.channel.send(rulesEmbed).catch(console.error);
    message.delete();

  }

}