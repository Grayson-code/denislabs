import { ApplyOptions } from '@sapphire/decorators';
import { Listener, ListenerOptions } from '@sapphire/framework';
import type { Message, TextChannel } from 'discord.js';
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
					xp: 0,
					coins: 0
				});
			}
		});

		const give = 1;
		const giveCoins = 1;

		const data = await xpSchema.findOne({ _id: message.author.id });

		if (!data) return;

		const requiredXP = data.level * data.level * 20 + 20;

		if (data.xp + give >= requiredXP) {
			data.xp += give;
			data.coins += giveCoins;
			data.level += 1;
			await data.save();

			const embed = new EmbedBuilder().setColor('Yellow').setDescription(`<@${message.author.id}>, you have reached level ${data.level}`);

			(message.channel as TextChannel).send({ embeds: [embed] });
		} else {
			data.xp += give;
			data.coins += giveCoins;
			data.save();
		}
	}
}
