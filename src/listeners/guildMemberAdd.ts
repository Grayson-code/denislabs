import { ApplyOptions } from '@sapphire/decorators';
import { Listener, ListenerOptions } from '@sapphire/framework';
import type { GuildMember, TextChannel } from 'discord.js';

@ApplyOptions<ListenerOptions>({})
export class UserEvent extends Listener {
	public async run(member: GuildMember) {
		const channel = (await member.guild.channels.fetch('1075771353317244929')) as TextChannel;
		await channel.send(
			`Hello <@${member.id}> to get verified and have access to the server please state: \n 1) Who invited you? \n 2) Whats your relationship with the person who invited you.`
		);
	}
}
