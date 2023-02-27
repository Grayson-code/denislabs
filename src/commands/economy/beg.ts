import { pickRandom, sendLoadingMessage } from '#lib/utils';
import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';
import { send } from '@sapphire/plugin-editable-commands';
import xpSchema from '../../db/xpSchema';
import type { Message } from 'discord.js';

@ApplyOptions<Command.Options>({
	description: 'A basic command'
})
export class UserCommand extends Command {
	public async messageRun(message: Message) {
		await sendLoadingMessage(message);

		const res = await xpSchema.findOne({  _id: message.author.id });

		if (!res) return send(message, { content: "We couldn't find a relevant document in our document. Please try again." });

		const unlucky = pickRandom([true, false]);

		if (!unlucky) return send(message, { content: "Lmao, you got nothing." });

		const randomCoins = Math.floor(Math.random() * 13);
		
		res.coins += randomCoins

		res.save();

		return send(message, {  content: `Some poor lady gave you ${randomCoins}`});
	}
}
