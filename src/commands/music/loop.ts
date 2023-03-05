import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';
import type { Message } from 'discord.js';
import { player } from '../../index';
import { sendLoadingMessage } from '../../lib/utils';
import { send } from '@sapphire/plugin-editable-commands';
import { QueueRepeatMode } from 'discord-player';
@ApplyOptions<Command.Options>({
	description: 'A basic command'
})
export class UserCommand extends Command {
	public async messageRun(message: Message) {
		sendLoadingMessage(message);

		const queue = player.nodes.get(message.guild?.id!);

		if (!queue || !queue.isPlaying()) return send(message, {content:"❌ | Nothing is playing right now!"});

		queue.setRepeatMode(QueueRepeatMode.AUTOPLAY);
		
		return send(message, { content: `✔️ | Updated loop mode!`});
	}
}
