import { ICommand } from '@nestjs/cqrs';

import { UpdateUserRequest } from '../dtos/update-user-request.dto';

export class UpdateUserCommand implements ICommand {
	readonly request: UpdateUserRequest;

	constructor(request: UpdateUserRequest) {
		this.request = request;
	}
}
