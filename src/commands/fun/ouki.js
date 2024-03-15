const { EmbedBuilder, PermissionsBitField, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

// Example image URLs for demonstration purposes
const imageUrls = [
    "https://cdn.discordapp.com/attachments/1210452036865499219/1218106273229439006/IMG_7693.webp?ex=660674de&is=65f3ffde&hm=ad26c02b570e0dea17911e7f1f3d2873615e6dad9fc65ee460e5f0020841b8ac&",
    "https://cdn.discordapp.com/attachments/1210452036865499219/1218106274701643837/IMG_7691.png?ex=660674df&is=65f3ffdf&hm=4451e4c241aaea944db89ce143ca915c2d745c642216926d2ca63a7dc43ebd9f&",
    // Add more URLs as needed
];

exports.commandBase = {
    prefixData: {
        name: "ouki",
        aliases: []
    },
    slashData: new SlashCommandBuilder()
        .setName("ouki")
        .setDescription("Show example images with buttons."),
    cooldown: 5000,
    ownerOnly: false,
    slashRun: async (client, interaction) => {
        // Initialize variables
        const page = 0;
        const maxPages = imageUrls.length - 1;

        // Create a new embed
        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle("Page " + (page + 1) + " of " + (maxPages + 1))
            .setImage(imageUrls[page]);

        // Create a new action row
        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId("left")
                .setLabel("⬅️")
                .setStyle(ButtonStyle.Primary)
                .setDisabled(page === 0),

            new ButtonBuilder()
                .setCustomId("right")
                .setLabel("➡️")
                .setStyle(ButtonStyle.Primary)
                .setDisabled(page === maxPages)
        );

        // Send the initial message
        const message = await interaction.reply({ embeds: [embed], components: [row], fetchReply: true });

        // Create a message collector
        const collector = message.createMessageComponentCollector({
            componentType: "BUTTON",
            time: 30000
        });

        // Handle button clicks
        collector.on("collect", async (button) => {
            if (button.user.id !== interaction.user.id) {
                await button.reply({ content: "This button is not for you!", ephemeral: true });
                return;
            }

            if (button.customId === "left") {
                page--;
            } else if (button.customId === "right") {
                page++;
            }

            // Update the embed
            embed.setTitle("Page " + (page + 1) + " of " + (maxPages + 1))
                .setImage(imageUrls[page]);

            // Update the buttons
            row.components[0].setDisabled(page === 0);
            row.components[1].setDisabled(page === maxPages);

            // Edit the message
            await interaction.editReply({ embeds: [embed], components: [row] });
        });

        // Handle the collector ending
        collector.on("end", (collected) => {
            if (collected.size === 0) {
                interaction.followUp({ content: "Collector ended with no clicks.", ephemeral: true });
            }
        });
    }
}
