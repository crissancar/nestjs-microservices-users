import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UpdateUserCommand } from '../commands/update-user.command';
import { UpdateUserResponse } from '../dtos/update-user-response.dto';
import { UserUpdater } from '../services/user-updater.service';

@CommandHandler(UpdateUserCommand)
export class UpdateUserCommandHandler implements ICommandHandler<UpdateUserCommand> {
	constructor(private readonly updater: UserUpdater) {}

	async execute(command: UpdateUserCommand): Promise<UpdateUserResponse> {
		return this.updater.run(command.request);
	}
}
