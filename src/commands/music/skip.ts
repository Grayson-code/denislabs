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

		const queue = player.getQueue(message.guild?.id!);

		if (!queue || !queue.playing) return send(message, {content:"❌ | Nothing is playing right now!"});
		const currentTrack = queue.current;
		const success = queue.skip();
        return void send(message, {
            content: success ? `✅ | Skipped **${currentTrack}**!` : '❌ | Something went wrong!'
        });
	}
}
