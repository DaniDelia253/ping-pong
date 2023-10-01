const commands = [
	{
		name: "meow",
		description: "Replies with Meeeooow!!",
	},
	{
		name: "embed",
		description:
			"Enter the channelID and paste the corresponding value for each field in the code.",
		options: [
			{
				type: 3, //3 is string
				name: "channelid",
				description:
					"ChannelID for the channel where you want to send the embed",
				required: true,
			},
			{
				type: 3, //3 is string
				name: "title",
				description: "Title of the embed.",
				required: true,
			},
			{
				type: 3, //3 is string
				name: "description",
				description: "Text for the body of the embed.",
				required: true,
			},
			{
				type: 3, //3 is string
				name: "color",
				description: "Color value.",
				required: false,
			},
			{
				type: 3, //3 is string
				name: "imageurl",
				description: "Color value.",
				required: false,
			},
		],
	},
];

export default commands;
