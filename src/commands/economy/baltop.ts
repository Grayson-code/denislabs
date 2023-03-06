import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';
import xpSchema from '../../db/xpSchema';
import { EmbedBuilder, type Message } from 'discord.js';
import { send } from '@sapphire/plugin-editable-commands';

@ApplyOptions<Command.Options>({
	description: 'A basic command'
})
export class UserCommand extends Command {
	public async messageRun(message: Message) {
		let text = '';

		const embed1 = new EmbedBuilder().setColor('Red').setDescription(':white_check_mark: No one is in the leaderboard ????');

		const res = await xpSchema
			.find()
			.sort({
				coins: -1,
			})
			.limit(10);

		if (!res) await send(message, { embeds: [embed1] });
		this.container.logger.debug(res[1]);

		for (let i = 0; i < res.length; i++) {
			let { _id, coins } = res[i];

			const value = (await message.client.users.fetch(_id)) || 'Unknown Member';

			const member = value.tag;

			text += `${i + 1}. ${member} | ${coins} <:pepecoin:1079615867538641057>\n`;
		}
		const embed2 = new EmbedBuilder()
			.setColor('Blue')
			.setTitle(`${message.guild?.name}'s BalTop Leaderboard`)
			.setDescription(text)
			.setTimestamp()
			.setFooter({ text: 'BalTop Leaderboard' });

		return await send(message, { embeds: [embed2] });
	}
}
