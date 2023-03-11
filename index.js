import * as dotenv from "dotenv";
dotenv.config();
import { Client, GatewayIntentBits, Partials } from "discord.js";
import fetch from "node-fetch";

//text examples:
//todo example orange
//!    example red
//?    example blue
//*    example green
//~~   example strikethough

//* All of our important stuff:
const GuildIDs = {
	DaniDeliaServer: "1078490032324759642",
	Server: "1048059530711404615",
	NVO: "938105437180551168",
};

const ChannelTags = {
	NVOrules: "<#938916275437064213>",
	NVOroles: "<#942151699718602773>",
	NVOanythingGoes: "<#938105437180551172>",
};

//automatically set to stenny.... changed when someone joins:
let newlyJoinedMemberId = "876850436953481277";

//client obj represents the entire bot:
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.GuildMembers,
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
	//if the message is from dani, stenny or Arcane and has the words "has reached level", then react with an emoji from the list
	if (
		//todo add/replace emojies, and change the random number limit accordingly.
		message.content.includes("cat") ||
		((message.author.username === "Arcane" ||
			message.author.username === "DaniDelia" ||
			message.author.username === "stenny") &&
			message.content.includes("has reached level"))
	) {
		//then i want it to react with a random emoji from this list:
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
	//if you say thank you to ping pong
	if (message.content.includes("thank you ping pong")) {
		//i want him to reply with "youre welcome!"
		message.channel.send("youre welcome!");
	}
	//todo (fix: format and make it apply to stenny too), goodnight message
	if (
		message.author.username === "DaniDelia" &&
		message.content.includes("good night ping pong")
	) {
		//i want him to say goodnight back, specifying the person
		message.channel.send("good night, dani!");
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
		message.author.username !== "ping-pong" &&
		message.content !== "thank you ping pong" &&
		//todo message.content !== "show me a cat"   (   THERES A BETTER WAY APPARENTLY! :)   )
		!message.content.includes("show me a cat")
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

//the following code makes leaf stack his own emoji on any leafemoji
client.on("messageReactionAdd", async (reaction) => {
	if (
		//this is for Server:
		reaction._emoji.id === "1079573401888358510" ||
		//this is for NVO:
		reaction._emoji.id === "1079573678515298344"
	) {
		// message.react("1079573401888358510")
		const channel = await client.channels.fetch(reaction.message.channelId);
		channel.messages.fetch(reaction.message.id).then((msg) => {
			msg.react(reaction._emoji.id);
		});
	}
});

// log in and auhtenticate
client.login(process.env.TOKEN);
//(1079573401888358510 serverleaf) and (1079573678515298344 for NVO/akaServerID#938105437180551168)
