import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { LoggerFactory } from '../../../../shared/app/modules/shared/services/logger-factory.service';
import { UserDomainEvents } from '../../../../shared/app/modules/users/enums/user-domain-events.enum';
import { FindRawUserByOptionsPayload } from '../../../../shared/app/modules/users/interfaces/find-raw-user-by-options-payload.interface';
import { FindUserByIdPayload } from '../../../../shared/app/modules/users/interfaces/find-user-by-id-payload.interface';
import { FindUsersByCriteriaPayload } from '../../../../shared/app/modules/users/interfaces/find-users-by-criteria-payload.interface';
import { FindUserByIdResponse } from '../dtos/find-user-by-id-response.dto';
import { FindUsersByCriteriaResponse } from '../dtos/find-users-by-criteria-response.dto';
import { UserFinderById } from '../services/user-finder-by-id.service';
import { UserRawFinderByOptions } from '../services/user-raw-finder-by-options.service';
import { UsersFinderByCriteria } from '../services/users-finder-by-criteria.service';
import { usersConfig } from '../users.config';

const { getController } = usersConfig;
const { context } = getController.constants;
const { find, findByCriteria } = getController.logs;

const logger = LoggerFactory.create(context);

@Controller()
export class UserGetController {
	constructor(
		private readonly finderById: UserFinderById,
		private readonly finderByCriteria: UsersFinderByCriteria,
		private readonly rawFinderByOptions: UserRawFinderByOptions,
	) {}

	@MessagePattern(UserDomainEvents.FIND_BY_ID)
	async findById(@Payload() payload: FindUserByIdPayload): Promise<FindUserByIdResponse> {
		logger.log(find.requestLog);

		const request = payload.data.attributes;

		return await this.finderById.run(request);
	}

	@MessagePattern(UserDomainEvents.FIND_RAW_BY_OPTIONS)
	async findRawByOptions(
		@Payload() payload: FindRawUserByOptionsPayload,
	): Promise<FindUserByIdResponse> {
		logger.log(find.requestLog);

		const request = payload.data.attributes;

		return await this.rawFinderByOptions.run(request);
	}

	@MessagePattern(UserDomainEvents.FIND_BY_CRITERIA)
	async findByCriteria(
		@Payload() payload: FindUsersByCriteriaPayload,
	): Promise<FindUsersByCriteriaResponse> {
		logger.log(findByCriteria.requestLog);

		const request = payload.data.attributes;

		return this.finderByCriteria.run(request);
	}
}
