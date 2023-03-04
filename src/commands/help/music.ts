import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';
import { EmbedBuilder, type Message } from 'discord.js';

@ApplyOptions<Command.Options>({
	description: 'A basic command'
})
export class UserCommand extends Command {
	public async messageRun(message: Message) {
		const embed = new EmbedBuilder()
			.setTitle('Music Commands 🎵')
			.setDescription(
				'play - Starts playing the song requested, if already a song is playing the requested song is added to the queue, Eg:`!p Guantanamo`'
			)
			.setFields([
				{ name: 'Leave', value: 'Stops playing, deletes the queue and leaves the vc, Eg:`!leave` ' },
				{ name: 'Pause', value: 'Pauses the current song, Eg:`!pause`' },
				{ name: 'Resume', value: 'Resumes the the current song, Eg:`!resume`' },
				{ name: 'Queue', value: 'Shows the current queue of songs, Eg:`!q`' },
				{ name: 'Skip', value: 'Skips the current song, and if there is another song in queue it will play it, Eg:`!skip' },
				{ name: 'Repeat', value: 'Loops the queue, Eg:`!repeat`' }
			]);
		return message.channel.send({ embeds: [embed] });
	}
}
