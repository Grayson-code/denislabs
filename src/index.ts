import './lib/setup';
import { LogLevel, SapphireClient } from '@sapphire/framework';
import { GatewayIntentBits, Partials, ActivityType } from 'discord.js';
import { DisTube, Queue } from 'distube';
import mongoose from 'mongoose';
const client = new SapphireClient({
	defaultPrefix: '!',
	regexPrefix: /^(hey +)?bot[,! ]/i,
	caseInsensitiveCommands: true,
	logger: {
		level: LogLevel.Debug
	},
	shards: 'auto',
	intents: [
		GatewayIntentBits.DirectMessageReactions,
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.GuildModeration,
		GatewayIntentBits.GuildEmojisAndStickers,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.MessageContent
	],
	partials: [Partials.Channel, Partials.Reaction, Partials.Message],
	loadMessageCommandListeners: true,
	presence: {
		status: 'dnd',
		activities: [{ name: '#OpIran', type: ActivityType.Watching }]
	}
});

export const distube = new DisTube(client, {
	searchSongs: 5,
	searchCooldown: 30,
	leaveOnEmpty: false,
	leaveOnFinish: false,
	leaveOnStop: false
});

const status = (queue: Queue) =>
	`Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.names.join(', ') || 'Off'}\` | Loop: \`${
		queue.repeatMode ? (queue.repeatMode === 2 ? 'All Queue' : 'This Song') : 'Off'
	}\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``;

distube
	.on('playSong', (queue, song) =>
		queue.textChannel?.send(`Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}\n${status(queue)}`)
	)
	.on('addSong', (queue, song) => queue.textChannel?.send(`Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`))
	.on('error', (textChannel: any, e) => {
		console.error(e);
		textChannel.send(`An error encountered: ${e.message.slice(0, 2000)}`);
	})
	.on('finish', (queue) => queue.textChannel?.send('Finished the queue!'))
	.on('finishSong', (queue) => queue.textChannel?.send('Finished playing the song!'))
	.on('disconnect', (queue) => queue.textChannel?.send('Disconnected!'))
	.on('empty', (queue) => queue.textChannel?.send('The voice channel is empty! Leaving the voice channel...'))
	// DisTubeOptions.searchSongs > 1
	.on('searchResult', (message, result) => {
		let i = 0;
		message.channel.send(
			`**Choose an option from below**\n${result
				.map((song: any) => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``)
				.join('\n')}\n*Enter anything else or wait 30 seconds to cancel*`
		);
	})
	.on('searchCancel', (message) => message.channel.send('Searching canceled'))
	.on('searchInvalidAnswer', (message) => message.channel.send('Invalid number of result.'))
	.on('searchNoResult', (message) => message.channel.send('No result found!'))
	.on('searchDone', () => {});

const main = async () => {
	try {
		client.logger.info('Logging in');
		await client.login();
		client.logger.info('logged in');
		await mongoose
			.connect(process.env.MONGO, {
				keepAlive: true
			})
			.then(() => client.logger.info('Logged into MongoDB'))
			.catch((e) => client.logger.error(e));
	} catch (error) {
		client.logger.fatal(error);
		client.destroy();
		process.exit(1);
	}
};

main();
