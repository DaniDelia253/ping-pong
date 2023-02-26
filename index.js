import * as dotenv from "dotenv";
dotenv.config();
import { Client, GatewayIntentBits, Partials } from "discord.js";
import fetch from "node-fetch";

//look at the docs for ALLLL issues!!

//client obj represents the entire bot:
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		//with these three, I can gain access to text in messages
		//if i wanted info about reactions, I would have to specify that here!!
		//if something isn't working, most likely the right info is not included here!
	],
});

//to make sure we know when the bot is ready
client.on("ready", () => {
	console.log("The bot is ready :)");
});

//so basically, look at every new message.....
client.on("messageCreate", async (message) => {});

// log in and auhtenticate
client.login(process.env.TOKEN);
