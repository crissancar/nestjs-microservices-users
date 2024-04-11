import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { FindUserByIdCommand } from '../commands/find-user-by-id.command';
import { FindUsersByCriteriaCommand } from '../commands/find-users-by-criteria.command';
import { FindUsersByCriteriaResponse } from '../dtos/find-users-by-criteria-response.dto';
import { UsersFinderByCriteria } from '../services/users-finder-by-criteria.service';

@CommandHandler(FindUsersByCriteriaCommand)
export class FindUsersByCriteriaCommandHandler
	implements ICommandHandler<FindUsersByCriteriaCommand>
{
	constructor(private readonly finder: UsersFinderByCriteria) {}

	async execute(command: FindUserByIdCommand): Promise<FindUsersByCriteriaResponse> {
		return this.finder.run(command.request);
	}
}
