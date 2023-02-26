import { ApplyOptions } from '@sapphire/decorators';
import { Listener, ListenerOptions } from '@sapphire/framework';
import type { MessageReaction, User } from 'discord.js';

@ApplyOptions<ListenerOptions>({})
export class UserEvent extends Listener {
	public async run(messageReaction: MessageReaction, user: User) {
		if (messageReaction.partial) {
			await messageReaction.fetch().catch();
		}
		if (messageReaction.message.channel.id !== '1076059315644928052') {
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
			case '♂️':
				this.addReaction('1076769787444731955', messageReaction, user);
				break;
			case '♀️':
				this.addReaction('1076769834802630726', messageReaction, user);
				break;
			case '😁':
				this.addReaction('1076769868101202050', messageReaction, user);
				break;
			case '🇻':
				this.addReaction('1076769978948272138', messageReaction, user);
				break;
			case '🇲':
				this.addReaction('1076770020652232757', messageReaction, user);
				break;
			case '🇨':
				this.addReaction('1076770048816988222', messageReaction, user);
				break;
			case '🇫':
				this.addReaction('1076770092223828028', messageReaction, user);
				break;
			case '🇦':
				this.addReaction('1076770126122188840', messageReaction, user);
				break;
			case '🔫':
				this.addReaction('1076770185932972105', messageReaction, user);
				break;
			case '🇱':
				this.addReaction('1076770257873674260', messageReaction, user);
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
