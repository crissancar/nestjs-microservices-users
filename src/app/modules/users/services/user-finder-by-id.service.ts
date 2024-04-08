import { Inject, Injectable } from '@nestjs/common';

import { FindUserByIdRequest } from '../dtos/find-user-by-id-request.dto';
import { FindUserByIdResponse } from '../dtos/find-user-by-id-response.dto';
import { UserNotExistsException } from '../exceptions/user-not-exists.exception';
import { UserRepository } from '../repositories/user.repository';
import { usersConfig } from '../users.config';

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
