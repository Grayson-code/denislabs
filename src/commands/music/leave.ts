import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';
import type { Message } from 'discord.js';
import { distube } from '../../index';

@ApplyOptions<Command.Options>({
	description: 'A basic command'
})
export class UserCommand extends Command {
	public async messageRun(message: Message) {
		distube.voices.get(message)?.leave();
		message.channel.send('Leaved the voice channel!');
	}
}
