import { ApplyOptions } from '@sapphire/decorators';
import { Args, Command } from '@sapphire/framework';
import type { Message, TextChannel } from 'discord.js';
import { distube } from '../../index';

@ApplyOptions<Command.Options>({
	description: 'A basic command',
	aliases: ['p']
})
export class UserCommand extends Command {
	public async messageRun(message: Message, args: Args) {
		if (!message.member?.voice.channel) return message.channel.send('You have to be in a voice channel to perform this command.');
		const query = await args.rest('string');
		if (!query) return message.channel.send("You haven't given any songs to play, eg usage: `!p Guantanamo`");
		return await distube.play(message.member?.voice.channel, query, {
			message,
			textChannel: message.channel as TextChannel,
			member: message.member
		});
	}
}
