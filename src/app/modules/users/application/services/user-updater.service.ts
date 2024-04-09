import { Inject, Injectable } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

import { LoggerFactory } from '../../../../../shared/app/modules/shared/services/logger-factory.service';
import { TypeOrmError } from '../../../../../shared/app/modules/shared/services/typeorm-error.service';
import { UpdateUserFailedException } from '../../domain/exceptions/update-user-failed.exception';
import { UserWithEmailAlreadyExistsException } from '../../domain/exceptions/user-with-email-already-exists.exception';
import { UserRepository } from '../../domain/repositories/user.repository';
import { usersConfig } from '../../users.config';
import { UpdateUserRequest } from '../dtos/update-user-request.dto';

const { updater, repository } = usersConfig;
const { repositoryInterface } = repository;
const { context } = updater.constants;

const logger = LoggerFactory.create(context);

@Injectable()
export class UserUpdater {
	constructor(@Inject(repositoryInterface) private readonly repository: UserRepository) {}

	async run(request: UpdateUserRequest): Promise<void> {
		try {
			const updatedUser = await this.repository.update(request.id, request);

			if (!updatedUser) {
				throw new UpdateUserFailedException(context);
			}
		} catch (error) {
			if (TypeOrmError.isUnique(error as QueryFailedError)) {
				throw new UserWithEmailAlreadyExistsException(context, request.email);
			}
			logger.error(error);
			throw error;
		}
	}
}
