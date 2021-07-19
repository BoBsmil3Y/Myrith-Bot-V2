const { MessageEmbed } = require("discord.js");
const ms = require("ms");


module.exports = {

    name: "remindme",
    description: "Envoi un message pour rappeler un événement.",
    usage: ".remindme <temps> <raison>",
    permission: false,
    onlyAdmin: false,
    execute(client, message, args) {

        if (args.length < 2) {
            message.author.send(`Tu as mal exécuté la commande. \nUsage : ${this.usage}. \nTa commande : ${message}`);
            message.delete();
            return;
        }

        const memberToRemind = message.author;
        const timeUntil = ms(args.shift());
        const reason = args.join(' ');

        if (!memberToRemind || timeUntil === 0 || !reason) {
            message.channel.send(`Il manque des arguments pour exécuter la commande. \nUsage : ${this.usage}. \nTa commande : ${message}`);
            message.delete();
            return;
        }

        const remindMeEmbed = new MessageEmbed()
            .setTitle(`⏰ Remind me later`)
            .setDescription(`Un reminder a été instancié pour ${memberToRemind}.`)
            .addFields({
                name: `Durée`,
                value: `${ms(timeUntil, { long: true })}`,
                inline: true
            }, {
                name: `Raison`,
                value: `${reason}`,
                inline: true
            })
            .setThumbnail(message.author.avatarURL())
            .setTimestamp()
            .setFooter("Myrith", client.user.avatarURL())
            .setColor("#F5BF5D");

        let urlMessage;

        const lastMessages = message.channel.messages.fetch({ limit: 2 }).then(messages => {
            let bool = true;
            let cpt = 2;
            while (bool && cpt > 0) {
                let last = messages.first();
                if (!last.author.bot) {
                    urlMessage = last.url;
                    bool = false;
                    break;
                } else cpt--;
            }
        });

        message.delete();
        memberToRemind.send(remindMeEmbed);

        setTimeout(() => {
            const reminderEmbed = new MessageEmbed()
                .setTitle(`⏰ Remind me  |  Votre reminder est là !`)
                .addField('Raison :', reason)
                .addField('URL du message :', urlMessage)
                .setTimestamp()
                .setFooter("Myrith", client.user.avatarURL())
                .setColor("#F97F51");
            memberToRemind.send(reminderEmbed);
        }, timeUntil);

    }

}