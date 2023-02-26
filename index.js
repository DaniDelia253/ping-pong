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
		//todo change this to arcane when ready for NVO 
		message.content.includes("cat")
	){
		//then i want it to react with a random emoji from a list 
		const list = ["1078506917812506624", "1079448316321992715", "1079448313385996338", "1079448310982651975", "1079448308604485743", "1078508965098422417"]
		const number = Math.floor(Math.random()*6)
		message.react(list[number])
	}
});

// log in and auhtenticate
client.login(process.env.TOKEN);
//"1078506917812506624" "1079448316321992715" "1079448313385996338" "1079448310982651975" "1079448308604485743"