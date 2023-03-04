import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';
import { EmbedBuilder, type Message } from 'discord.js';

@ApplyOptions<Command.Options>({
	description: 'A basic command'
})
export class UserCommand extends Command {
	public async messageRun(message: Message) {
		const embed = new EmbedBuilder()
			.setTitle('🎵 | Music Commands')
			.setFields([
				{ name: '!play [music you want to play]', value: 'Starts playing a song, playlist, and if already playing adds the song or playlist to the queue. Eg: `!play guantanamo` or `!p https://open.spotify.com/playlist/xyz`' },
				{ name: '!skip', value: 'Skips the current song that is playing. Eg: `!sk`' },
				{ name: '!queue [optional, the page number]', value: 'Shows the current queue. Eg: `!queue` or `!q 1`' },
				{ name: '!pause', value: 'Pauses the current playing song. Eg:`!pa`' },
				{ name: '!resume', value: 'Resume the paused player. Eg:`!res' },
				{ name: '!stop', value: 'Destroys the queue entirely. Eg:`!stop`' },
				{name: "!shuffle", value: 'Shuffles the queue. Eg: `!sh`'},
				{name: "!nowplaying", value: "Shows the song that is currently playing. Eg: `!np`"},
				{name: "!loop", value: "Loops the queue, if a single song is playing, loops the current song only."}
			])
			.setColor("Blurple");
		return message.channel.send({ embeds: [embed] });
	}
}
