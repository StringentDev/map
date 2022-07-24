const fs = require('node:fs');
const path = require('node:path');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { Client, Collection, Intents } = require('discord.js');
const { token, clientId } = require('./config.js');
const spawner = require('child_process').execSync

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS] });
const user_m = new Map();

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
const revision = spawner('git rev-parse HEAD').toString().trim()



for (const file of commandFiles) {
	console.log(`   - ${file}`)
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

process.on('SIGINT', async () => {
	console.info(' - Shutting down.');
	await client.user.setStatus('invisible');
	await client.destroy()
});

process.on('SIGTERM', async () => {
	console.info(' - Shutting down.');
	await client.user.setStatus('invisible');
	await client.destroy()
});

client.once('ready', () => {
	client.user.setStatus('online');
	console.log(' - Rearing to go');
});

client.on('messageCreate', async message => {
	if (message.author.bot) return;

	if (user_m.has(message.author.id)) {
	}
})

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction, client, revision);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.login(token);