const { EmbedBuilder } = require("discord.js");
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
    const startTime = Date.now();
    const sentMessage = await message.reply("Pinging...");
    const endTime = Date.now();
    const ping = endTime - startTime;

    const embed = new EmbedBuilder()
      .setTitle("Ping")
      .addField("Latency", `${ping}ms`, true)
      .addField("API Latency", `${client.ws.ping}ms`, true)
      .setColor("#0099ff")
      .setFooter(
        `Requested by ${message.author.tag}`,
        message.author.displayAvatarURL()
      )
      .setTimestamp();

    sentMessage.edit({ content: "Pong!", embeds: [embed] });
  },
  slashRun: async (client, interaction) => {
    const startTime = Date.now();
    await interaction.deferReply();
    const endTime = Date.now();
    const ping = endTime - startTime;

    const embed = new EmbedBuilder()
      .setTitle("Ping")
      .addField("Latency", `${ping}ms`, true)
      .addField("API Latency", `${client.ws.ping}ms`, true)
      .setColor("#0099ff")
      .setFooter(
        `Requested by ${interaction.user.tag}`,
        interaction.user.displayAvatarURL()
      )
      .setTimestamp();

    await interaction.editReply({ embeds: [embed] });
  }
}
