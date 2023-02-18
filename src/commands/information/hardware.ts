import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';
import { Message, EmbedBuilder } from 'discord.js';
import { bytesToSize } from '../../lib/utils';
import os from 'node:os';

@ApplyOptions<Command.Options>({
	description: 'A basic command'
})
export class UserCommand extends Command {
	public async messageRun(message: Message) {
		const cpu = os.cpus();
		return message.channel.send({
			embeds: [
				new EmbedBuilder()
					.setTitle('Host Hardware')
					.setDescription(
						`Cpu Architecture: ${os.arch()} \n Cpu: ${
							cpu[1].model
						} \n Operating System: ${os.platform()}\n Operation System Version: ${os.release()} \n Memory: ${bytesToSize(
							os.totalmem()
						)} \n System Uptime: ${Math.floor(os.uptime() / 3600)} Hours`
					)
			]
		});
	}
}
