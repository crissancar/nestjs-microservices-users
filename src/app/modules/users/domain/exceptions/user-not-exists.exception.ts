import { HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

import { RpcExceptionData } from '../../../../../shared/app/modules/shared/interfaces/rpc-exception-data.interface';

export class UserNotExistsException extends RpcException {
	constructor(context: string) {
		const message = 'User not exists';
		const code = HttpStatus.NOT_FOUND;
		const exceptionData = { code, context, message } as RpcExceptionData;

		super(exceptionData);
	}
}
