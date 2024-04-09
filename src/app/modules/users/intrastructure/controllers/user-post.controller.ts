import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { LoggerFactory } from '../../../../../shared/app/modules/shared/services/logger-factory.service';
import { UserDomainEvents } from '../../../../../shared/app/modules/users/enums/user-domain-events.enum';
import { CreateUserPayload } from '../../../../../shared/app/modules/users/interfaces/create-user-payload.interface';
import { CreateUserCommand } from '../../application/commands/create-user.command';
import { usersConfig } from '../../users.config';

const { postController } = usersConfig;
const { context } = postController.constants;
const { requestLog } = postController.logs;

const logger = LoggerFactory.create(context);

@Controller()
export class UserPostController {
	constructor(private readonly commandBus: CommandBus) {}

	@MessagePattern(UserDomainEvents.CREATE)
	async run(@Payload() payload: CreateUserPayload): Promise<void> {
		logger.log(requestLog);

		const request = payload.data.attributes;
		const command = new CreateUserCommand(request);

		return this.commandBus.execute(command);
	}
}
