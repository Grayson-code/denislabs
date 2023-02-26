import { ApplyOptions } from '@sapphire/decorators';
import { Listener, ListenerOptions } from '@sapphire/framework';
import type { Message } from 'discord.js';
import xpSchema from '../db/xpSchema';
import { EmbedBuilder } from 'discord.js';

@ApplyOptions<ListenerOptions>({})
export class UserEvent extends Listener {
	public async run(message: Message) {
		if (!message.guild) return;
		if (message.author.bot) return;

		xpSchema.findOne({ _id: message.author.id }, async (err: any, data: any) => {
			if (err) return this.container.logger.error(err);
			if (!data) {
				xpSchema.create({
					_id: message.author.id,
					level: 0,
					xp: 0
				});
			}
		});

		const give = 1;

		const data = await xpSchema.findOne({ _id: message.author.id });

		if (!data) return;

		const requiredXP = data.level * data.level * 20 + 20;

		if (data.xp + give >= requiredXP) {
			data.xp += give;
			data.level += 1;
			await data.save();

			const embed = new EmbedBuilder()
				.setTitle('You have hit a new milestone!')
				.setDescription(`<@${message.author.id}>, you have reached ${data.level}`);

			message.channel.send({ embeds: [embed] });
		} else {
			data.xp += give;
			data.save();
		}
	}
}
