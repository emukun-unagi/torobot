const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

exports.commandBase = {
  prefixData: {
    name: "ping",
    aliases: ["pong"]
  },
  slashData: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("ping command"),
  cooldown: 5000,
  ownerOnly: false,
  prefixRun: async (client, message, args) => {
    const ping = Date.now() - message.createdTimestamp;
    const embed = new EmbedBuilder(
      .setDescription(`Pong! Latency: ${ping}ms`)
      .setColor("#ffffff");

    message.reply({ embeds: [embed] });
  },
  slashRun: async (client, interaction) => {
    const ping = Date.now() - interaction.createdTimestamp;
    const embed = new EmbedBuilder()
      .setDescription(`${ping}ms`)
       .setColor("ffffff");

    interaction.reply({ embeds: [embed] });
  }
}
