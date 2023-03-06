import { ApplyOptions } from '@sapphire/decorators';
import { Args, Command } from '@sapphire/framework';
import { send } from '@sapphire/plugin-editable-commands';
import xpSchema from '../../db/xpSchema';
import type { GuildMember, Message } from 'discord.js';

@ApplyOptions<Command.Options>({
	description: 'Robs a user a random % of their balance',
	cooldownDelay: 30_000,
})
export class UserCommand extends Command {
	public async messageRun(message: Message, args: Args) {
		const member: GuildMember | number = await args.pick("member").catch(() => 1);
		if (member == 1) return send(message, {content: "You must mention a member to perform this command."});
		if (Math.round(Math.random()* 10) > 5) return send(message, { content: 'Your just unlucky mate.' });

		const res = await xpSchema.findById((member as GuildMember).id)
		if (!res) return send(message, {content: "❗ | There was a error with the database. "});
		if (res.coins < 50) return send(message, {content: "<:nooo:1075447742517751889> | that guy has no money man"})
		const perc = Math.round(Math.random()) * 100;

		const stolenCoins = perc/100 * res.coins

		const depositAccount = await xpSchema.findById(message.member!.id);
		if(!depositAccount) return send(message, {content: "You dont have account set up?"});

		depositAccount.coins += stolenCoins;

		depositAccount.save().catch(() => {
			return send(message, {content: "Something went wrong on our end | HTTP 500 Internal server error"})
		})
		res.coins -= stolenCoins;
		res.save();
		
		return send(message, {content: `You just stole ${stolenCoins} coins from ${member}, LMFAO`});
	}
}
