import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { LoggerFactory } from '../../../../shared/app/modules/shared/services/logger-factory.service';
import { UserDomainEvents } from '../../../../shared/app/modules/users/enums/user-domain-events.enum';
import { UpdateUserPayload } from '../../../../shared/app/modules/users/interfaces/update-user-payload.interface';
import { UpdateUserResponse } from '../dtos/update-user-response.dto';
import { UserUpdater } from '../services/user-updater.service';
import { usersConfig } from '../users.config';

const { putController } = usersConfig;
const { context } = putController.constants;
const { requestLog } = putController.logs;

const logger = LoggerFactory.create(context);

@Controller()
export class UserPutController {
	constructor(private readonly userUpdater: UserUpdater) {}

	@MessagePattern(UserDomainEvents.UPDATE)
	async updateUser(@Payload() payload: UpdateUserPayload): Promise<UpdateUserResponse> {
		logger.log(requestLog);

		const request = payload.data.attributes;

		return this.userUpdater.run(request);
	}

	// @MessagePattern('user.updatePassword')
	// async updateUserPassword(@Payload() payload: any): Promise<UpdateUserResponse> {
	// 	logger.log(requestLog);

	// 	const request = payload.data.attributes as UpdateUserPasswordRequest;

	// 	return this.userPasswordUpdater.run(request);
	// }
}
