import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import { Client, GatewayIntentBits, Partials } from "discord.js";
import fetch from "node-fetch";

//look at the docs!!

//client obj represents the entire bot
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

//listen for whenever a new message is created

client.on("messageCreate", async (message) => {
	if (
		/[0-9]+\ (fact)/.test(message.content) &&
		message.author.username !== "ping-pong"
	) {
		// console.log(
		// 	message.content
		// 		.match(/[0-9]+\ /)
		// 		.toString()
		// 		.trim()
		// );
		const response = await fetch(
			`http://numbersapi.com/${message.content
				.match(/[0-9]+\ /)
				.toString()
				.trim()}`
		);
		const reply = await response.text();
		message.channel.send(reply);

		// console.log(body);
	} else if (message.content.toLowerCase().trim() === "show me a cat") {
		// console.log(
		// 	message.content
		// 		.match(/[0-9]+\ /)
		// 		.toString()
		// 		.trim()
		// );
		const reply = await fetch("https://aws.random.cat/meow");
		console.log(reply.url);
		// const reply = await response.text();
		message.channel.send(reply.url);

		// console.log(body);
	} else if (
		/[pP]+[iIoO]+[nN]+[gG]+/.test(message.content) &&
		message.author.username !== "ping-pong"
	) {
		let response = "";
		for (let char of message.content) {
			switch (char) {
				case "i":
					response += "o";
					break;
				case "I":
					response += "O";
					break;
				case "o":
					response += "i";
					break;
				case "O":
					response += "I";
					break;
				default:
					response += char;
					break;
			}
		}
		message.channel.send(response);
	}
});

client.login(process.env.TOKEN);
