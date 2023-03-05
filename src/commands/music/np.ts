import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';
import type { Message } from 'discord.js';
import { player } from '../../index';
import { sendLoadingMessage } from '../../lib/utils';
import { send } from '@sapphire/plugin-editable-commands';

@ApplyOptions<Command.Options>({
	description: 'A basic command',
    aliases: ['nowplaying']
})
export class UserCommand extends Command {
	public async messageRun(message: Message) {
		sendLoadingMessage(message);

		const queue = player.nodes.get(message.guild?.id!);

		if (!queue || !queue.isPlaying) return send(message, {content:"❌ | Nothing is playing right now!"});

		const progress = queue.node.createProgressBar();
        const perc = queue.node.getTimestamp();


		return void send(message, {
            embeds: [
                {
                    title: 'Now Playing',
                    description: `🎶 | **[${queue.currentTrack?.title}](${queue.currentTrack?.url}) - ${queue.currentTrack?.author}** (\`${perc!.progress == Infinity ? 'Live' : perc!.progress + '%'}\`)`,
                    fields: [
                        {
                            name: '\u200b',
                            value: progress!.replace(/ 0:00/g, ' ◉ LIVE')
                        }
                    ],
                    color: 3426654
                }
            ]
        });
	}
}
