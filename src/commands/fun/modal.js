const {
  EmbedBuilder,
  PermissionsBitField,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle
} = require("discord.js");
const {
  SlashCommandBuilder
} = require("@discordjs/builders");

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
        .setDisabled(i === images.length - 1),

      new ButtonBuilder()
        .setCustomId(`change-page-${i}`)
        .setLabel("✏️")
        .setStyle(ButtonStyle.Secondary)
    )

  rows.push(row);
}

exports.commandBase = {
  prefixData: {
    name: "page",
    aliases: []
  },
  slashData: new SlashCommandBuilder()
    .setName("modal")
    .setDescription("modal command"),
  cooldown: 5000,
  ownerOnly: false,
  slashRun: async (client, interaction) => {
    let index = parseInt(interaction.options.get("index")?.value || "0");

    const embed = new EmbedBuilder()
      .setColor(0x0099FF)
      .setImage(images[index])
      .setTimestamp()
      .setFooter({
        text: `Page ${index + 1}`,
        iconURL: interaction.user.displayAvatarURL()
      });

    await interaction.reply({
      embeds: [embed],
      components: [rows[index]]
    });

    const filter = (i) => i.user.id === interaction.user.id;

    const collector = interaction.channel.createMessageComponentCollector({
      filter,
      time: 0
    });

    let modalInteraction;
    const modalCollector = (i) => {
      if (!i.isModalSubmit()) return;
      if (i.user.id !== interaction.user.id) return;

      modalInteraction = i;

      const page = parseInt(i.fields.getTextInputValue("page-input"));
      if (isNaN(page) || page < 1 || page > images.length) {
        return i.reply({
          content: "Invalid page number.",
          ephemeral: true,
        });
      }

      const embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setImage(images[page - 1])
        .setTimestamp()
        .setFooter({
          text: `Page ${page}`,
          iconURL: interaction.user.displayAvatarURL()
        });

      interaction.editReply({
        embeds: [embed],
        components: [rows[page - 1]]
      });

      collector.stop();

      modalCollector.off("interactionCreate");
    };

    collector.on("collect", (i) => {
      if (i.customId.startsWith("prev")) {
        const prevIndex = Math.max(index - 1, 0);
        const embed = new EmbedBuilder()
          .setColor(0x0099FF)
          .setImage(images[prevIndex])
          .setTimestamp()
          .setFooter({
            text: `Page ${prevIndex + 1}`,
            iconURL: interaction.user.displayAvatarURL()
          });

        i.update({
          embeds: [embed],
          components: [rows[prevIndex]]
        });
        index = prevIndex;
      }

      if (i.customId.startsWith("next")) {
        const nextIndex = Math.min(index + 1, images.length - 1);
        const embed = new EmbedBuilder()
          .setColor(0x0099FF)
          .setImage(images[nextIndex])
          .setTimestamp()
          .setFooter({
            text: `Page ${nextIndex + 1}`,
            iconURL: interaction.user.displayAvatarURL()
          });

        i.update({
          embeds: [embed],
          components: [rows[nextIndex]]
        });
        index = nextIndex;
      }

      if (i.customId.startsWith("change-page")) {
        const modal = new ModalBuilder()
          .setCustomId("change-page-modal")
          .setTitle("Change page");

        const pageInput = new TextInputBuilder()
          .setCustomId("page-input")
          .setLabel("Enter the page number")
          .setStyle(TextInputStyle.Short)
          .setRequired(true);

        const firstRow = new ActionRowBuilder().addComponents(pageInput);
        modal.addComponents(firstRow);

        i.showModal(modal);

        client.on("interactionCreate", modalCollector);
      }
    });

    collector.on("end", (c) => {
      console.log(`Collected ${c.size} items`);

      rows.forEach((row, i) => {
        row.components.forEach((component) => {
          if (component.setDisabled) {
            component.setDisabled(false);
          }
        });
      });

      client.off("interactionCreate", modalCollector);
    });
  }
};
