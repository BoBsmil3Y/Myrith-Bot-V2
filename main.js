const {
  Client,
  Collection
} = require("discord.js");
const config = require("./config.json");
const fs = require("fs");

const client = new Client();
const prefix = config.prefix;
client.commands = new Collection();

const commandsFiles = fs.readdirSync('./commands').filter(file => file.endsWith(".js"));


client.on("ready", () => {

  for (const file of commandsFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
  }

  console.log(client.commands);

  console.log(`${client.user.username} est en ligne !`);
  client.user.setActivity("#𝘗𝘓𝘈𝘠.𝘔𝘠𝘙𝘐𝘛𝘏.COM 🥳");

});

client.on("message", message => {
  if (!message.content.startsWith(prefix) | message.author.client) return;
  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if (!client.commands.has(command)) return;
  client.commands.get(command).execute(client, message, args);

});

client.on("guildMemberAdd", member => {

  try {
    let commandFile = require(`./auto/welcome.js`);
    commandFile.run(client, member);
  } catch (error) {
    console.error(error);
  }

});

client.on("guildMemberRemove", member => {

  try {
    let commandFile = require(`./auto/goodbye.js`);
    commandFile.run(client, member);
  } catch (error) {
    console.error(error);
  }

});

client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));
client.on("debug", (e) => console.info(e));

client.login(config.token);



/*
  TODO
  - Changer les ID des salons bienvenue (goodbye.js & welcome.js), du salon sanction (mute.js & ban.js)

*/