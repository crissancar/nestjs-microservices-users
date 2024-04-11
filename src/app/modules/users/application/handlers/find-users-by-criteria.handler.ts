import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { FindUsersByCriteriaResponse } from '../dtos/find-users-by-criteria-response.dto';
import { FindUserByIdQuery } from '../queries/find-user-by-id.query';
import { FindUsersByCriteriaQuery } from '../queries/find-users-by-criteria.query';
import { UsersFinderByCriteria } from '../services/users-finder-by-criteria.service';

@QueryHandler(FindUsersByCriteriaQuery)
export class FindUsersByCriteriaQueryHandler implements IQueryHandler<FindUsersByCriteriaQuery> {
	constructor(private readonly finder: UsersFinderByCriteria) {}

	async execute(command: FindUserByIdQuery): Promise<FindUsersByCriteriaResponse> {
		return this.finder.run(command.request);
	}
}
