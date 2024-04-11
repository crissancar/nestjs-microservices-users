import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { User } from '../../../../../shared/app/modules/users/models/user.model';
import { FindRawUserByOptionsCommand } from '../commands/find-raw-user-by-options.command';
import { UserRawFinderByOptions } from '../services/user-raw-finder-by-options.service';

@CommandHandler(FindRawUserByOptionsCommand)
export class FindUserByIdCommandHandler implements ICommandHandler<FindRawUserByOptionsCommand> {
	constructor(private readonly finder: UserRawFinderByOptions) {}

	async execute(command: FindRawUserByOptionsCommand): Promise<User> {
		return this.finder.run(command.request);
	}
}
