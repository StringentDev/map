const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	
	async execute(interaction, client) {
		const WebSocketSpeed = client.ws.ping
		
		let embedded = new MessageEmbed()
			.setTitle('Ping result')
			.setDescription(
				"Please wait whilst the network connections are being tested."
			)
			.setTimestamp()
		// const Sent = await interaction.reply(
		// 	{ content: 'Pinging...', fetchReply: true }
		// );
		
		const Sent = await interaction.reply(
			{ 
				embeds: [embedded],
				fetchReply: true
			}
		)

		embedded = new MessageEmbed()
			.setTitle('Ping result')
			.setDescription(
				"The websocket test refers to the direct connection " +
				"to the Discord Gateway which is how the bot can " +
				"operate. The return ticket is how long the bot took " +
				"to see it's own message."
			)
			.addFields(
				{ 
					name: 'Websocket', 
					value: `${WebSocketSpeed}ms`,
					inline: true
				},
				{ 
					name: 'Return Ticket', 
					value: `${Sent.createdTimestamp - interaction.createdTimestamp}ms`,
					inline: true
				
				},
			)
			.setTimestamp()

		interaction.editReply(
			{
				embeds: [embedded]
			}
		)
	},
};