import { ApplyOptions } from '@sapphire/decorators';
import { Listener, ListenerOptions } from '@sapphire/framework';
import type { MessageReaction, User } from 'discord.js';

@ApplyOptions<ListenerOptions>({})
export class UserEvent extends Listener {
	public async run(messageReaction: MessageReaction, user: User) {
		if (messageReaction.partial) {
			await messageReaction.fetch().catch();
		}
		if (messageReaction.message.id !== '1076060764860854272') {
			return;
		}
		switch (messageReaction.emoji.name) {
			case '🔞':
				this.addReaction('1076058661601947668', messageReaction, user);
				break;
			case '🏃‍♂️':
				this.addReaction('1076058821295865876', messageReaction, user);
				break;
			case '🎨':
				this.addReaction('1076058755000713226', messageReaction, user);
				break;
			case '🖥️':
				this.addReaction('1076058696058150942', messageReaction, user);
				break;
			default:
				console.log(messageReaction.emoji.name);
				console.log('your emojis got some problem');
		}
	}

	private async addReaction(roleId: string, messageReaction: MessageReaction, user: User) {
		const role: any = await messageReaction.message.guild?.roles.fetch(roleId);
		const member = await messageReaction.message.guild?.members.fetch(user.id);
		await member!.roles.add(role);
	}
}
