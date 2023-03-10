import { sendLoadingMessage } from '../../lib/utils';
import { ApplyOptions } from '@sapphire/decorators';
import { Command, Args } from '@sapphire/framework';
import xpSchema from '../../db/xpSchema';
import { EmbedBuilder, Message } from 'discord.js';
import { send } from '@sapphire/plugin-editable-commands';
@ApplyOptions<Command.Options>({
	description: 'A basic command',
	aliases: ['bal']
})
export class UserCommand extends Command {
	public async messageRun(message: Message, args: Args) {
		await sendLoadingMessage(message);
		const member = await args.pick("member").catch(() => message.member)
		let res = await xpSchema.findOne({ _id: member!.id });

		if (!res) return send(message, { content: 'We have encountered a error, please run the command again.' });

		const embed = new EmbedBuilder()
			.setTitle(`${member?.displayName}'s Balance`)
			.setDescription(`<:pepecoin:1079615867538641057> **Balance**: ${res.coins}`)
			.setColor('Grey');

		return await send(message, { embeds: [embed] });
	}
}
