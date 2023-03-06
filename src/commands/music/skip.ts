import { sendLoadingMessage } from '../../lib/utils';
import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';
import { send } from '@sapphire/plugin-editable-commands';
import type { Message } from 'discord.js';
import { player } from '../../index';

@ApplyOptions<Command.Options>({
	description: 'A basic command',
	aliases: ['sk']
})
export class UserCommand extends Command {
	public async messageRun(message: Message) {
		sendLoadingMessage(message);

		const queue = await player.nodes.get(message.guild?.id!);

		if (!queue || !queue.isPlaying) return send(message, { content: '❌ | Nothing is playing right now!' });
		const currentTrack = queue.currentTrack;
		const success = queue.node.skip();
		return send(message, {
			content: success ? `✅ | Skipped **${currentTrack}**!` : '❌ | Something went wrong!'
		});
	}
}
