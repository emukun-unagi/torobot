const { EmbedBuilder, PermissionsBitField, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

const IMAGES = [
    "https://cdn.discordapp.com/attachments/1210452036865499219/1218106273229439006/IMG_7693.webp?ex=660674de&is=65f3ffde&hm=ad26c02b570e0dea17911e7f1f3d2873615e6dad9fc65ee460e5f0020841b8ac&",
    "https://cdn.discordapp.com/attachments/1210452036865499219/1218106274701643837/IMG_7691.png?ex=660674df&is=65f3ffdf&hm=4451e4c241aaea944db89ce143ca915c2d745c642216926d2ca63a7dc43ebd9f&",
];

let currentPage = 0;

exports.commandBase = {
    prefixData: {
        name: "ouki",
    },
    slashData: new SlashCommandBuilder()
        .setName("ouki")
        .setDescription("Show an image."),
    cooldown: 5000,
    ownerOnly: false,
    slashRun: async (client, interaction) => {
        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle("Image")
            .setImage(IMAGES[currentPage]);

        const prevButton = new ButtonBuilder()
            .setStyle(ButtonStyle.Primary)
            .setCustomId("prev")
            .setDisabled(currentPage === 0);

        const nextButton = new ButtonBuilder()
            .setStyle(ButtonStyle.Primary)
            .setCustomId("next")
            .setDisabled(currentPage === IMAGES.length - 1);

        const row = new ActionRowBuilder()
            .addComponents(prevButton, nextButton);

        interaction.reply({ embeds: [embed], components: [row] });
    }
};

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isButton()) return;

    const { customId } = interaction.button;

    if (customId === "prev") {
        currentPage--;
    } else if (customId === "next") {
        currentPage++;
    }

    const embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle("Image")
        .setImage(IMAGES[currentPage]);

    const prevButton = new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setCustomId("prev")
        .setDisabled(currentPage === 0);

    const nextButton = new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setCustomId("next")
        .setDisabled(currentPage === IMAGES.length - 1);

    const row = new ActionRowBuilder()
        .addComponents(prevButton, nextButton);

    interaction.update({ embeds: [embed], components: [row] });
});
