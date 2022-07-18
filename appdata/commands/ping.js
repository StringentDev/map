const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const icons = require("../emojis.js")
module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	
	async execute(interaction, client, rev) {
		const WebSocketSpeed = client.ws.ping
		
		let embedded = new MessageEmbed()
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
					value: `${icons.loader} Testing...`,
					inline: true
				},
				{ 
					name: 'Return Ticket', 
					value: `${icons.loader} Testing...`,
					inline: true
				
				},
			)
			.setFooter({ text: `Commit ${rev}`})
			.setTimestamp()
		// const Sent = await interaction.reply(
		// 	{ content: 'Pinging...', fetchReply: true }
		// );
		
		const Sent = await interaction.reply(
			{ 
				embeds: [embedded],
				fetchReply: true,
				ephemeral: process.env.production
			}
		)
		
		let return_speed = Sent.createdTimestamp - interaction.createdTimestamp
		let icon_websocket
		
		if( WebSocketSpeed < 100) {
			icon_websocket = icons.checkmark
		} else if ( WebSocketSpeed < 200 ) {
			icon_websocket = icons.issue
		} else {
			icon_websocket = icons.cross
		}

		let icon_return
		if( return_speed < 1000) {
			icon_return = icons.checkmark
		} else if ( return_speed < 3000 ) {
			icon_return = icons.issue
		} else {
			icon_return = icons.cross
		}

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
					value: `${icon_websocket} ${WebSocketSpeed}ms`,
					inline: true
				},
				{ 
					name: 'Return Ticket', 
					value: `${icon_return} ${return_speed}ms`,
					inline: true
				
				},
			)
			.setFooter({ text: `Commit ${rev}`})
			.setTimestamp()

		interaction.editReply(
			{
				embeds: [embedded],
				ephemeral: process.env.production
			}
		)
	},
};