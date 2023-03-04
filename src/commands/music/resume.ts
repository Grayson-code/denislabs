import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';
import type { Message } from 'discord.js';
import { player } from '../../index';
import { sendLoadingMessage } from '../../lib/utils';
import { send } from '@sapphire/plugin-editable-commands';

@ApplyOptions<Command.Options>({
	description: 'A basic command'
})
export class UserCommand extends Command {
	public async messageRun(message: Message) {
		sendLoadingMessage(message);

		const queue = player.getQueue(message.guild?.id!);

        if (!queue || !queue.playing) return void send(message, { content: '❌ | No music is being played!' });
        const paused = queue.setPaused(false);
        return void send(message, { content: paused ? '⏸ | Paused!' : '❌ | Something went wrong!'});
	}
}
