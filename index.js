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
	console.log("The bot is ready :)))))");
});

//so basically, look at every new message.....
client.on("messageCreate", async (message) => {
	//if the message is from dani and has the words "has reached level"
	if (
		//todo change this to only arcane, and replace emojies, and change the random number limit
		message.content.includes("cat") ||
		((message.author.username === "Arcane" ||
			message.author.username === "DaniDelia" ||
			message.author.username === "stenny") &&
			message.content.includes("has reached level"))
	) {
		//then i want it to react with a random emoji from a list
		const list = [
			"1078506917812506624",
			"1079448316321992715",
			"1079448313385996338",
			"1079448310982651975",
			"1079448308604485743",
			"1078508965098422417",
			"1079463337617797260",
			"1079463626957664327",
			"1079464077442699355",
			"1079462912025952386",
		];
		const number = Math.floor(Math.random() * 10);
		message.react(list[number]);
	}

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
		//OR ELSE: if the message says show me a cat:
	}
	if (message.content.toLowerCase().trim().includes("show me a cat")) {
		//get a cat from the internet
		const reply = await fetch("https://aws.random.cat/meow");
		const file = await reply.json();
		//send the cat to the channel
		message.channel.send(file.file);

		//OR ELSE: if the message contains any spelling of the words 'ping' or 'pong' (ie. piiiing, poooongggg).....
	}
	if (
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
//"1078506917812506624" "1079448316321992715" "1079448313385996338" "1079448310982651975" "1079448308604485743"
