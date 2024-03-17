const { EmbedBuilder, PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle, ModalBuilder, TextInputBuilder, TextInputStyle } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

const images = [
  "https://cdn.discordapp.com/attachments/1218427049866166293/1218427442469928980/IMG_6295.jpeg?ex=66079ffb&is=65f52afb&hm=1179cf2748692a495ccc63de4b8cd09ebe61752f348bd4b8a04a2867e0fb2397&",
  "https://cdn.discordapp.com/attachments/1218427049866166293/1218427442226663444/IMG_7569.jpeg?ex=66079ffb&is=65f52afb&hm=10f068898b1b94ee6474ca71314f0a070039786521ffb3b088cb9a99eb1d9a10&",
  "https://cdn.discordapp.com/attachments/1218427049866166293/1218427441979330631/IMG_7570.jpeg?ex=66079ffb&is=65f52afb&hm=5bfca58ea12c0f4320ff3f7ad94b889665b4a3db547b184bc979cdfe1885b9bd&",
  "https://cdn.discordapp.com/attachments/1218427049866166293/1218427441735925770/IMG_7571.jpeg?ex=66079ffb&is=65f52afb&hm=c323cc3a49c6f4e325c8768bc86a677dc84c8e6ba63b146493cd899552a7cf32&",
  "https://cdn.discordapp.com/attachments/1218427049866166293/1218427386064932894/IMG_7572.jpeg?ex=66079fee&is=65f52aee&hm=57aa68280e52b89ba3836c36267b105e3aa2d8093617194be2cff2055f455662&",
  "https://cdn.discordapp.com/attachments/1218427049866166293/1218427385368674415/IMG_7573.jpeg?ex=66079fed&is=65f52aed&hm=ce33d8a63842a6ec0fc00fdc106abdb1f32fb2bd0a2fec173d06d8360beba8c3&",
  "https://cdn.discordapp.com/attachments/1218427049866166293/1218427384106061934/IMG_7574.jpeg?ex=66079fed&is=65f52aed&hm=0b664d6206459842af0d4e4166a2d37664890b43ec449a1a13eaf5d218344d2a&",
  "https://cdn.discordapp.com/attachments/1218427049866166293/1218427383552544798/IMG_7575.jpeg?ex=66079fed&is=65f52aed&hm=c2e4f7c0b0fb58171670959971365b2e741120b3a6024788280411e2d9d7fda6&",
  "https://cdn.discordapp.com/attachments/1218427049866166293/1218427383204413450/IMG_7576.jpeg?ex=66079fed&is=65f52aed&hm=5eef295e92b1a18e1163b49f96b4e8bf5d593c6a1c5607c11a6dac16baf62f75&",
  "https://cdn.discordapp.com/attachments/1218427049866166293/1218427382856290314/IMG_7577.jpeg?ex=66079fed&is=65f52aed&hm=08bc835d59b4f466fe2c8c0af1cf9b4986f7cbec2fb4b8a0d45dac95bcc1e25c&",
  "https://cdn.discordapp.com/attachments/1218427049866166293/1218427382566879262/IMG_6857.jpeg?ex=66079fed&is=65f52aed&hm=386b97d1755c45d78f8af321695e6675e5c84dc837274f0fbac5a632ed0270e8&",
  "https://cdn.discordapp.com/attachments/1218427049866166293/1218427382214430821/IMG_7579.jpeg?ex=66079fed&is=65f52aed&hm=88a292221416649776553267eabc6d967e7d5ae94a98be19d2d2e01da4be5cb3&",
  "https://cdn.discordapp.com/attachments/1218427049866166293/1218427381937737828/IMG_7580.jpeg?ex=66079fed&is=65f52aed&hm=eef182f9795ebc495e4434615fbba1ce766ce6d2aed9e3308355bc6c51aab39c&",
  "https://cdn.discordapp.com/attachments/1218427049866166293/1218427381623033896/IMG_7581.jpeg?ex=66079fed&is=65f52aed&hm=e07ecc39e9ebf1043d569bf0329714731902aecdacfa16276a9776d4ddfb084d&",
  "https://cdn.discordapp.com/attachments/1218427049866166293/1218427253600551002/IMG_7582.jpeg?ex=66079fce&is=65f52ace&hm=438d904c7dca64c571f7999aa2a9a00bce733bfcd203b8f3dc5cee31cc12c920&",
  "https://cdn.discordapp.com/attachments/1218427049866166293/1218427253386383391/IMG_7583.jpeg?ex=66079fce&is=65f52ace&hm=a36529a5c9fe229b83e5a67fa089170a3fe00bf68df4f8f6a7ad328da424dd52&",
  "https://cdn.discordapp.com/attachments/1218427049866166293/1218427253151629312/IMG_6771.jpeg?ex=66079fce&is=65f52ace&hm=b2b84ff249d3f86f7e375c7f4e29511fe88a80c76420469d0e02a7e6482a59cf&",
  "https://cdn.discordapp.com/attachments/1218427049866166293/1218427252866285629/IMG_7585.jpeg?ex=66079fce&is=65f52ace&hm=1558b131c6fe500f09248cf76e0e7002e050414af530d6b6043c381ce9e04496&",
  "https://cdn.discordapp.com/attachments/1218427049866166293/1218427252539133992/IMG_7586.jpeg?ex=66079fce&is=65f52ace&hm=0b463ca45d217821d67fca306e2be72f4d2e4de751f4d4d11b654df1e016b05e&",
  "https://cdn.discordapp.com/attachments/1218427049866166293/1218427252157579295/IMG_7587.jpeg?ex=66079fce&is=65f52ace&hm=fc29366d04ef3df3bbb8b0bea410b584ed2fb4c13fa2c55570ec5f354e907c0d&",
  "https://cdn.discordapp.com/attachments/1218427049866166293/1218427251905790012/IMG_7588.jpeg?ex=66079fce&is=65f52ace&hm=41cfae0506e2129cd17b370d3a76dd091cd896f49494239435693453235b51b4&",
  "https://cdn.discordapp.com/attachments/1218427049866166293/1218427251670913064/IMG_7589.jpeg?ex=66079fce&is=65f52ace&hm=a712db9c63f8c0d22e5cb173c3bd5650d610bb3b98cfd417096cfef1bf573334&",
  "https://cdn.discordapp.com/attachments/1218427049866166293/1218427251406798929/IMG_6769.jpeg?ex=66079fce&is=65f52ace&hm=52d34f38bfecb005663c7d96f331d9e248dbf46fdf622d15b6ab22097231abf7&",
  "https://cdn.discordapp.com/attachments/1218427049866166293/1218427251180175380/IMG_6770.jpeg?ex=66079fcd&is=65f52acd&hm=e20156b43547d28edfa0b71d823e2aea3117983121223e9dc6b9018da48e5b1d&",
  "https://cdn.discordapp.com/attachments/1218427049866166293/1218427200609456219/IMG_7592.jpeg?ex=66079fc1&is=65f52ac1&hm=44bdbe281f459edc7613f256e894998c5644f9f0b5647f0e18459768adbe0bc0&",
  "https://cdn.discordapp.com/attachments/1218427049866166293/1218427200370376704/IMG_7593.jpeg?ex=66079fc1&is=65f52ac1&hm=adbd2901abb481e91d5d94afca6df811d7fb37ce5a4a322b1d31816313e6a76b&",
  "https://cdn.discordapp.com/attachments/1218427049866166293/1218427200102076416/IMG_7594.jpeg?ex=66079fc1&is=65f52ac1&hm=52f2bc63232d68f12dbb1eafc70582cf20640864d4d4ee83510c846630612984&",
  "https://cdn.discordapp.com/attachments/1218427049866166293/1218427199837704223/IMG_7595.jpeg?ex=66079fc1&is=65f52ac1&hm=491e6b99a3373f98b66369f97c136fdb8deb1513b15d1d691975272d47947374&",
  "https://cdn.discordapp.com/attachments/1218427049866166293/1218427199586041856/IMG_7596.jpeg?ex=66079fc1&is=65f52ac1&hm=e735c197e8c4376ec4b558de602a49a2029f8b7be421007ca02e2843c081da35&",
  "https://cdn.discordapp.com/attachments/1218427049866166293/1218427199321935954/IMG_7597.jpeg?ex=66079fc1&is=65f52ac1&hm=f678eb18b673781af37864dce3c53ceea3730f34b548e96907375abcc3667b01&",
  "https://cdn.discordapp.com/attachments/1218427049866166293/1218427199070146670/IMG_7598.jpeg?ex=66079fc1&is=65f52ac1&hm=7c2940d98e79e0b79418889c773773ff81f4d06e8d25e625fec1b2d1f739a28c&",
  "https://cdn.discordapp.com/attachments/1218427049866166293/1218427198835261440/IMG_6772.jpeg?ex=66079fc1&is=65f52ac1&hm=7ac900ff3ee1a9aefec0002852ed22accb495ac4e0f121f6f8e93f1b48bcd97b&",
  "https://cdn.discordapp.com/attachments/1218427049866166293/1218427198604709888/IMG_7600.jpeg?ex=66079fc1&is=65f52ac1&hm=5ee1ecc9bccec24faa821740fcbf75cb630d8683c5ce355d3b4860da08fd6856&",
  "https://cdn.discordapp.com/attachments/1218427049866166293/1218427198369697812/IMG_6843.jpeg?ex=66079fc1&is=65f52ac1&hm=465bd04fca7212a754afd1b1195e40e04528fec44f5f5544f1bee01aa2d64dfa&",
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
        return i.deferUpdate().then(() => {
          i.followUp({
            content: "Invalid page number.",
            ephemeral: true
          });
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

      i.deferUpdate().then(() => {
        i.editReply({
          embeds: [embed],
          components: [rows[page - 1]]
        });

        collector.stop();

        i.followUp({
          content: "Page updated to " + page,
          ephemeral: true
        });

        // ページを変更した後にボタンが使えるようにする
        rows[page - 1].components.forEach((component) => {
          if (component.setDisabled) {
            component.setDisabled(false);
          }
        });
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
