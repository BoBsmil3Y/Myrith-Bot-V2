const {
  MessageEmbed
} = require("discord.js");
const json = require("../_questions.json");

module.exports = {

  name: "candidature",
  description: "Permet de créer sa candidature pour tenter de devenir un membre du Staff",
  usage: ".candidature",
  permission: false,
  onlyAdmin: false,
  async execute(client, message, args) {

    const guild = message.guild;
    const idCandidatures = guild.channels.cache.find(channel => channel.name === "🎓•candidatures");
    const idCategorie = idCandidatures.parent;

    let questionEmbed = new MessageEmbed().setTimestamp().setFooter("Myrith", client.user.avatarURL()).setColor("#4bcffa");
    let questions = [];
    let answers = [];


    for (let i = 0; i < Object.keys(json["Candidature"]["questions"]).length; i++) {
      questions.push(json["Candidature"]["questions"][i + 1]);
    }

    if (guild.channels.find(channel => channel.name === `candidature-${m.author.id}`)) {
      message.reply("Vous avez déjà votre salon de candidature !");
      message.delete();
    }


    m.guild.createChannel(
      `candidature-${m.author.id}`, {
        type: 'text',
        topic: `Salon de candidature créé par ${m.author.username} | Id du joueur : ${m.author.id}`,
        parent: idCategorie,
        permissionOverwrites: [{
          id: m.guild.id,
          deny: ['VIEW_CHANNEL']
        }, {
          id: m.author.id,
          allow: ['VIEW_CHANNEL']
        }]
      }).then(chan => {

      questionEmbed
        .setTitle(`Voici ton salon pour effectuer ta candidature.`)
        .setDescription(`Attention, tu devras lire attentivement les questions et y répondre en moins de 10 minutes chacunes! Soit le plus complet possible. Bonne chance <@${m.author.id}> !`);

      /* 
      Bouclé les questions selon 'questions' 
      Push les réponses,
      Envoyer le message dans le candidature + en Mp au joueur
      */

      chan.send(questionEmbed);

      const filter = response => response.author.id === m.author.id;

      let question = new Discord.RichEmbed().setTitle(questions[0]).setTimestamp().setFooter(`Myrith - Question n°1/7`).setColor("#0fbcf9");

      chan.send(question)
      chan.awaitMessages(filter, {
        max: 1,
        time: 600000
      }).then(collected => {

        answers.push(collected.first().content);

        let finalCandidature = new Discord.RichEmbed()
          .setAuthor(`Candidature de ${m.author.username} pour le rôle ${answers[0]}`, bot.user.avatarURL)
          .setTitle(questions[1])
          .setDescription(answers[1])
          .addField(questions[2], answers[2])
          .addField(questions[3], answers[3])
          .addField(questions[4], answers[4])
          .addField(questions[5], answers[5])
          .addField(questions[6], answers[6])
          .setThumbnail(m.author.avatarURL)
          .setTimestamp()
          .setFooter(`Myrith - Candidature`, bot.user.avatarURL)
          .setColor("#05c46b");

        m.guild.channels.find(c => c.id === idAdminCandid).send(finalCandidature);

        m.author.send(`Voici votre candidature ${m.author.username} !`);
        m.author.send(finalCandidature);

        chan.delete(5000);


      }).catch(() => {
        m.author.send("Tu n'as pas répondu dans le temps indiqué ! Tu vas devoir recommencer. Retourne dans le salon pour effectuer la commande.");
        chan.delete(5000);
      });


    });

  }

}