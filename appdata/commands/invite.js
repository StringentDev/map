const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('invite')
		.setDescription('Create an invite to add the bot to your server'),
	
	async execute(interaction, client, rev) {
		let link = client.generateInvite({ 
			scopes: [
				'bot',
				'applications.commands'
			], 
			permissions: [
				Permissions.FLAGS.ADMINISTRATOR
			] 
		})
	
		let embedded = new MessageEmbed()
			.setTitle(`Veni vidi vici`)
			.setDescription(
				"Only the following invite works for Mapped "+
				"because of slash commands."
			)
			.addFields(
				{ 
					name: 'Invite link',
					value: `[Click here to invite](${link})`
				}
			)
			.setFooter({ text: `Commit ${rev}`})
			.setTimestamp()
		return interaction.reply({
			embeds: [embedded],
			ephemeral: process.env.production
		});
	},
};