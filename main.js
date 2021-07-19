const { Client, Collection, Intents } = require("discord.js");
const intents = new Intents([Intents.NON_PRIVILEGED, "GUILD_MEMBERS", "GUILD_PRESENCES"]);
const config = require("./config.json");
const fs = require("fs");

const client = new Client();
const prefix = config.prefix;

client.commands = new Collection();

const commandsFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

client.on("ready", () => {

  for (const file of commandsFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
  }

  console.log(`${client.user.username} est en ligne !`);
  client.user.setActivity("#𝘗𝘓𝘈𝘠.𝘔𝘠𝘙𝘐𝘛𝘏.COM 🥳");
  console.log("\nMain start ---------------------------\n");

  try {
    let commandFile = require(`./auto/onlineCount.js`);
    commandFile.run(client);
    commandFile = require(`./auto/memberCount.js`);
    commandFile.run(client);
  } catch (error) {
    console.error(error);
  }

  //client.emit("guildMemberAdd", client);
});

client.on("message", (message) => {
  /* Launch mention controller */
  try {
    let commandFile = require(`./auto/mention.js`);
    commandFile.run(client, message);
    if (message.channel === client.channels.cache.get(config.channels.first)) {
      let commandFile = require(`./auto/first.js`);
      commandFile.run(client, message, config.channels.first);
    }
  } catch (error) {
    console.error(error);
  }

  if (!message.content.startsWith(prefix) | message.author.client) return;
  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if (!client.commands.has(command)) return;
  client.commands.get(command).execute(client, message, args);
});

client.on("guildMemberAdd", (member) => {
  console.log("déclencher add");
  try {
    let commandFile = require(`./auto/memberCount.js`);
    commandFile.run(client, member);
    commandFile = require(`./auto/welcome.js`);
    commandFile.run(client, member);
  } catch (error) {
    console.error(error);
  }
});

client.on("guildMemberRemove", (member) => {
  try {
    let commandFile = require(`./auto/memberCount.js`);
    commandFile.run(client, member);
    console.log("commandFile 2");
    commandFile = require(`./auto/goodbye.js`);
    commandFile.run(client, member);
  } catch (error) {
    console.error(error);
  }
});

client.on("presenceUpdate", (oldPresence, newPresence) => {
  try {
    let commandFile = require(`./auto/onlineCount.js`);
    commandFile.run(client, oldPresence, newPresence);
  } catch (error) {
    console.error(error);
  }
});

// Colect old reaction
client.on("messageReactionAdd", async (reaction, user) => {
  if (reaction.partial) {
    try {
      await reaction.fetch();
    } catch (error) {
      console.error("Something went wrong when fetching the message: ", error);
      return;
    }
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
