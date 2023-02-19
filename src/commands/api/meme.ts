import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';
import { EmbedBuilder, type Message } from 'discord.js';
import { fetch, FetchResultTypes } from '@sapphire/fetch';

import type { API } from '../../../types/meme'
@ApplyOptions<Command.Options>({
	description: 'A basic command'
})
export class UserCommand extends Command {
	public async messageRun(message: Message) {
		const meme = await fetch<API>("https://meme-api.com/gimme", FetchResultTypes.JSON)
		const embed = new EmbedBuilder()
		.setTitle(meme.title)
		.setURL(meme.postLink)
		.setAuthor({ name: meme.author })
		.setImage(meme.preview[3])
		return message.channel.send({embeds:[embed]})
	}
}
