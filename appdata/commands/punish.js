const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits } = require('discord-api-types/v10');

const {
	MessageActionRow,
	MessageButton,
	MessageEmbed,
	ActionRowBuilder,
	Modal,
	TextInputComponent,
	TextInputStyle
} = require('discord.js');

const spawner = require('child_process').execSync
const time = require('humanize-time')
const icons = require("../emojis.js")
const capitalizeFirstLetter = ([first, ...rest]) =>
	first.toLocaleUpperCase() + rest.join('')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('punish')
		.setDescription('Get information for different users')
		.setDefaultMemberPermissions(PermissionFlagsBits.KickMembers | PermissionFlagsBits.BanMembers)
		.addSubcommand(subcommand =>
			subcommand
				.setName('warning')
				.setDescription('Give a user a warning. For being naughty.')
				.addUserOption(option => option.setName('target').setRequired(true).setDescription('The user'))
				.addStringOption(option => option.setName('reason').setDescription('what made you do this.')))

		.addSubcommand(subcommand =>
			subcommand
				.setName('kick')
				.setDescription('Give a user a good kick. Not really useful')
				.addUserOption(option => option.setName('target').setRequired(true).setDescription('The user'))
				.addStringOption(option => option.setName('reason').setDescription('what made you do this.')))
		.addSubcommand(subcommand =>
			subcommand
				.setName('temp_ban')
				.setDescription('Like kicking but for longer. Teach them a lesson.')
				.addUserOption(option => option.setName('target').setRequired(true).setDescription('The user'))
				.addStringOption(option => option.setName('reason').setDescription('what made you do this.')))
		.addSubcommand(subcommand =>
			subcommand
				.setName('ban')
				.setDescription('For those who are very naughty. Smite them!')
				.addUserOption(option => option.setName('target').setRequired(true).setDescription('The user'))
				.addStringOption(option => option.setName('reason').setDescription('what made you do this.'))),

	async execute(interaction, client, rev) {
		let embedded = new MessageEmbed()
			.setTitle(`Are you sure?`)
			.setDescription(
				`Giving a user a ${interaction.options.getSubcommand()} ` +
				`is an irreversible action. A warning is removed after 3 ` +
				`months in which is will be removed. \n\n` +
				`Are you sure you want to do this?`
			)
			.setFooter({ text: `Commit ${rev}` })
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
			// console.log(i.customId)
			// row.components = []
			for (let key of row.components) {
				key.disabled = true
			}

			let user = interaction.options.getMember('target')
			let userID = interaction.options.get('target')?.value
			console.log(userID)
			let reason = interaction.options.getString('reason')

			if( reason == null ) reason = "<No reason provided>"
			// console.log(user, reason)
			
			if (i.customId == 'confirm') {
				if (interaction.options.getSubcommand() === 'warn') {
					
				} else if (interaction.options.getSubcommand() === 'kick') {
					await user.kick({
				    reason: reason
				  });
				} else if (interaction.options.getSubcommand() === 'temp_ban') {
					await user.ban({
				    reason: reason
				  });
					await interaction.guild.members.unban(userID)
				} else if (interaction.options.getSubcommand() === 'ban') {
					await user.ban({
				    reason: reason
				  });
				}

				embedded = new MessageEmbed()
					.setTitle(`${icons.checkmark} All done!`)
					.setDescription(
						`You gave ${user} a ${interaction.options.getSubcommand()} ` +
						`for the reason in which they: \n` +
						`\`\`\`\n${reason}\n\`\`\`\n\n`
					)
					.setFooter({ text: `Commit ${rev}` })
					.setTimestamp()
			}

			interaction.editReply(
				{
					embeds: [embedded],
					ephemeral: process.env.production,
					components: [row]
				}
			)

			await i.deferUpdate()
			collector.stop()
		})
	},
};