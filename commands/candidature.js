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
  execute(client, message, args) {

    const guild = message.guild;
    const idCandidatures = guild.channels.cache.find(channel => channel.name === "🎓•candidatures");
    const idCategorie = idCandidatures.parent;
    const member = message.author;

    let questionEmbed = new MessageEmbed().setTimestamp().setFooter("Myrith", client.user.avatarURL()).setColor("#4bcffa");
    let questions = [];
    let answers = [];
    let size = Object.keys(json["Candidature"]["questions"]).length;


    for (let i = 0; i < size; i++) {
      questions.push(json["Candidature"]["questions"][i + 1]);
    }

    if (guild.channels.cache.find(channel => channel.name === `candidature-${member.id}`)) {
      message.reply("Vous avez déjà votre salon de candidature !");
      message.delete();
    }


    guild.channels.create(
      `candidature-${member.id}`, {
        type: 'text',
        topic: `Salon de candidature créé par ${member.username} | Id du joueur : ${member.id}`,
        parent: idCategorie,
        permissionOverwrites: [{
          id: guild.id,
          deny: ['VIEW_CHANNEL']
        }, {
          id: member.id,
          allow: ['VIEW_CHANNEL']
        }]
      }).then(channel => {

      questionEmbed
        .setTitle(`Voici ton salon pour effectuer ta candidature.`)
        .setDescription(`Attention, tu devras lire attentivement les questions et y répondre en moins de 15 minutes chacunes! Soit le plus complet possible. Bonne chance <@${member.id}> !`);

      channel.send(questionEmbed);

      /* 
      Bouclé les questions selon 'questions' 
      Push les réponses,
      Envoyer le message dans le candidature + en Mp au joueur
      */
      const questionCall = async function () {
        for (let i = 0; i < size; i++) {

          questionEmbed = questionEmbed.setTitle(questions[i]).setTimestamp().setFooter(`Myrith - Question n°${i+1}/${size}`);
          channel.send(questionEmbed); //const question = await 
          const filter = response => response.author.id === member.id;

          const collected = await channel.awaitMessages(filter, {
            max: 1,
            time: 900000,
          })

          if (!collected.first()) {

            const errorEmbed = new MessageEmbed()
              .setTitle(`Candidature non-terminée de ${member.username}`)
              .setDescription(`${member} voici ta candidature qui n'a pas été fini ! Tu peux te permettre de copier / coller tes anciens messages si tu veux recréer une candidature.`)
              .setThumbnail(client.user.avatarURL())
              .setFooter("Myrith", client.user.avatarURL())
              .setColor("#ff5252");

            let i = 1;

            answers.forEach(answer => {
              errorEmbed.addField(`Question ${i}`, answer);
              i++;
            })

            if (answers.length < 1) member.send(errorEmbed);
            member.send(errorEmbed.setDescription(`${member}, tu n'as pas fini ta candidature, et nous n'avons trouvé aucune réponse de ta part ... As-tu eu un problème lors de la création de celle-ci ? Contacte le Staff au besoin !`))
            break;

          } else {
            answers.push(collected.first().content);
          }

        }
      }

      questionCall().then(() => {

        if (answers.length < 6) return;

        let finalCandidature = new MessageEmbed()
          .setAuthor(`Candidature de ${member.username} pour le rôle ${answers[0]}`, client.user.avatarURL())
          .setThumbnail(member.avatarURL)
          .setTimestamp()
          .setFooter("Myrith", client.user.avatarURL())
          .setColor("#9980FA");

        for (let j = 0; j < questions.length; j++) {
          if (j < 2) finalCandidature.addField(questions[j], answers[j], true);
          else finalCandidature.addField(questions[j], answers[j]);
        }

        idCandidatures.send(finalCandidature);
        member.send(finalCandidature);

        finishEmbed = new MessageEmbed()
          .setTitle(`Candidature finie !`)
          .setDescription(`Elle va être envoyé au Staff et en MP de ton côté ! Tu auras une réponse sous 72h. Le channel va être supprimé dans quelques secondes...`)
          .setTimestamp()
          .setFooter("Myrith", client.user.avatarURL())
          .setColor("#0be881");

        channel.send(finishEmbed);

        setTimeout(() => {
          channel.delete();
        }, 10000);

      });

    });


  }

}