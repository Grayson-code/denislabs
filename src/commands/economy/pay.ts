import { ApplyOptions } from '@sapphire/decorators';
import { Command, Args } from '@sapphire/framework';
import { send } from '@sapphire/plugin-editable-commands';
import xpSchema from '../../db/xpSchema';
import type { GuildMember, Message } from 'discord.js';

@ApplyOptions<Command.Options>({
	description: 'Pays the mentioned user the specified amount.'
})
export class UserCommand extends Command {
	public async messageRun(message: Message, args: Args) {
		const member: GuildMember | number = await args.pick("member").catch(() => 1);
		const amount = await args.pick("number").catch(() => 1);
		if (member == 1)  return send(message, {content: "You must mention a member to perform this command."});
		const accountToBePaid = await xpSchema.findById((member as GuildMember).id)
		const accountPaying = await xpSchema.findById(message.member!.id)
		if (!accountToBePaid || !accountPaying) return send(message, {content: "❗ | There was a error with the database. "});

		accountPaying.coins -= amount;
		accountToBePaid.coins += amount;
		
		try {
			accountPaying.save()
			accountToBePaid.save()
		} catch {
			return send(message, {content: "❗ | There was a error with the database. "})
		}

		return send(message, {content: `${message.member} just payed ${member} ${amount} <:pepecoin:1079615867538641057>.`});
	}
}
