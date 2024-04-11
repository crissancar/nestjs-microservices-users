import { IQuery } from '@nestjs/cqrs';

import { FindUserByIdRequest } from '../dtos/find-user-by-id-request.dto';

export class FindUserByIdQuery implements IQuery {
	readonly request: FindUserByIdRequest;

	constructor(request: FindUserByIdRequest) {
		this.request = request;
	}
}
