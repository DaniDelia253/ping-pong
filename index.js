import * as dotenv from "dotenv";
dotenv.config();
import { Client, REST, Routes, GatewayIntentBits } from "discord.js";
import fetch from "node-fetch";
import commands from "./commands.js";
import { createEmbed } from "./commands/embed.js";
//import moment from "moment/moment.js";
import moment from "moment-timezone";

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

const ChannelIDs = {
    NVOwelcome: "1081977778829795338",
    NVOtestTestTesting: "962146899220131860",
    NVOSuggestions: "1042496838005174292",
    NVOHeyIPlanted: "939973859795431445",
    ServerGeneral: "1048059530711404618",
    ServerYesNo: "1089293622337359993",
    ServerDizzyPlant: "1089311289031000130",
    ServerInfographics: "1104859015361609882",
    ServerBotfun: "1078492864692113458",
    DaniDeliaGeneral: "1078490033037770805",
};

const LeafEmojiIds = {
    serverLeaf: "1079573401888358510",
    NVOLeaf: "1079573678515298344",
};

const EmojiIDs = {
    NVObearyyes: "941618386897612841",
    NVObearyno: "939389511677386792",
    serveryescat: "1089386412849250414",
    servernocat: "1089296461415596153",
    dizzy: "💫",
};

const plantedAtPhrases = [
    "planted at",
    "planted in",
    "plant at",
    "Planted at",
    "Planted in",
    "Plant at",
];

const currentDate = new Date();
const currentUTCTime = `${currentDate.getUTCHours()}:${currentDate.getMinutes()}`;
//console.log(currentTimeCST);

//*END of important stuff

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

