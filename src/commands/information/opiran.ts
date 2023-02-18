import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';
import type { Message } from 'discord.js';
import { EmbedBuilder } from 'discord.js';

@ApplyOptions<Command.Options>({
	description: 'A basic command'
})
export class UserCommand extends Command {
	public async messageRun(message: Message) {
		return message.channel.send({
			embeds: [
				new EmbedBuilder()
					.setTitle('Operation Iran')
					.setDescription(
						'The Anonymous collective launches a cyber operation against the Iranian government #Anonymous #OpIran, The Denis Labs Penetration Force has also lauched a cyber attack against the Iranian government for their crimes towards protesters fighting for a basic right.'
					)
					.setFooter({ text: 'We are Anonymous. We are legion. We do not forgive. We do not forget. Expect us.' })
					.setAuthor({ iconURL: 'https://pbs.twimg.com/profile_images/1337189109631246338/tJyPJ4qh_400x400.jpg', name: 'Anonymous' })
			]
		});
	}
}
