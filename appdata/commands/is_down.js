const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const time = require('humanize-time')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('is_down')
		.setDescription('Is it down?'),
	
	async execute(interaction, client, rev) {
		const guilds = await client.shard.fetchClientValues('guilds.cache.size')
		let embedded = new MessageEmbed()
			.setTitle(`Did you just ask that?`)
			.setDescription(
				"No, It's not down and is fully responsive; "+
				"Enjoy using the bot"
			)
			.addFields(
				{ 
					name: 'Uptime',
					value: `${time(process.uptime() * 1000)}`
				}
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