import { ApplyOptions } from '@sapphire/decorators';
import { Command, Args } from '@sapphire/framework';
import xpSchema from '../../db/xpSchema';
import { AttachmentBuilder, EmbedBuilder, type Message} from 'discord.js';
import cavacord from 'canvacord'

@ApplyOptions<Command.Options>({
	description: 'A basic command',
	typing: true
})
export class UserCommand extends Command {
	public async messageRun(message: Message, args: Args) {
		let user = await args.pick("member").catch(() => message.member)

		const res = await xpSchema.findOne({ _xp: user!.id })
		const embed = new EmbedBuilder()
		.setColor("Blue")
		.setDescription(`:white_check_mark: <@${user}> has not gained any xp.`)

		if (!res) return message.channel.send({ embeds:[embed] });

		const requiredXP = res.level * res.level * 20 + 20;

		const rank = new cavacord.Rank()
		.setAvatar(user!.user.displayAvatarURL())
		.setBackground("IMAGE", "https://cdn.discordapp.com/attachments/1033416667184767056/1079296571830718564/41477_2019_374_Figa_HTML.png")
		.setCurrentXP(res.xp)
		.setRequiredXP(requiredXP)
		.setRank(1, 'Rank', false)
		.setLevel(res.level, "Level")
		.setUsername(user!.user.username)
		.setDiscriminator(user!.user.discriminator)
		

		const card = await rank.build()

		const attachment = new AttachmentBuilder(card, { name: "rank.png" })

		const embed2 = new EmbedBuilder()
		.setColor("Green")
		.setTitle(`${user!.user.username}'s Level / Rank`)
		.setImage("attachment://rank.png")

		return await message.channel.send({embeds:[embed2], files: [attachment] })

	}
}
