import { ApplyOptions } from '@sapphire/decorators';
import { Args, Command } from '@sapphire/framework';
import type { Message } from 'discord.js';
import { player } from '../../index';
import { QueryType } from 'discord-player';
import { send } from '@sapphire/plugin-editable-commands';
import { sendLoadingMessage } from '../../lib/utils';

@ApplyOptions<Command.Options>({
	description: 'A basic command',
	aliases: ['p']
})
/**
 * TODO: Fix some bugs!
 */
export class UserCommand extends Command {
	public async messageRun(message: Message, args: Args) {
		if (!message.guild) return;
		if (!message.member?.voice.channel) return;
		sendLoadingMessage(message);

		const query: any = await args.rest('string').catch(() => {
			return;
		});

		const queue = player.nodes.create(message.guild, {
			metadata: {
				channel: message.channel,
				client: message.guild.members.me,
				requestedBy: message.member.user
			},
			selfDeaf: true,
			leaveOnEmpty: true,
			leaveOnEmptyCooldown: 300000,
			leaveOnEnd: true,
			leaveOnEndCooldown: 300000
		});
		const search = await player.search(query, { searchEngine: QueryType.AUTO });
		if (!search || !search.tracks.length) return send(message, { content: '❌ | No tracks found!' });

		if (!queue.connection) await queue.connect(message.member.voice!.channel);
		queue.addTrack(search.tracks);

		await queue.node.play();

		return await send(message, { content: `⏱ | Loading your ${search.playlist ? 'playlist' : 'track'}...` });
	}
}