client.on("error", (error) => {
    console.log("Error!!!");
    console.log(error);
});

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === "meow") {
        await interaction.reply("Meeeoooww!");
    }
    if (interaction.commandName === "roast") {
        const response = await fetch(
            "https://evilinsult.com/generate_insult.php"
        );
        const reply = await response.text();

        //send the message with the fact to the channel!
        await interaction.reply(reply);
    }
    if (interaction.commandName === "embed") {
        createEmbed(interaction, client);
    }
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
    //! the following repeating with line 163?
    //if you say thank you to ping pong
    // if (
    //     message.content.includes("thank you ping pong") ||
    //     message.content.includes("Thank you ping pong")
    // ) {
    //     //i want him to reply with "youre welcome!"
    //     message.channel.send("You're welcome!");
    //}
    //if (message.content.includes("good night ping pong")) {

    //!  ADD TO LEAF:
    //if  "StennysID" says "Meditation" then leaf will send a reminder to "bot fun" for "medi today!""
    if (
        message.author.id === "876850436953481277" &&
        message.content.includes("Meditation") &&
        message.channelId === ChannelIDs.ServerInfographics
    ) {
        const channel = await client.channels.fetch(ChannelIDs.ServerBotfun);
        channel.send("There's a medi quest today!");
    }

    //!do the following three chat commands need to be lumped together somehow?
    if (
        /\b[Gg]+[Oo]+[Oo]+[Dd]+.*[Nn]+[Ii]+[[Gg]+[Hh]+[Tt].*[Pp]+[Ii]+[Nn]+[Gg]+.*[Pp]+[Oo]+[Nn]+[Gg]+.*\b/.test(
            message.content
        )
    ) {
        //ping pong will say goodnight back, and specify the person.
        message.channel.send(`Good night, ${message.author.username}!`);
    }
    if (
        /\b[Tt]+[Hh]+[Aa]+[Nn]+[Kk].*[Yy]+[Oo]+[[Uu].*[Pp]+[Ii]+[Nn]+[Gg]+.*[Pp]+[Oo]+[Nn]+[Gg]+.*\b/.test(
            message.content
        )
    ) {
        message.channel.send(`You're welcome, ${message.author.username}!`);
    }
    if (
        /\b[Hh]+[Ee]+[Ll]+[Ll]+[Oo].*[Pp]+[Ii]+[Nn]+[Gg]+.*[Pp]+[Oo]+[Nn]+[Gg]+.*\b/.test(
            message.content
        )
    ) {
        const list = [
            `Why hello there, ${message.author.username}!`,
            `Ahoy, ${message.author.username}!`,
            `Hello, ${message.author.username}! How are you?? :)`,
        ];
        const number = Math.floor(Math.random() * 3);
        message.channel.send(list[number]);

        // message.channel.send(`Why hello there, ${message.author.username}!`) &&
        //     message.channel.send(`Ahoy, ${message.author.username}!`);
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
        message.content !== "Thank you ping pong" &&
        //todo message.content !== "show me a cat"   (   THERES A BETTER WAY APPARENTLY! :)   )
        //!can i delete this? ^
        !message.content.includes("show me a cat") &&
        !/\b[Gg]+[Oo]+[Oo]+[Dd]+.*[Nn]+[Ii]+[[Gg]+[Hh]+[Tt].*[Pp]+[Ii]+[Nn]+[Gg]+.*[Pp]+[Oo]+[Nn]+[Gg]+.*\b/.test(
            message.content
        ) &&
        !/\b[Tt]+[Hh]+[Aa]+[Nn]+[Kk].*[Yy]+[Oo]+[[Uu].*[Pp]+[Ii]+[Nn]+[Gg]+.*[Pp]+[Oo]+[Nn]+[Gg]+.*\b/.test(
            message.content
        ) &&
        !/\b[Hh]+[Ee]+[Ll]+[Ll]+[Oo].*[Pp]+[Ii]+[Nn]+[Gg]+.*[Pp]+[Oo]+[Nn]+[Gg]+.*\b/.test(
            message.content
        )
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
    if (message.channelId === ChannelIDs.ServerYesNo) {
        //if a message is sent in this channel then react with YES and NO emoji.
        message.react(EmojiIDs.serveryescat);
        message.react(EmojiIDs.servernocat);
        //~~ alternative way of doing more than one reaction:
        //~~ [EmojiIDs.serveryescat, EmojiIDs.servernocat].forEach((id) =>
        //~~ 	message.react(id)
        //~~ );
    }
    if (/\b[lL]+[eE]+[aA]+[fF]+\b/.test(message.content)) {
        //have the bot react with leafs emoji
        //check whether I/m in server or NVO
        if (message.guildId === GuildIDs.Server) {
            message.react(LeafEmojiIds.serverLeaf);
        } else if (message.guildId === GuildIDs.NVO) {
            message.react(LeafEmojiIds.NVOLeaf);
        }
    }
    //if the message is in the channel HeyIPleanted
    if (message.channelId === ChannelIDs.ServerDizzyPlant) {
        //and it includes "planted at/in"
        plantedAtPhrases.forEach((phrase) => {
            if (message.content.includes(phrase)) {
                //then react with the dizzy emoji.
                message.react(EmojiIDs.dizzy);
            }
            3;
        });
    }

    //scheduling messages on user request:
    //if "leaf ping me for the next event" is said
    //then leaf will send a reminder at the scheduled time and @ the person.
    if (message.content.includes("next event")) {
        //add the person's user id--  <@${member.user.id}>
        const EventList = [];
        //if someone joins as the 1st person on the list, start timer till the event and send the message to everyone on the list when the event happns, clear the list, and stop the timer?
        //determine when the next event is happening
        //if the seconds are 00, it is geyser time:
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

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log("Started refreshing application (/) commands.");

        await rest.put(Routes.applicationCommands(process.env.CLIENTID), {
            body: commands,
        });

        console.log("Successfully reloaded application (/) commands.");
    } catch (error) {
        console.error(error);
    }
})();
// log in and auhtenticate
client.login(process.env.TOKEN);
//(emojiID:1079573401888358510 serverleaf) and (EmojiID:1079573678515298344 for NVO/akaServerID#938105437180551168)
