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

		const queue = player.getQueue(message.guild?.id!);

		if (!queue || !queue.playing) return send(message, {content:"❌ | Nothing is playing right now!"});

		const progress = queue.createProgressBar();
        const perc = queue.getPlayerTimestamp();


		return void send(message, {
            embeds: [
                {
                    title: 'Now Playing',
                    description: `🎶 | **[${queue.current.title}](${queue.current.url}) - ${queue.current.author}** (\`${perc.progress == Infinity ? 'Live' : perc.progress + '%'}\`)`,
                    fields: [
                        {
                            name: '\u200b',
                            value: progress.replace(/ 0:00/g, ' ◉ LIVE')
                        }
                    ],
                    color: 3426654
                }
            ]
        });
	}
}
