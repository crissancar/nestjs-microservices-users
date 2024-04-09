import { Inject, Injectable } from '@nestjs/common';

import { UserNotExistsException } from '../../domain/exceptions/user-not-exists.exception';
import { UserRepository } from '../../domain/repositories/user.repository';
import { usersConfig } from '../../users.config';
import { FindUserByIdRequest } from '../dtos/find-user-by-id-request.dto';
import { FindUserByIdResponse } from '../dtos/find-user-by-id-response.dto';

const { finderById, repository } = usersConfig;
const { repositoryInterface } = repository;
const { context } = finderById.constants;

@Injectable()
export class UserFinderById {
	constructor(@Inject(repositoryInterface) private readonly repository: UserRepository) {}

	async run(request: FindUserByIdRequest): Promise<FindUserByIdResponse> {
		const foundUser = await this.repository.findBy({ key: 'id', value: request.id });

		if (!foundUser) {
			throw new UserNotExistsException(context);
		}

		return FindUserByIdResponse.create(foundUser);
	}
}
