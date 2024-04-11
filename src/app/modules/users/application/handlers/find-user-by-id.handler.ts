import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { FindUserByIdCommand } from '../commands/find-user-by-id.command';
import { FindUserByIdResponse } from '../dtos/find-user-by-id-response.dto';
import { UserFinderById } from '../services/user-finder-by-id.service';

@CommandHandler(FindUserByIdCommand)
export class FindUserCommandHandler implements ICommandHandler<FindUserByIdCommand> {
	constructor(private readonly finder: UserFinderById) {}

	async execute(command: FindUserByIdCommand): Promise<FindUserByIdResponse> {
		return this.finder.run(command.request);
	}
}
