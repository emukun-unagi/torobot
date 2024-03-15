const { Client, GatewayIntentBits, Partials } = require("discord.js");
const client = new Client({
  intents: Object.values(GatewayIntentBits), 
  partials: Object.values(Partials),
  shards: "auto"
});
const { readdirSync } = require("node:fs");

const http = require('http');
http.createServer(function(request, response)
{
      response.writeHead(200, {'Content-Type': 'text/plain'});
	response.end('Bot is online!');
}).listen(3000);

const token = process.env.token;

readdirSync("./src/utils").map(async (file) => {
const util = await require(`./src/utils/${file}`);
util.execute(client);
});

client.login(token);
