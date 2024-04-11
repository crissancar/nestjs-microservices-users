import { ICommand } from '@nestjs/cqrs';

import { FindRawUserByOptionsRequest } from '../dtos/find-raw-user-by-options-request.dto';

export class FindRawUserByOptionsCommand implements ICommand {
	readonly request: FindRawUserByOptionsRequest;

	constructor(request: FindRawUserByOptionsRequest) {
		this.request = request;
	}
}
