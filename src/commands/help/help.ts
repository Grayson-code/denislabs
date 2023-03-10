import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';
import type { Message, TextChannel } from 'discord.js';
import { EmbedBuilder } from 'discord.js';

@ApplyOptions<Command.Options>({
	description: 'A basic command'
})
export class UserCommand extends Command {
	public async messageRun(message: Message) {
		return (message.channel as TextChannel).send({
			embeds: [
				new EmbedBuilder()
					.setTitle('Denis Help')
					.setDescription(`My Prefix is \`!\`, you mention me, or say hey bot to use the commands below \n`)
					.setFields([
						{
							name: '__**Useful Commands**__',
							value: '➥ping - Calculates the bots ping! \n➥meme - Random memes from reddit\n➥hardware - Shows the hardware the bot is running on\n➥music - Shows the list of music commands, and explain what they do \n ➥mc - Shows the status of the minecraft server \n ➥OpIran - We do not forget'
						}
					])
			]
		});
	}
}
