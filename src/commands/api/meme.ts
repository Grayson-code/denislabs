import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';
import { EmbedBuilder, type Message } from 'discord.js';
import type { API } from '../../../types/meme'
@ApplyOptions<Command.Options>({
	description: 'A basic command'
})
export class UserCommand extends Command {
	public async messageRun(message: Message) {
		const meme = await fetch("https://meme-api.com/gimme").catch(e => this.container.logger.error(e)) as unknown as API
		const embed = new EmbedBuilder()
		.setTitle(meme.title)
		.setURL(meme.postLink)
		.setAuthor({ name: meme.author })
		.setImage(meme.preview[3])
		return message.channel.send({embeds:[embed]})
	}
}
