import { ApplyOptions } from '@sapphire/decorators';
import { Listener, ListenerOptions } from '@sapphire/framework';
import { EmbedBuilder, Message, TextChannel, AuditLogEvent } from 'discord.js';

@ApplyOptions<ListenerOptions>({})
export class UserEvent extends Listener {
	public async run(message: Message) {
		const channel = message.client.channels.cache.get('1075737408676577310') as TextChannel;
		let embed = new EmbedBuilder()
			.setTitle('A message has been deleted')
			.setDescription(`<@${message.member?.id}> has deleted a message \n Message : \`${message.content}\``);

		channel.send({ embeds: [embed] });
	}
}
