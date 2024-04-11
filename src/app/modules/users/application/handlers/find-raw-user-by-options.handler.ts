import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { User } from '../../../../../shared/app/modules/users/models/user.model';
import { FindRawUserByOptionsQuery } from '../queries/find-raw-user-by-options.query';
import { UserRawFinderByOptions } from '../services/user-raw-finder-by-options.service';

@QueryHandler(FindRawUserByOptionsQuery)
export class FindRawUserByOptionsQueryHandler implements IQueryHandler<FindRawUserByOptionsQuery> {
	constructor(private readonly finder: UserRawFinderByOptions) {}

	async execute(command: FindRawUserByOptionsQuery): Promise<User> {
		return this.finder.run(command.request);
	}
}
