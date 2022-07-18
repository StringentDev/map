const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

const spawner  = require('child_process').execSync
const time     = require('humanize-time')
const icons    = require("../emojis.js")
const capitalizeFirstLetter = ([ first, ...rest ]) =>
  first.toLocaleUpperCase() + rest.join('')

const options  = {
	maxMessagesPerChannel: 500,
	jsonSave: true,
	jsonBeautify: true
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Get information for different users')
		.addSubcommand(subcommand =>
			subcommand
				.setName('warning')
				.setDescription('Give a user a warning. For being naughty.')
				.addUserOption(option => option.setName('target').setDescription('The user')))
		.addSubcommand(subcommand =>
				subcommand
					.setName('kick')
					.setDescription('Give a user a good kick. Not really useful')
					.addUserOption(option => option.setName('target').setDescription('The user')))
		.addSubcommand(subcommand =>
				subcommand
					.setName('temp_ban')
					.setDescription('Like kicking but for longer. Teach them a lesson.')
					.addUserOption(option => option.setName('target').setDescription('The user')))
		.addSubcommand(subcommand =>
				subcommand
					.setName('ban')
					.setDescription('For those who are very naughty. Smite them!')
					.addUserOption(option => option.setName('target').setDescription('The user'))),
	
	async execute(interaction, client, rev) {
		let embedded = new MessageEmbed()
			.setTitle(`Are you sure`)
			.setDescription(
				`Giving a user a ${capitalizeFirstLetter(interaction.options.getSubcommand())} `+
				`is an irreversible action. A warning is removed after 3 `+
				`months in which is will be removed. \n\n` +
				`Are you sure you want to do this?`
			)
			.setFooter({ text: `Commit ${rev}`})
			.setTimestamp()

		let row = new MessageActionRow()
		.addComponents(
			new MessageButton()
				.setCustomId('confirm')
				.setLabel('Confirm')
				.setEmoji('992104987788320899')
				.setStyle('SECONDARY'),
			new MessageButton()
				.setCustomId('cancel')
				.setLabel('Cancel')
				.setEmoji('992104992397865020')
				.setStyle('SECONDARY'),
		);
		// const Sent = await interaction.reply(
		// 	{ content: 'Pinging...', fetchReply: true }
		// );
		interaction.reply(
			{ 
				embeds: [embedded],
				ephemeral: process.env.production,
				components: [row]
			}
		)

		const collector = interaction.channel.createMessageComponentCollector({ time: 15000 });
	
		collector.on('collect', async i => {
			console.log(i.customId)
			// row.components = []
			for (let key of row.components) {
				key.disabled = true
			}
			if (i.customId == 'confirm') {
				if (interaction.options.getSubcommand() === 'warn') {
				
				} else if (interaction.options.getSubcommand() === 'kick') {
					
				} else if (interaction.options.getSubcommand() === 'temp_ban') {
				
				} else if (interaction.options.getSubcommand() === 'ban') {
					
				}
				const modal = new ModalBuilder()
					.setCustomId(`myModal`)
					.setTitle(`My Modal`)
				const Reason = new TextInputBuilder()
					.setCustomId(`reason`)
				    // The label is the prompt the user sees for this input
					.setLabel(`Reason for ${interaction.options.getSubcommand()}`)
				    // Short means only a single line of text
					.setStyle(TextInputStyle.Paragraph);
				const firstActionRow = new ActionRowBuilder().addComponents([favoriteColorInput]);

				// Add inputs to the modal
				modal.addComponents([firstActionRow]);
				await interaction.showModal(modal);
				// let embedded = new MessageEmbed()
				// 	.setTitle(`${capitalizeFirstLetter(interaction.options.getSubcommand())} given`)
				// 	.setDescription(
				// 		`Welp, nothing to do now, perhaps they may use an alt? `    +
				// 		`Or perhaps they'll not do whatever they did again. \n\n`   +
				// 		`Note that if more than one moderator in different servers `+
				// 		`Gives the same warning, it will be added to our database ` +
				// 		`so other servers can see the history of the user.`
				// 	)
				// 	.setFooter({ text: `Commit ${rev}`})
				// 	.setTimestamp()
				// await interaction.editReply(
				// 	{
				// 		embeds: [embedded],
				// 		ephemeral: process.env.production,
				// 		components: [row]
				// 	}
				// )
				
			} else if (i.customId == 'cancel') {
				let embedded = new MessageEmbed()
					.setTitle(`${capitalizeFirstLetter(interaction.options.getSubcommand())} was cancelled`)
					.setDescription(
						`You forgave them! Perhaps host a party or pretend it `+
						`was nothing but either way, that was lightening fast `+
						`mercy which could put most moderators to shame.`
					)
					.setFooter({ text: `Commit ${rev}`})
					.setTimestamp()
				await interaction.editReply(
					{
						embeds: [embedded],
						ephemeral: process.env.production,
						components: [row]
					}
				)
				
			}

			await i.deferUpdate()
		});

	},
};