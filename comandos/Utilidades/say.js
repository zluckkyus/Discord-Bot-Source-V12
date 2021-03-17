module.exports = {
  name: "say",
  aliases: ['falar'],
  run: async (client, message, args) => {
    if (!args.join(" ")) return message.reply('Coloque uma mensagem')
    message.channel.send(args.join(" "))
  }
}