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

		const queue = player.nodes.get(message.guild?.id!);

		if (!queue || !queue.isPlaying) return send(message, { content: '❌ | Nothing is playing right now!' });
		queue.delete();
		return void send(message, {
			content: `🛑 | Stopped the player!`
		});
	}
}
