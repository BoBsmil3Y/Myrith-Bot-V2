const { MessageEmbed } = require("discord.js");
const ms = require("ms");
const config = require("../config.json");


module.exports = {

    name: "remindus",
    description: "Envoi un message pour un rôle donné afin de rappeler un événement.",
    usage: ".remindus <@role> <temps> <raison>",
    permission: true,
    onlyAdmin: false,
    execute(client, message, args) {

        if (!message.guild.member(message.author).hasPermission('ADMINISTRATOR')) return;

        if (args.length < 3) {
            message.author.send(`Tu as mal exécuté la commande. \nUsage : ${this.usage}. \nTa commande : ${message}`);
            message.delete();
            return;
        }

        const logChannel = message.guild.channels.cache.get(config.channels.remindus);

        const roleToRemind = message.guild.roles.cache.get(args.shift().replace(/\D+/g, ''));
        const timeUntil = ms(args.shift());
        const reason = args.join(' ');
        let idMessage;

        if (!roleToRemind || timeUntil === 0 || !reason) {
            message.channel.send(`Il manque des arguments pour exécuter la commande. \nUsage : ${this.usage}. \nTa commande : ${message}`);
            message.delete();
            return;
        }

        const remindMeEmbed = new MessageEmbed()
            .setTitle(`⏰ Remind me later`)
            .setDescription(`Un reminder a été instancié pour le rôle : ${roleToRemind} \nPar ${message.author}.`)
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

        logChannel.send(remindMeEmbed).then(m => {
            idMessage = m.url;
        });

        setTimeout(() => {
            logChannel.send(`<@&${roleToRemind.id}> :arrow_double_down:`)
            const reminderEmbed = new MessageEmbed()
                .setTitle(`⏰ Remind me  |  Votre reminder est là !`)
                .addField('Raison :', reason)
                .addField('URL du message :', idMessage)
                .setTimestamp()
                .setFooter("Myrith", client.user.avatarURL())
                .setColor("#F97F51");
            logChannel.send(reminderEmbed);
        }, timeUntil);

        message.delete();

    }

}