import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
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
client.on("messageCreate", async (message) => {
	//and if it contains a number followed by a space and teh word fact....
	if (
		/[0-9]+\ (fact)/.test(message.content) &&
		message.author.username !== "ping-pong"
	) {
		//get a fact with that number!!
		const response = await fetch(
			`http://numbersapi.com/${message.content
				.match(/[0-9]+\ /)
				.toString()
				.trim()}`
		);
		const reply = await response.text();
		//send the message with the fact to the channel!
		message.channel.send(reply);
		//OR ELSE: if the message contains any spelling of the words 'ping' or 'pong' (ie. piiiing, poooongggg).....
	} else if (
		/[pP]+[iIoO]+[nN]+[gG]+/.test(message.content) &&
		message.author.username !== "ping-pong"
	) {
		//go through every single letter of the message..... and....
		let response = "";
		for (let char of message.content) {
			switch (char) {
				//if the letter is an i...
				case "i":
					//change it to an o...
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
					//keep all other letters the same
					response += char;
					break;
			}
		}
		//send the response
		message.channel.send(response);
	}
});

// log in and auhtenticate
client.login(process.env.TOKEN);
