import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { FindUserByIdResponse } from '../dtos/find-user-by-id-response.dto';
import { FindUserByIdQuery } from '../queries/find-user-by-id.query';
import { UserFinderById } from '../services/user-finder-by-id.service';

@QueryHandler(FindUserByIdQuery)
export class FindUserByIdQueryHandler implements IQueryHandler<FindUserByIdQuery> {
	constructor(private readonly finder: UserFinderById) {}

	async execute(command: FindUserByIdQuery): Promise<FindUserByIdResponse> {
		return this.finder.run(command.request);
	}
}
