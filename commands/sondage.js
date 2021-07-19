const { MessageEmbed } = require("discord.js");

module.exports = {

  name: "sondage",
  description: "Créer un embed avec la question indiqué. Les réactions sont automatiquement ajoutées.",
  usage: ".sondage <question>",
  permission: true,
  onlyAdmin: true,
  execute(client, message, args) {

    if (!message.guild.member(message.author).hasPermission('ADMINISTRATOR')) return;

    const anounceChannel = message.guild.channels.cache.get(config.channels.sondage);
    const question = args.join(' ');

    if (!question) {
      message.author.send(`Tu as mal exécuté la commande. \nUsage : ${this.usage}. \nTa commande : ${message}`);
      message.delete();
      return;
    }

    const questonEmbed = new MessageEmbed()
      .setTitle("❔  |  Sondage")
      .addField(`Question :`, `${question} \n\n*Ajouter une réaction pour donner votre avis.*`)
      .setTimestamp()
      .setFooter(`Question posée par ${message.author.username}`, client.user.avatarURL())
      .setColor("#74b9ff");

    anounceChannel.send(`<@&${config.roles.sondage}>`).then(() => {

      anounceChannel.send(questonEmbed)
        .then(m => {
          m.react(config.emotes.check);
          m.react(config.emotes.cross);
        });

    })

    message.delete();

  }

}