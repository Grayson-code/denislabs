import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';
import { EmbedBuilder, Message } from 'discord.js';
import checker from 'minecraft-pinger'

@ApplyOptions<Command.Options>({
	description: 'A basic command'
})
export class UserCommand extends Command {
	public async messageRun(message: Message) {
		const isOnline = await checker.pingPromise("ssnpokemon11.aternos.me", 33642)
		const mc = isOnline.description?.text!.includes("offline");
		const embed = new EmbedBuilder()
		.setTitle("Is the Server online?")
		.setDescription(mc ? "The server is offline 🔴" : `The server is online 🟢 \n Ping : ${isOnline.ping}\n Players: ${isOnline.players.online}/69`)
	
		return message.channel.send({embeds:[embed]})
	}
}
