import { sendLoadingMessage } from '#lib/utils';
import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';
import xpSchema from 'db/xpSchema';
import { EmbedBuilder, Message } from 'discord.js';
import { send } from '@sapphire/plugin-editable-commands';
@ApplyOptions<Command.Options>({
	description: 'A basic command',
	aliases: ["bal"]
})
export class UserCommand extends Command {
	public async messageRun(message: Message) {
		await sendLoadingMessage(message);

		let res = await xpSchema.findOne({  _id: message.author.id});

		if (!res) return send(message, {content: "We have encountered a error, please run the command again." });

		const embed = new EmbedBuilder()
		.setTitle(`${message.author.id}'s Balance`)
		.setDescription(`**Balance: ${res.coins}`)
		.setColor("Grey");

		return await send(message, {embeds: [embed]});
	}
}
