import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { LoggerFactory } from '../../../../shared/app/modules/shared/services/logger-factory.service';
import { UserDomainEvents } from '../../../../shared/app/modules/users/enums/user-domain-events.enum';
import { CreateUserPayload } from '../../../../shared/app/modules/users/interfaces/create-user-payload.interface';
import { CreateUserResponse } from '../dtos/create-user-response.dto';
import { UserCreator } from '../services/user-creator.service';
import { usersConfig } from '../users.config';

const { postController } = usersConfig;
const { context } = postController.constants;
const { requestLog } = postController.logs;

const logger = LoggerFactory.create(context);

@Controller()
export class UserPostController {
	constructor(private readonly creator: UserCreator) {}

	@MessagePattern(UserDomainEvents.CREATE)
	async run(@Payload() payload: CreateUserPayload): Promise<CreateUserResponse> {
		logger.log(requestLog);

		const request = payload.data.attributes;

		return this.creator.run(request);
	}
}
