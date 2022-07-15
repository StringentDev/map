const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('invite')
		.setDescription('Create an invite to add the bot to your server'),
	
	async execute(interaction, client) {
		return interaction.reply(
			client.generateInvite({ 
				scopes: ['bot'], 
				permissions: [Permissions.FLAGS.ADMINISTRATOR] 
			})
		);
	},
};