import { ApplyOptions } from '@sapphire/decorators';
import { Command, Args } from '@sapphire/framework';
import type { Message } from 'discord.js';
import { distube } from '../../index';
import type { FilterManager } from 'distube';

@ApplyOptions<Command.Options>({
	description: 'A basic command'
})

// !TODO fix some stuff i dont know
export class UserCommand extends Command {
	public async messageRun(message: Message, args: Args) {
		if (!distube.getQueue(message)) return message.channel.send('There is no song playing right now!');
		const filter: string = await args.pick('string');
		if (!['3d', 'bassboost', 'echo', 'karaoke', 'nightcore', 'vaporwave'].includes(filter))
			return message.channel.send('Please choose the following filters: 3d, bassboost, echo, karaoke, nightcore, vaporwave');
		const s: FilterManager = distube.filters as any;
		const play = s.add(filter);
		return message.channel.send(`Current queue filter: ${play.distube.filters || 'Off'}`);
	}
}
