import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { LoggerFactory } from '../../../../../shared/app/modules/shared/services/logger-factory.service';
import { UserDomainEvents } from '../../../../../shared/app/modules/users/enums/user-domain-events.enum';
import { UpdateUserPayload } from '../../../../../shared/app/modules/users/interfaces/update-user-payload.interface';
import { UpdateUserCommand } from '../../application/commands/update-user.command';
import { usersConfig } from '../../users.config';

const { putController } = usersConfig;
const { context } = putController.constants;
const { requestLog } = putController.logs;

const logger = LoggerFactory.create(context);

@Controller()
export class UserPutController {
	constructor(private readonly commandBus: CommandBus) {}

	@MessagePattern(UserDomainEvents.UPDATE)
	async updateUser(@Payload() payload: UpdateUserPayload): Promise<void> {
		logger.log(requestLog);

		const request = payload.data.attributes;
		const command = new UpdateUserCommand(request);

		return this.commandBus.execute(command);
	}
}
