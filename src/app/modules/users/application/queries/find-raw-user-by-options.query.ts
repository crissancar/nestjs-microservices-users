import { IQuery } from '@nestjs/cqrs';

import { FindRawUserByOptionsRequest } from '../dtos/find-raw-user-by-options-request.dto';

export class FindRawUserByOptionsQuery implements IQuery {
	readonly request: FindRawUserByOptionsRequest;

	constructor(request: FindRawUserByOptionsRequest) {
		this.request = request;
	}
}
