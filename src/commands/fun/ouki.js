const { EmbedBuilder, PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

const imageUrls = [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg",
    // Add more URLs as needed
];

exports.commandBase = {
    prefixData: {
        name: "ouki",
    },
    slashData: new SlashCommandBuilder()
        .setName("ouki")
        .setDescription("Display images with buttons.")
        .addStringOption(option =>
            option.setName("page")
                .setDescription("The page number of the image.")
                .setRequired(true)
                .setChoices(
                    { name: "1", value: "1" },
                    { name: "2", value: "2" },
                    // Add more choices as needed
                )
        ),
    cooldown: 5000,
    ownerOnly: false,
    slashRun: async (client, interaction) => {
        const page = interaction.options.getString("page");
        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setImage(imageUrls[page - 1]);

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("previous")
                    .setEmoji("⬅️")
                    .setStyle(ButtonStyle.Primary)
                    .setDisabled(page === "1"),
                new ButtonBuilder()
                    .setCustomId("next")
                    .setEmoji("➡️")
                    .setStyle(ButtonStyle.Primary)
                    .setDisabled(page === imageUrls.length.toString()),
            );

        await interaction.reply({ embeds: [embed], components: [row] });

        const collector = interaction.channel.createMessageComponentCollector({ componentType: "BUTTON" });

        collector.on("collect", async (interaction) => {
            const { customId } = interaction;

            if (customId === "previous") {
                const previousPage = parseInt(page) - 1;
                embed.setImage(imageUrls[previousPage - 1]);
                row.components[0].setDisabled(previousPage === "1");
                row.components[1].setDisabled(previousPage === imageUrls.length.toString());
            } else if (customId === "next") {
                const nextPage = parseInt(page) + 1;
                embed.setImage(imageUrls[nextPage - 1]);
                row.components[0].setDisabled(nextPage === "1");
                row.components[1].setDisabled(nextPage === imageUrls.length.toString());
            }

            await interaction.update({ embeds: [embed], components: [row] });
        });
    },
}
