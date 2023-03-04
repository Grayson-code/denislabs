import { ApplyOptions } from '@sapphire/decorators';
import { Command, type Args } from '@sapphire/framework';
import type { Message } from 'discord.js';
import { player } from '../../index';
import { sendLoadingMessage } from '../../lib/utils';
import { send } from '@sapphire/plugin-editable-commands';

@ApplyOptions<Command.Options>({
	description: 'A basic command',
    aliases: ['q'],
})
export class UserCommand extends Command {
	public async messageRun(message: Message, args: Args) {
		sendLoadingMessage(message);

		const queue = await player.getQueue(message.guild?.id!);

		if (!queue || !queue.playing) return send(message, {content:"❌ | Nothing is playing right now!"});
		
		let page = await args.pick("number").catch(() => 1)
		const pageStart = 10 * (page - 1);
        const pageEnd = pageStart + 10;
        const currentTrack = queue.current;
        const tracks = queue.tracks.slice(pageStart, pageEnd).map((m, i) => {
            return `${i + pageStart + 1}. **[${m.title}](${m.url})** - ${m.author}`;
        });
		return void send(message, {
            embeds: [
                {
                    title: 'Server Queue',
                    description: `${tracks.join('\n')}${
                        queue.tracks.length > pageEnd
                            ? `\n...${queue.tracks.length - pageEnd} more track(s)`
                            : ''
                    }`,
                    color: 3426654,
                    fields: [{ name: 'Now Playing', value: `🎶 | **[${currentTrack.title}](${currentTrack.url})** - ${currentTrack.author}` }]
                }
            ]
        });
	}
}
