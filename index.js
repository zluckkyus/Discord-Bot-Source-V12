const Discord = require('discord.js')
const fs = require('fs')
const client = new Discord.Client()
const db = require('quick.db')
const {blue} = require('foguetecolors')
const PREFIX = '!'

// --- functions
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = fs.readdirSync("./comandos/");
["command"].forEach(x => require(`./functions/${x}`)(client));

// --- Cliente Quando estiver Online
client.on('ready', () => {
  console.log(blue("Bot Online"))
})

// --- Status
client.on('ready', () => {
  let status = [
    `Discord.js`,
    `${client.users.cache.size} pessoas me conhecem e estou em ${client.guilds.cache.size} servidores!`,
    `Open-Source Criado por $rLuckkyz`
    ],
    i = 0;
    setInterval(() => client.user.setActivity(`${status[i++ % status.length]}`, {
      type: "WATCHING"
    }), 500 * 60); //os tipos são PLAYING, WATCHING, LISTENING, STREAMING
    client.user.setStatus("online") //vc pode altera para online, dnd, idle, invisible
})
// --- Handler
client.on('message', async message => {
    let prefix;
    if (message.author.bot || message.channel.type === "dm") return;
        try {
            let fetched = await db.fetch(`prefix_${message.guild.id}`);
            if (fetched == null) {
                prefix = PREFIX
            } else {
                prefix = fetched
            }
        } catch (e) {
            console.log(e)
    };
    if(!message.content.startsWith(prefix)) return;
    if(!message.guild) return;
    if(!message.member) message.member = await message.guild.fetchMember(message);
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if(cmd.length == 0 ) return;
    let command = client.commands.get(cmd)
    if(!command) command = client.commands.get(client.aliases.get(cmd));
    if(command) command.run(client, message, args) 
})

client.on("message", async message => {
  let prefix;
    if (message.author.bot || message.channel.type === "dm") return;
        try {
            let fetched = await db.fetch(`prefix_${message.guild.id}`);
            if (fetched == null) {
                prefix = PREFIX
            } else {
                prefix = fetched
            }
        } catch (e) {
            console.log(e)
    };
  if (
    message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)
    ) return message.reply(`Ola ${message.author} Eu sou ${client.user} Este eo meu prefix \`${db.get(`prefix_${message.guild.id}`)}\``);
})


// --- Logar o bot
client.login('ODE2MDkyNTg1NTcwMzM2Nzg4.YD17cg.vF3G04Pv3kfCX-X-vdsiAF0SRPw')