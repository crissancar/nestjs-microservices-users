import { Inject, Injectable } from '@nestjs/common';

import { User } from '../../../../../shared/app/modules/users/models/user.model';
import { UserNotExistsException } from '../../domain/exceptions/user-not-exists.exception';
import { UserRepository } from '../../domain/repositories/user.repository';
import { usersConfig } from '../../users.config';
import { FindRawUserByOptionsRequest } from '../dtos/find-raw-user-by-options-request.dto';

const { finderById, repository } = usersConfig;
const { repositoryInterface } = repository;
const { context } = finderById.constants;

@Injectable()
export class UserRawFinderByOptions {
	constructor(@Inject(repositoryInterface) private readonly repository: UserRepository) {}

	async run(request: FindRawUserByOptionsRequest): Promise<User> {
		const { key, value, columns } = request.options;
		const foundUser = await this.repository.findRawBy({ key, value, columns });

		if (!foundUser) {
			throw new UserNotExistsException(context);
		}

		return foundUser;
	}
}
