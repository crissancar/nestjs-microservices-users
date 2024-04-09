import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateUserCommand } from '../commands/create-user.command';
import { CreateUserResponse } from '../dtos/create-user-response.dto';
import { UserCreator } from '../services/user-creator.service';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler implements ICommandHandler<CreateUserCommand> {
	constructor(private readonly creator: UserCreator) {}

	async execute(command: CreateUserCommand): Promise<CreateUserResponse> {
		return this.creator.run(command.request);
	}
}
