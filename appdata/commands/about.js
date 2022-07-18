const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const time = require('humanize-time')
const icons = require('../emojis.js')
module.exports = {
	data: new SlashCommandBuilder()
		.setName('about')
		.setDescription('Get information about the bot'),
	
	async execute(interaction, client, rev) {
		const guilds = await client.shard.fetchClientValues('guilds.cache.size')
		let embedded = new MessageEmbed()
			.setTitle(`About Mapped`)
			.setDescription(
				"Mapped, built by <@991791436662046800>, is a personal and " +
				"**mostly** joke project created for the HCPF on Replit."
			)
			.addFields(
				{ 
					name: 'Uptime',
					value: `${time(process.uptime() * 1000)}`
				},
				{ 
					name: 'Attending',
					value: `${guilds.reduce((acc, guildCount) => acc + guildCount, 0)} guilds`
				},
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

	},
};