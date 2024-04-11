import { IQuery } from '@nestjs/cqrs';

import { FindUsersByCriteriaRequest } from '../dtos/find-users-by-criteria-request.dto';

export class FindUsersByCriteriaQuery implements IQuery {
	readonly request: FindUsersByCriteriaRequest;

	constructor(request: FindUsersByCriteriaRequest) {
		this.request = request;
	}
}
