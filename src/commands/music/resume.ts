import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';
import type { Message } from 'discord.js';
import { player } from '../../index';
import { sendLoadingMessage } from '../../lib/utils';
import { send } from '@sapphire/plugin-editable-commands';

@ApplyOptions<Command.Options>({
	description: 'A basic command',
	aliases: ['res']
})
export class UserCommand extends Command {
	public async messageRun(message: Message) {
		sendLoadingMessage(message);

		const queue = await player.nodes.get(message.guild?.id!);

        if (!queue || !queue.isPlaying) return void send(message, { content: '❌ | No music is being played!' });
        const paused = queue.node.resume();
        return send(message, { content: paused ? '⏸ | Paused!' : '❌ | Something went wrong!'});
	}
}
