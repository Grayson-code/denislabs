import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';
import type { Message } from 'discord.js';
import { distube } from '../../index';

@ApplyOptions<Command.Options>({
	description: 'A basic command',
	aliases: ['q']
})
export class UserCommand extends Command {
	public async messageRun(message: Message) {
		const queue = distube.getQueue(message);
		if (!queue) {
			message.channel.send('Nothing playing right now!');
		} else {
			message.channel.send(
				`Current queue:\n${queue.songs
					.map((song, id) => `**${id ? id : 'Playing'}**. ${song.name} - \`${song.formattedDuration}\``)
					.slice(0, 10)
					.join('\n')}`
			);
		}
	}
}
