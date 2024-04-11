import { Controller } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { LoggerFactory } from '../../../../../shared/app/modules/shared/services/logger-factory.service';
import { UserDomainEvents } from '../../../../../shared/app/modules/users/enums/user-domain-events.enum';
import { FindRawUserByOptionsPayload } from '../../../../../shared/app/modules/users/interfaces/find-raw-user-by-options-payload.interface';
import { FindUserByIdPayload } from '../../../../../shared/app/modules/users/interfaces/find-user-by-id-payload.interface';
import { FindUsersByCriteriaPayload } from '../../../../../shared/app/modules/users/interfaces/find-users-by-criteria-payload.interface';
import { FindRawUserByOptionsCommand } from '../../application/commands/find-raw-user-by-options.command';
import { FindUserByIdCommand } from '../../application/commands/find-user-by-id.command';
import { FindUsersByCriteriaCommand } from '../../application/commands/find-users-by-criteria.command';
import { FindUserByIdResponse } from '../../application/dtos/find-user-by-id-response.dto';
import { FindUsersByCriteriaResponse } from '../../application/dtos/find-users-by-criteria-response.dto';
import { usersConfig } from '../../users.config';

const { getController } = usersConfig;
const { context } = getController.constants;
const { find, findByCriteria } = getController.logs;

const logger = LoggerFactory.create(context);

@Controller()
export class UserGetController {
	constructor(private readonly queryBus: QueryBus) {}

	@MessagePattern(UserDomainEvents.FIND_BY_ID)
	async findById(@Payload() payload: FindUserByIdPayload): Promise<FindUserByIdResponse> {
		logger.log(find.requestLog);

		const request = payload.data.attributes;
		const command = new FindUserByIdCommand(request);

		return await this.queryBus.execute(command);
	}

	@MessagePattern(UserDomainEvents.FIND_RAW_BY_OPTIONS)
	async findRawByOptions(
		@Payload() payload: FindRawUserByOptionsPayload,
	): Promise<FindUserByIdResponse> {
		logger.log(find.requestLog);

		const request = payload.data.attributes;
		const command = new FindRawUserByOptionsCommand(request);

		return await this.queryBus.execute(command);
	}

	@MessagePattern(UserDomainEvents.FIND_BY_CRITERIA)
	async findByCriteria(
		@Payload() payload: FindUsersByCriteriaPayload,
	): Promise<FindUsersByCriteriaResponse> {
		logger.log(findByCriteria.requestLog);

		const request = payload.data.attributes;
		const command = new FindUsersByCriteriaCommand(request);

		return this.queryBus.execute(command);
	}
}
