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
        const messagePing = Date.now() - message.createdTimestamp;
        const apiPing = client.ws.ping + messagePing;
        const embed = new EmbedBuilder()
            .setColor(0xFFFFFF)
            .setTitle("pong!")
            .addFields([
                { name: "WebSocket ping", value: `${ping} ms`, inline: true },
                { name: "Message ping", value: `${messagePing} ms`, inline: true },
                { name: "API ping", value: `${apiPing} ms`, inline: true },
            ])
            .setTimestamp()
            .setFooter({ text: `Command used by ${message.author.username}`, iconURL: message.author.displayAvatarURL() });

        message.reply({ embeds: [embed] });
    },
    slashRun: async (client, interaction) => {
        const ping = client.ws.ping;
        const messagePing = Date.now() - interaction.createdTimestamp;
        const apiPing = client.ws.ping + messagePing;
        const embed = new EmbedBuilder()
            .setColor(0xFFFFFF)
            .setTitle("pong!")
            .addFields([
                { name: "WebSocket ping", value: `${ping} ms`, inline: true },
                { name: "Message ping", value: `${messagePing} ms`, inline: true },
                { name: "API ping", value: `${apiPing} ms`, inline: true },
            ])
            .setTimestamp()
            .setFooter({ text: `Command used by ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() });

        interaction.reply({ embeds: [embed] });
    }
}
