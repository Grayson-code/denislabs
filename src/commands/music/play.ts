import { ApplyOptions } from '@sapphire/decorators';
import { Args, Command } from '@sapphire/framework';
import type { Message } from 'discord.js';
import { player } from '../../index';
import { QueryType } from 'discord-player';
import { send } from '@sapphire/plugin-editable-commands';
import { sendLoadingMessage } from '../../lib/utils';

@ApplyOptions<Command.Options>({
	description: 'A basic command'
})
/**
 * TODO: Fix some bugs!
 */
export class UserCommand extends Command {
	public async messageRun(message: Message, args: Args) {
		if (!message.guild) return;
		sendLoadingMessage(message)
		const query: any = await args.rest("string").catch(() => {  return; });
		const search = await player.search(query, {
			requestedBy: message.member!.user,
			searchEngine: QueryType.AUTO,
		}).catch(this.container.logger.debug);
		if (!search || !search.tracks.length) return send(message, { content: "❌ | No tracks found!" });

		const queue = await player.createQueue(message.guild!, {
            ytdlOptions: {
                filter: 'audioonly',
                highWaterMark: 1 << 30,
                dlChunkSize: 0,
            },
            metadata: message.channel,
			leaveOnEmpty: false,
        });
		if (!queue.connection) {
			await queue.connect(message.member!.voice.channel!).catch(() => {
				player.deleteQueue(message.guild?.id!)
				return send(message, {content: "❌ | Couldn't join your channel."})
			});
		};

		await send(message, { content: `⏱ | Loading your ${search.playlist ? 'playlist' : 'track'}...` });
        search.playlist ? queue.addTracks(search.tracks) : queue.addTrack(search.tracks[0]);
        if (!queue.playing) await queue.play();
		return;
	}
}
