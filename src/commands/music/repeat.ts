import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';
import type { Message } from 'discord.js';
import { distube } from '../../index'

@ApplyOptions<Command.Options>({
	description: 'A basic command',
	aliases: ["loop"]
})
export class UserCommand extends Command {
	public async messageRun(message: Message) {
		const mode = distube.setRepeatMode(message);
		message.channel.send(
			`Set repeat mode to \`${
				mode
					? mode === 2
						? 'All Queue'
						: 'This Song'
					: 'Off'
			}\``,
		);
	}
}
