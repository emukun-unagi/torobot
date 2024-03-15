const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

exports.commandBase = {
    prefixData: {
        name: "ping",
        aliases: ["pong"]
    },
    slashData: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Pong!"),
    cooldown: 5000,
    ownerOnly: false,
    prefixRun: async (client, message, args) => {
        const ping = client.ws.ping;
        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle("Pong!")
            .setDescription(`WebSocket ping: ${ping} ms`)
            .setTimestamp();

        message.reply({ embeds: [embed] });
    },
    slashRun: async (client, interaction) => {
        const ping = client.ws.ping;
        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle("Pong!")
            .setDescription(`WebSocket ping: ${ping} ms`)
            .setTimestamp();

        interaction.reply({ embeds: [embed] });
    }
}
