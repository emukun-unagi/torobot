const { EmbedBuilder, PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

const images = [
    "https://example.com/image1.png",
    "https://example.com/image2.png"
];

const rows = [];

for (let i = 0; i < images.length; i++) {
    const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId(`prev-${i}`)
                .setLabel("⬅️")
                .setStyle(ButtonStyle.Secondary)
                .setDisabled(i === 0),

            new ButtonBuilder()
                .setCustomId(`next-${i}`)
                .setLabel("➡️")
                .setStyle(ButtonStyle.Secondary)
                .setDisabled(i === images.length - 1)
        );

    rows.push(row);
}

exports.commandBase = {
    prefixData: {
        name: "ouki",
        aliases: []
    },
    slashData: new SlashCommandBuilder()
        .setName("ouki")
        .setDescription("Oukis!"),
    cooldown: 5000,
    ownerOnly: false,
    slashRun: async (client, interaction) => {
        const index = parseInt(interaction.options.get("index")?.value || "0");

        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setImage(images[index])
            .setTimestamp()
            .setFooter({ text: `Page ${index + 1}`, iconURL: interaction.user.displayAvatarURL() });

        await interaction.reply({ embeds: [embed], components: [rows[index]] });

        const filter = (i) => i.user.id === interaction.user.id;

        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

        collector.on("collect", (i) => {
            if (i.customId.startsWith("prev")) {
                const prevIndex = Math.max(index - 1, 0);
                const embed = new EmbedBuilder()
                    .setColor(0x0099FF)
                    .setImage(images[prevIndex])
                    .setTimestamp()
                    .setFooter({ text: `Page ${prevIndex + 1}`, iconURL: interaction.user.displayAvatarURL() });

                i.update({ embeds: [embed], components: [rows[prevIndex]] });
            }

            if (i.customId.startsWith("next")) {
                const nextIndex = Math.min(index + 1, images.length - 1);
                const embed = new EmbedBuilder()
                    .setColor(0x0099FF)
                    .setImage(images[nextIndex])
                    .setTimestamp()
                    .setFooter({ text: `Page ${nextIndex + 1}`, iconURL: interaction.user.displayAvatarURL() });

                i.update({ embeds: [embed], components: [rows[nextIndex]] });
            }
        });

        collector.on("end", (c) => {
            console.log(`Collected ${c.size} items`);
        });
    }
}
