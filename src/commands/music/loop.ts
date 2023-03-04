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

		const queue = player.getQueue(message.guild?.id!);

		if (!queue || !queue.playing) return send(message, {content:"❌ | Nothing is playing right now!"});
		const success = queue.setRepeatMode(QueueRepeatMode.AUTOPLAY);
		return void send(message, { content: success ? `✔️ | Updated loop mode!` : '❌ | Could not update loop mode!' });
	}
}
