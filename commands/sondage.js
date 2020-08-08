const {
  MessageEmbed
} = require("discord.js");

module.exports = {

  name: "sondage",
  description: " ",
  usage: ".sondage <question>",
  permission: true,
  onlyAdmin: true,
  execute(client, message, args) {

    if (!message.guild.member(message.author).hasPermission('ADMINISTRATOR')) return;

    const anounceChannel = message.guild.channels.cache.find(channel => channel.id === "737770503246184532"); // A changer (mettre annonce)

    const emojiCheck = ("741393370328596520");
    const emojiCross = ("741393381145575475");

    let question = "";

    for (let i = 0; i < args.length; i++) {
      question = question + args[i] + " ";
    }

    if (!question) {
      message.author.send(`Tu as mal exécuté la commande. \nUsage : ${this.usage}. \nTa commande : ${message}`);
      message.delete();
      return;
    }

    message.delete();

    const questonEmbed = new MessageEmbed()
      .setTitle("❔  |  Sondage")
      .addField(`Question :`, `${question} \n\n*Ajouter une réaction pour donner votre avis.*`)
      .setTimestamp()
      .setFooter(`Question posée par ${message.author.username}`, client.user.avatarURL())
      .setColor("#4bcffa");

    anounceChannel.send(questonEmbed).then(m => {
      m.react(emojiCheck);
      m.react(emojiCross);
    });

  }

}