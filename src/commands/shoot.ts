import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';
import { ApplicationCommandType } from 'discord-api-types/v10';

@ApplyOptions<Command.Options>({
	description: 'A basic contextMenu command'
})
export class UserCommand extends Command {
	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerContextMenuCommand((builder) =>
			builder //
				.setName(this.name)
				.setType(ApplicationCommandType.Message)
		);
	}

	public async contextMenuRun(interaction: Command.ContextMenuInteraction) {
		return await interaction.reply({ content: 'Hello world!' });
	}
}
