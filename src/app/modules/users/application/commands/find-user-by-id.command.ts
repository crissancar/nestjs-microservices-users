import { ICommand } from '@nestjs/cqrs';

import { FindUserByIdRequest } from '../dtos/find-user-by-id-request.dto';

export class FindUserByIdCommand implements ICommand {
	readonly request: FindUserByIdRequest;

	constructor(request: FindUserByIdRequest) {
		this.request = request;
	}
}
