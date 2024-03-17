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
  "https://cdn.discordapp.com/attachments/1218427049866166293/1218529181885923368/IMG_7630.jpeg?ex=6607febc&is=65f589bc&hm=6a3a8dc4c7b120dcc5a2955af987a72f19f2b138cbe514cb1b842f79c93ae715&",
  "https://cdn.discordapp.com/attachments/1218427049866166293/1218529181885923368/IMG_7630.jpeg?ex=6607febc&is=65f589bc&hm=6a3a8dc4c7b120dcc5a2955af987a72f19f2b138cbe514cb1b842f79c93ae715&",
  "https://cdn.discordapp.com/attachments/1218427049866166293/1218529181885923368/IMG_7630.jpeg?ex=6607febc&is=65f589bc&hm=6a3a8dc4c7b120dcc5a2955af987a72f19f2b138cbe514cb1b842f79c93ae715&",
  "https://cdn.discordapp.com/attachments/1218427049866166293/1218529181885923368/IMG_7630.jpeg?ex=6607febc&is=65f589bc&hm=6a3a8dc4c7b120dcc5a2955af987a72f19f2b138cbe514cb1b842f79c93ae715&",
  "https://cdn.discordapp.com/attachments/1218427049866166293/1218529181885923368/IMG_7630.jpeg?ex=6607febc&is=65f589bc&hm=6a3a8dc4c7b120dcc5a2955af987a72f19f2b138cbe514cb1b842f79c93ae715&",
  "https://cdn.discordapp.com/attachments/1218427049866166293/1218529181885923368/IMG_7630.jpeg?ex=6607febc&is=65f589bc&hm=6a3a8dc4c7b120dcc5a2955af987a72f19f2b138cbe514cb1b842f79c93ae715&",
  "https://cdn.discordapp.com/attachments/1218427049866166293/1218529181885923368/IMG_7630.jpeg?ex=6607febc&is=65f589bc&hm=6a3a8dc4c7b120dcc5a2955af987a72f19f2b138cbe514cb1b842f79c93ae715&",
  "https://cdn.discordapp.com/attachments/1218427049866166293/1218529181885923368/IMG_7630.jpeg?ex=6607febc&is=65f589bc&hm=6a3a8dc4c7b120dcc5a2955af987a72f19f2b138cbe514cb1b842f79c93ae715&",
  "https://cdn.discordapp.com/attachments/1218427049866166293/1218529181885923368/IMG_7630.jpeg?ex=6607febc&is=65f589bc&hm=6a3a8dc4c7b120dcc5a2955af987a72f19f2b138cbe514cb1b842f79c93ae715&",
  "https://cdn.discordapp.com/attachments/1218427049866166293/1218529181885923368/IMG_7630.jpeg?ex=6607febc&is=65f589bc&hm=6a3a8dc4c7b120dcc5a2955af987a72f19f2b138cbe514cb1b842f79c93ae715&",
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
    name: "modal",
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

      i.reply({
        content: "Page updated to " + page,
        ephemeral: true
      });

      // ページを変更した後にボタンが使えるようにする
      rows[page - 1].components.forEach((component) => {
        if (component.setDisabled) {
          component.setDisabled(false);
        }
      });
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

        // ボタンが使えなくならないようにする
        rows[prevIndex].components.forEach((component) => {
          if (component.setDisabled) {
            component.setDisabled(false);
          }
        });
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

        // ボタンが使えなくならないようにする
        rows[nextIndex].components.forEach((component) => {
          if (component.setDisabled) {
            component.setDisabled(false);
          }
        });
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

    collector.on("end", () => {
      client.off("interactionCreate", modalCollector);

      rows.forEach((row) => {
        row.components.forEach((component) => {
          if (component.setDisabled) {
            component.setDisabled(false);
          }
        });
      });
    });
  }
};
