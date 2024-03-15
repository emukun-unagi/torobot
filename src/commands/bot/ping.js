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
        const start = Date.now();
        const ws = client.ws;

        await ws.connect();

        await new Promise(resolve => {
            ws.on('ready', resolve);
        });

        const connectTime = Date.now() - start;

        ws.disconnect();

        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle("Pong!")
            .setDescription(`WebSocket connection time: ${connectTime} ms`)
            .setTimestamp()
            .setFooter({ text: `Command used by ${message.author.username}`, iconURL: message.author.displayAvatarURL() });

        message.reply({ embeds: [embed] });
    },
    slashRun: async (client, interaction) => {
        const start = Date.now();
        const ws = client.ws;

        await ws.connect();

        await new Promise(resolve => {
            ws.on('ready', resolve);
        });

        const connectTime = Date.now() - start;

        ws.disconnect();

        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle("Pong!")
            .setDescription(`WebSocket connection time: ${connectTime} ms`)
            .setTimestamp()
            .setFooter({ text: `Command used by ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() });

        interaction.reply({ embeds: [embed] });
    }
}
