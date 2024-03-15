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
    message.reply(`Pong!`)
  },
  slashRun: async (client, interaction) => {
    interaction.reply(`Pong!`)
  }
}
