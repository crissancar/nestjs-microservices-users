import { Inject, Injectable } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

import { LoggerFactory } from '../../../../../shared/app/modules/shared/services/logger-factory.service';
import { TypeOrmError } from '../../../../../shared/app/modules/shared/services/typeorm-error.service';
import { UserWithEmailAlreadyExistsException } from '../../domain/exceptions/user-with-email-already-exists.exception';
import { UserRepository } from '../../domain/repositories/user.repository';
import { UserEntity } from '../../intrastructure/persistence/user.entity';
import { usersConfig } from '../../users.config';
import { CreateUserRequest } from '../dtos/create-user-request.dto';
import { CreateUserResponse } from '../dtos/create-user-response.dto';

const { creator, repository } = usersConfig;
const { repositoryInterface } = repository;
const { context } = creator.constants;

const logger = LoggerFactory.create(context);

@Injectable()
export class UserCreator {
	constructor(@Inject(repositoryInterface) private readonly repository: UserRepository) {}

	async run(request: CreateUserRequest): Promise<CreateUserResponse> {
		const user = UserEntity.create(request.id, request.name, request.email, request.password);

		try {
			const createdUser = await this.repository.create(user);

			return CreateUserResponse.create(createdUser);
		} catch (error) {
			if (TypeOrmError.isUnique(error as QueryFailedError)) {
				throw new UserWithEmailAlreadyExistsException(context, user.email);
			}
			logger.error(error);
			throw error;
		}
	}
}
