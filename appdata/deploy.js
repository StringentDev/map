const fs = require('node:fs');
const path = require('node:path');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.js');

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	console.log(`   - ${file}`)
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);
rest.get(Routes.applicationGuildCommands(clientId, guildId))
	.then(data => {
		console.log(" - Refreshing guild commands")
		const promises = [];
		for (const command of data) {
			const deleteUrl = `${Routes.applicationGuildCommands(clientId, guildId)}/${command.id}`;
			promises.push(
				rest.delete(deleteUrl)
					.then(console.log(`   - Removed command ${command.id}`))
			);
		}
		return Promise.all(promises);
	})
	.then(data => {
		console.log(" - Refreshing global commands")
		const promises = [];
		for (const command of data) {
			const deleteUrl = `${Routes.applicationCommands(clientId)}/${command.id}`;
			promises.push(
				rest.delete(deleteUrl)
					.then(console.log(`   - Removed command ${command.id}`))
			);
		}
		return Promise.all(promises);
	})
	.then(async () => {
		await rest.put(Routes.applicationCommands(clientId), { body: commands })
		console.log(" - Added commands")
		for (let i of commands){
			console.log(`   - ${i.name}`)
		}
	})