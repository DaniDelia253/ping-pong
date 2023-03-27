export function createEmbed(interaction, client) {
	const interactionOptionsArr = interaction.options._hoistedOptions;
	const title = interactionOptionsArr[1].value;
	const description = interactionOptionsArr[2].value;
	let color;
	if (interactionOptionsArr[3] === undefined) {
		color = 0xffffff;
	} else {
		color = +`0x${interactionOptionsArr[3].value}`;
	}
	let imageurl;
	if (interactionOptionsArr[4] === undefined) {
		imageurl = "";
	} else {
		imageurl = interactionOptionsArr[4].value;
	}
	const embedMessage = {
		type: "rich",
		title: eval(title),
		description: eval(description),

		color: color,
		image: {
			url: imageurl,
			height: 0,
			width: 0,
		},
	};
	client.channels
		.fetch(interaction.options._hoistedOptions[0].value)
		.then((channel) => {
			channel.send({
				embeds: [embedMessage],
			});
		});
	interaction.reply("✅");
}
