const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const spawner = require('child_process').execSync
const time = require('humanize-time')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('data')
		.setDescription('Get information for different users')
		.addSubcommand(subcommand =>
			subcommand
				.setName('query')
				.setDescription('Query info about a user')
				.addUserOption(option => option.setName('target').setDescription('The user')))
		.addSubcommand(subcommand =>
				subcommand
					.setName('clear')
					.setDescription('Remove info about a user')
					.addUserOption(option => option.setName('target').setDescription('The user')))
		.addSubcommand(subcommand =>
				subcommand
					.setName('set')
					.setDescription('Add info about a user')
					.addUserOption(option => option.setName('target').setDescription('The user'))),
	
	async execute(interaction, client, rev) {
		if (interaction.options.getSubcommand() === 'query') {
			let embedded = new MessageEmbed()
				.setTitle(`Query`)
				.setDescription(
					""
				)
				.setFooter({ text: `Commit ${rev}`})
				.setTimestamp()
			// const Sent = await interaction.reply(
			// 	{ content: 'Pinging...', fetchReply: true }
			// );
			
			return interaction.reply(
				{ 
					embeds: [embedded],
					ephemeral: process.env.production
				}
			)
		} else if (interaction.options.getSubcommand() === 'clear') {
			let embedded = new MessageEmbed()
				.setTitle(`Clear`)
				.setDescription(
					""
				)
				.setFooter({ text: `Commit ${rev}`})
				.setTimestamp()
			// const Sent = await interaction.reply(
			// 	{ content: 'Pinging...', fetchReply: true }
			// );
			
			return interaction.reply(
				{ 
					embeds: [embedded],
					ephemeral: process.env.production
				}
			)
		} else if (interaction.options.getSubcommand() === 'set') {
			let embedded = new MessageEmbed()
				.setTitle(`Set`)
				.setDescription(
					""
				)
				.setFooter({ text: `Commit ${rev}`})
				.setTimestamp()
			// const Sent = await interaction.reply(
			// 	{ content: 'Pinging...', fetchReply: true }
			// );
			
			return interaction.reply(
				{ 
					embeds: [embedded],
					ephemeral: process.env.production
				}
			)
		}

	},
};