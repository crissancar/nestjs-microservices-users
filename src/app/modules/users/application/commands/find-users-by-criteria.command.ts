import { ICommand } from '@nestjs/cqrs';

import { FindUsersByCriteriaRequest } from '../dtos/find-users-by-criteria-request.dto';

export class FindUsersByCriteriaCommand implements ICommand {
	readonly request: FindUsersByCriteriaRequest;

	constructor(request: FindUsersByCriteriaRequest) {
		this.request = request;
	}
}
