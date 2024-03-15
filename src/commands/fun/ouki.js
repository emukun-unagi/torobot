const { EmbedBuilder, PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");



const page1 = new EmbedBuilder()
	.setColor(0x0099FF)
	.setTitle("Page 1")
	.setImage("https://cdn.discordapp.com/attachments/1210452036865499219/1218106273229439006/IMG_7693.webp?ex=660674de&is=65f3ffde&hm=ad26c02b570e0dea17911e7f1f3d2873615e6dad9fc65ee460e5f0020841b8ac&")
	.setTimestamp()
	.setFooter({ text: "Page 1/2" });



const page2 = new EmbedBuilder()
	.setColor(0x0099FF)
	.setTitle("Page 2")
	.setImage("https://cdn.discordapp.com/attachments/1210452036865499219/1218106274701643837/IMG_7691.png?ex=660674df&is=65f3ffdf&hm=4451e4c241aaea944db89ce143ca915c2d745c642216926d2ca63a7dc43ebd9f&")
	.setTimestamp()
	.setFooter({ text: "Page 2/2" });



const buttonRow = new ActionRowBuilder()
	.addComponents(
		new ButtonBuilder()
			.setCustomId("previous")
			.setLabel("Previous")
			.setStyle(ButtonStyle.Secondary)
			.setDisabled(true),
		new ButtonBuilder()
			.setCustomId("next")
			.setLabel("Next")
			.setStyle(ButtonStyle.Secondary),
	);



exports.commandBase = {
	prefixData: {
		name: "ouki",
		aliases: ["ouki"]
	},
	slashData: new SlashCommandBuilder()
		.setName("ouki")
		.setDescription("Ouki!"),
	cooldown: 5000,
	ownerOnly: false,
	slashRun: async (client, interaction) => {
		const message = await interaction.reply({ embeds: [page1], components: [buttonRow], fetchReply: true });



		const collector = message.createMessageComponentCollector({
			componentType: "BUTTON",
			time: 30000
		});



		collector.on("collect", async (i) => {
			if (i.user.id !== interaction.user.id) {
				return i.reply({ content: "This button is not for you", ephemeral: true });
			}



			if (i.customId === "previous") {
				if (i.message.embeds[0].footer.text.endsWith("Page 1/2")) {
					return i.reply({ content: "There is no previous page", ephemeral: true });
				}
				await i.update({ embeds: [page1], components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId("previous").setLabel("Previous").setStyle(ButtonStyle.Secondary).setDisabled(false), new ButtonBuilder().setCustomId("next").setLabel("Next").setStyle(ButtonStyle.Secondary).setDisabled(true))] });
			}



			if (i.customId === "next") {
				if (i.message.embeds[0].footer.text.endsWith("Page 2/2")) {
					return i.reply({ content: "There is no next page", ephemeral: true });
				}
				await i.update({ embeds: [page2], components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId("previous").setLabel("Previous").setStyle(ButtonStyle.Secondary).setDisabled(false), new ButtonBuilder().setCustomId("next").setLabel("Next").setStyle(ButtonStyle.Secondary).setDisabled(false))], fetchReply: true }).then((m) => m.createMessageComponentCollector({ componentType: "BUTTON", time: 30000 }).on("collect", async (i) => {
					if (i.user.id !== interaction.user.id) {
						return i.reply({ content: "This button is not for you", ephemeral: true });
					}



					if (i.customId === "previous") {
						await i.update({ embeds: [page1], components: [buttonRow] });
					}



					if (i.customId === "next") {
						return i.reply({ content: "There is no next page", ephemeral: true });
					}
				}));
			}
		});



		collector.on("end", async (i) => {
			if (i.size === 0) {
				return interaction.editReply({ content: "Timed out", components: [] });
			}
		});
	}
}
