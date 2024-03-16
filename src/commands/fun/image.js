const { EmbedBuilder, PermissionsBitField, ActionRowBuilder, SelectMenuBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

const images = [
  {
    label: "とろろ",
    value: "1",
    description: "とろろ",
    image: "https://cdn.discordapp.com/attachments/1218427049866166293/1218427442469928980/IMG_6295.jpeg?ex=66079ffb&is=65f52afb&hm=1179cf2748692a495ccc63de4b8cd09ebe61752f348bd4b8a04a2867e0fb2397&",
    owner: "user1"
  },
  {
    label: "とろろ",
    value: "2",
    description: "かがみもち",
    image: "https://cdn.discordapp.com/attachments/1218427049866166293/1218427442226663444/IMG_7569.jpeg?ex=66079ffb&is=65f52afb&hm=10f068898b1b94ee6474ca71314f0a070039786521ffb3b088cb9a99eb1d9a10&",
    owner: "user1"
  },
  {
    label: "とろろ",
    value: "3",
    description: "おに",
    image: "https://cdn.discordapp.com/attachments/1218427049866166293/1218427441979330631/IMG_7570.jpeg?ex=66079ffb&is=65f52afb&hm=5bfca58ea12c0f4320ff3f7ad94b889665b4a3db547b184bc979cdfe1885b9bd&",
    owner: "user1"
  },
  {
    label: "とろろ",
    value: "4",
    description: "おとのさま",
    image: "https://cdn.discordapp.com/attachments/1218427049866166293/1218427441735925770/IMG_7571.jpeg?ex=66079ffb&is=65f52afb&hm=c323cc3a49c6f4e325c8768bc86a677dc84c8e6ba63b146493cd899552a7cf32&",
    owner: "user1"
  },
  {
    label: "とろろ",
    value: "5",
    description: "さくら",
    image: "https://cdn.discordapp.com/attachments/1218427049866166293/1218427386064932894/IMG_7572.jpeg?ex=66079fee&is=65f52aee&hm=57aa68280e52b89ba3836c36267b105e3aa2d8093617194be2cff2055f455662&",
    owner: "user1"
  },
  {
    label: "とろろ",
    value: "6",
    description: "こいのぼり",
    image: "https://cdn.discordapp.com/attachments/1218427049866166293/1218427385368674415/IMG_7573.jpeg?ex=66079fed&is=65f52aed&hm=ce33d8a63842a6ec0fc00fdc106abdb1f32fb2bd0a2fec173d06d8360beba8c3&",
    owner: "user1"
  },
  {
    label: "とろろ",
    value: "7",
    description: "あじさい",
    image: "https://cdn.discordapp.com/attachments/1218427049866166293/1218427384106061934/IMG_7574.jpeg?ex=66079fed&is=65f52aed&hm=0b664d6206459842af0d4e4166a2d37664890b43ec449a1a13eaf5d218344d2a&",
    owner: "user1"
  },
  {
    label: "とろろ",
    value: "8",
    description: "ささ",
    image: "https://cdn.discordapp.com/attachments/1218427049866166293/1218427383552544798/IMG_7575.jpeg?ex=66079fed&is=65f52aed&hm=c2e4f7c0b0fb58171670959971365b2e741120b3a6024788280411e2d9d7fda6&",
    owner: "user1"
  },
  {
    label: "とろろ",
    value: "9",
    description: "すいか",
    image: "https://cdn.discordapp.com/attachments/1218427049866166293/1218427383204413450/IMG_7576.jpeg?ex=66079fed&is=65f52aed&hm=5eef295e92b1a18e1163b49f96b4e8bf5d593c6a1c5607c11a6dac16baf62f75&",
    owner: "user1"
  },
  {
    label: "とろろ",
    value: "10",
    description: "つきみ",
    image: "https://cdn.discordapp.com/attachments/1218427049866166293/1218427382856290314/IMG_7577.jpeg?ex=66079fed&is=65f52aed&hm=08bc835d59b4f466fe2c8c0af1cf9b4986f7cbec2fb4b8a0d45dac95bcc1e25c&",
    owner: "user1"
  },
  {
    label: "とろろ",
    value: "11",
    description: "はろうぃん",
    image: "https://cdn.discordapp.com/attachments/1218427049866166293/1218427382566879262/IMG_6857.jpeg?ex=66079fed&is=65f52aed&hm=386b97d1755c45d78f8af321695e6675e5c84dc837274f0fbac5a632ed0270e8&",
    owner: "user1"
  },
  {
    label: "とろろ",
    value: "12",
    description: "こうよう",
    image: "https://cdn.discordapp.com/attachments/1218427049866166293/1218427382214430821/IMG_7579.jpeg?ex=66079fed&is=65f52aed&hm=88a292221416649776553267eabc6d967e7d5ae94a98be19d2d2e01da4be5cb3&",
    owner: "user1"
  },
  {
    label: "とろろ",
    value: "13",
    description: "さんた",
    image: "https://cdn.discordapp.com/attachments/1218427049866166293/1218427381937737828/IMG_7580.jpeg?ex=66079fed&is=65f52aed&hm=eef182f9795ebc495e4434615fbba1ce766ce6d2aed9e3308355bc6c51aab39c&",
    owner: "user1"
  },
  {
    label: "とろろ",
    value: "14",
    description: "となかい",
    image: "https://cdn.discordapp.com/attachments/1218427049866166293/1218427381623033896/IMG_7581.jpeg?ex=66079fed&is=65f52aed&hm=e07ecc39e9ebf1043d569bf0329714731902aecdacfa16276a9776d4ddfb084d&",
    owner: "user1"
  },
  {
    label: "とろろ",
    value: "15",
    description: "おひめさま",
    image: "https://cdn.discordapp.com/attachments/1218427049866166293/1218427253600551002/IMG_7582.jpeg?ex=66079fce&is=65f52ace&hm=438d904c7dca64c571f7999aa2a9a00bce733bfcd203b8f3dc5cee31cc12c920&",
    owner: "user1"
  },
  {
    label: "とろろ",
    value: "16",
    description: "かどまつ",
    image: "https://cdn.discordapp.com/attachments/1218427049866166293/1218427253386383391/IMG_7583.jpeg?ex=66079fce&is=65f52ace&hm=a36529a5c9fe229b83e5a67fa089170a3fe00bf68df4f8f6a7ad328da424dd52&",
    owner: "user1"
  },
  {
    label: "とろろ",
    value: "17",
    description: "まぐろ",
    image: "https://cdn.discordapp.com/attachments/1218427049866166293/1218427253151629312/IMG_6771.jpeg?ex=66079fce&is=65f52ace&hm=b2b84ff249d3f86f7e375c7f4e29511fe88a80c76420469d0e02a7e6482a59cf&",
    owner: "user1"
  },
  {
    label: "とろろ",
    value: "18",
    description: "てあしむきむき",
    image: "https://cdn.discordapp.com/attachments/1218427049866166293/1218427252866285629/IMG_7585.jpeg?ex=66079fce&is=65f52ace&hm=1558b131c6fe500f09248cf76e0e7002e050414af530d6b6043c381ce9e04496&",
    owner: "user1"
  },
  {
    label: "とろろ",
    value: "19",
    description: "てむきむき",
    image: "https://cdn.discordapp.com/attachments/1218427049866166293/1218427252539133992/IMG_7586.jpeg?ex=66079fce&is=65f52ace&hm=0b463ca45d217821d67fca306e2be72f4d2e4de751f4d4d11b654df1e016b05e&",
    owner: "user1"
  },
  {
    label: "とろろ",
    value: "20",
    description: "あしむきむき",
    image: "https://cdn.discordapp.com/attachments/1218427049866166293/1218427252157579295/IMG_7587.jpeg?ex=66079fce&is=65f52ace&hm=fc29366d04ef3df3bbb8b0bea410b584ed2fb4c13fa2c55570ec5f354e907c0d&",
    owner: "user1"
  },
  {
    label: "とろろ",
    value: "21",
    description: "かに",
    image: "https://cdn.discordapp.com/attachments/1218427049866166293/1218427251905790012/IMG_7588.jpeg?ex=66079fce&is=65f52ace&hm=41cfae0506e2129cd17b370d3a76dd091cd896f49494239435693453235b51b4&",
    owner: "user1"
  },
  {
    label: "とろろ",
    value: "22",
    description: "りゅう",
    image: "https://cdn.discordapp.com/attachments/1218427049866166293/1218427251670913064/IMG_7589.jpeg?ex=66079fce&is=65f52ace&hm=a712db9c63f8c0d22e5cb173c3bd5650d610bb3b98cfd417096cfef1bf573334&",
    owner: "user1"
  },
  {
    label: "とろろ",
    value: "23",
    description: "ふじさん",
    image: "https://cdn.discordapp.com/attachments/1218427049866166293/1218427251406798929/IMG_6769.jpeg?ex=66079fce&is=65f52ace&hm=52d34f38bfecb005663c7d96f331d9e248dbf46fdf622d15b6ab22097231abf7&",
    owner: "user1"
  },
  {
    label: "とろろ",
    value: "24",
    description: "たか",
    image: "https://cdn.discordapp.com/attachments/1218427049866166293/1218427251180175380/IMG_6770.jpeg?ex=66079fcd&is=65f52acd&hm=e20156b43547d28edfa0b71d823e2aea3117983121223e9dc6b9018da48e5b1d&",
    owner: "user1"
  },
  {
    label: "とろろ",
    value: "25",
    description: "なす",
    image: "https://cdn.discordapp.com/attachments/1218427049866166293/1218427200609456219/IMG_7592.jpeg?ex=66079fc1&is=65f52ac1&hm=44bdbe281f459edc7613f256e894998c5644f9f0b5647f0e18459768adbe0bc0&",
    owner: "user1"
  },
  {
    label: "とろろ",
    value: "26",
    description: "はこいり",
    image: "https://cdn.discordapp.com/attachments/1218427049866166293/1218427200370376704/IMG_7593.jpeg?ex=66079fc1&is=65f52ac1&hm=adbd2901abb481e91d5d94afca6df811d7fb37ce5a4a322b1d31816313e6a76b&",
    owner: "user1"
  },
  {
    label: "とろろ",
    value: "27",
    description: "うーぱーるーぱー",
    image: "https://cdn.discordapp.com/attachments/1218427049866166293/1218427200102076416/IMG_7594.jpeg?ex=66079fc1&is=65f52ac1&hm=52f2bc63232d68f12dbb1eafc70582cf20640864d4d4ee83510c846630612984&",
    owner: "user1"
  },
  {
    label: "とろろ",
    value: "28",
    description: "にわとり",
    image: "https://cdn.discordapp.com/attachments/1218427049866166293/1218427199837704223/IMG_7595.jpeg?ex=66079fc1&is=65f52ac1&hm=491e6b99a3373f98b66369f97c136fdb8deb1513b15d1d691975272d47947374&",
    owner: "user1"
  },
  {
    label: "とろろ",
    value: "29",
    description: "ちょこ",
    image: "https://cdn.discordapp.com/attachments/1218427049866166293/1218427199586041856/IMG_7596.jpeg?ex=66079fc1&is=65f52ac1&hm=e735c197e8c4376ec4b558de602a49a2029f8b7be421007ca02e2843c081da35&",
    owner: "user1"
  },
  {
    label: "とろろ",
    value: "30",
    description: "でぃすこーど",
    image: "https://cdn.discordapp.com/attachments/1218427049866166293/1218427199321935954/IMG_7597.jpeg?ex=66079fc1&is=65f52ac1&hm=f678eb18b673781af37864dce3c53ceea3730f34b548e96907375abcc3667b01&",
    owner: "user1"
  },
  {
    label: "とろろ",
    value: "31",
    description: "あまぞん",
    image: "https://cdn.discordapp.com/attachments/1218427049866166293/1218427199070146670/IMG_7598.jpeg?ex=66079fc1&is=65f52ac1&hm=7c2940d98e79e0b79418889c773773ff81f4d06e8d25e625fec1b2d1f739a28c&",
    owner: "user1"
  },
  {
    label: "とろろ",
    value: "32",
    description: "きんし",
    image: "https://cdn.discordapp.com/attachments/1218427049866166293/1218427198835261440/IMG_6772.jpeg?ex=66079fc1&is=65f52ac1&hm=7ac900ff3ee1a9aefec0002852ed22accb495ac4e0f121f6f8e93f1b48bcd97b&",
    owner: "user1"
  },
  {
    label: "とろろ",
    value: "33",
    description: "おにぎり",
    image: "https://cdn.discordapp.com/attachments/1218427049866166293/1218427198604709888/IMG_7600.jpeg?ex=66079fc1&is=65f52ac1&hm=5ee1ecc9bccec24faa821740fcbf75cb630d8683c5ce355d3b4860da08fd6856&",
    owner: "user1"
  },
  {
    label: "とろろ",
    value: "34",
    description: "ぽてと",
    image: "https://cdn.discordapp.com/attachments/1218427049866166293/1218427198369697812/IMG_6843.jpeg?ex=66079fc1&is=65f52ac1&hm=465bd04fca7212a754afd1b1195e40e04528fec44f5f5544f1bee01aa2d64dfa&",
    owner: "user1"
  },
];

exports.commandBase = {
  prefixData: {
    name: "image",
    aliases: []
  },
  slashData: new SlashCommandBuilder()
    .setName("image")
    .setDescription("画像を表示します")
    .addStringOption((option) =>
      option.setName("people")
        .setDescription("人を選択してください")
        .setChoices(
          { name: "とろろ", value: "user1" },
        )
        .setRequired(true)
    ),
  cooldown: 5000,
  ownerOnly: false,
  slashRun: async (client, interaction) => {
    const people = interaction.options.getString("people");

    const selectedImages = images.filter((image) => image.owner === people);

    if (selectedImages.length === 0) {
      return await interaction.reply({ content: "選択したユーザーに該当する画像がありません。", ephemeral: true });
    }

    let index = 1;

    const embed = new EmbedBuilder()
      .setColor(0xFFFFFF)
      .setImage(selectedImages[index - 1].image)
      .setTimestamp();

    if (interaction.user) {
      embed.setFooter({ text: interaction.user.username, iconURL: interaction.user.displayAvatarURL() });
    }

    const row = new ActionRowBuilder().addComponents(
      new SelectMenuBuilder()
        .setCustomId("image-select")
        .setPlaceholder("画像を選択してください")
        .addOptions(
          selectedImages.map((image) => ({
            label: image.label,
            value: `${image.value}`,
            description: image.description
          }))
        )
    );

    await interaction.reply({ embeds: [embed], components: [row] });

    const filter = (i) => i.user.id === interaction.user.id;

    const collector = interaction.channel.createMessageComponentCollector({
      filter,
      time: 0 // 時間を0に設定
    });

    collector.on("collect", (i) => {
      if (i.isSelectMenu()) {
        index = parseInt(i.values[0].split("_")[1], 10);
        const selectedImage = selectedImages.find((image) => image.value === i.values[0].split("_")[0]);

        const embed = new EmbedBuilder()
          .setColor(0xFFFFFF)
          .setImage(selectedImage.image)
          .setTimestamp();

        if (interaction.user) {
          embed.setFooter({ text: interaction.user.username, iconURL: interaction.user.displayAvatarURL() });
        }

        i.update({ embeds: [embed], components: [row] });
      }
    });

    collector.on("end", (c) => {
      console.log(`Collected ${c.size} items`);
    });
  }
};
