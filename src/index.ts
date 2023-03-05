import './lib/setup';
import { LogLevel, SapphireClient } from '@sapphire/framework';
import { GatewayIntentBits, Partials, ActivityType } from 'discord.js';
import mongoose from 'mongoose';
import { Player } from 'discord-player';

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

export const player = new Player(client);

const main = async () => {
	try {
		client.logger.info('Logging in');
		await client.login(process.env.DISCORD_TOKEN);
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
