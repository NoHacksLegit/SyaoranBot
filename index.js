const Discord = require('discord.js');
const prefix = "s!";
const fs = require("fs")
const { token } = config.json

const client = new Discord.Client();
client.commands = new Discord.Collection();

const archivosComandos = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of archivosComandos) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command)
}
client.once('ready', () => {
    console.log('Syaoran Li iniciado.');
    client.user.setActivity('Maintance mode.', {type: 'WATCHING'});
})

client.once('message', () => {
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (message.author.bot) return;
    if (!client.commands.has(command)) return message.channel.reply(':x: Ese comando no existe.');

    try {
        client.commands.get(command).execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('Hubo un error ejecutando el comando.')
    }

});

client.login(process.env.TOKEN);  