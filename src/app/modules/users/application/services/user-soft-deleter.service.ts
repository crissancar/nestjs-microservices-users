import { Inject, Injectable } from '@nestjs/common';

import { UserNotExistsException } from '../../domain/exceptions/user-not-exists.exception';
import { UserRepository } from '../../domain/repositories/user.repository';
import { usersConfig } from '../../users.config';
import { SoftDeleteUserRequest } from '../dtos/soft-delete-user-request.dto';
import { SoftDeleteUserResponse } from '../dtos/soft-delete-user-response.dto';

const { softDeleter, repository } = usersConfig;
const { repositoryInterface } = repository;
const { context } = softDeleter.constants;

@Injectable()
export class UsersoftDeleter {
	constructor(@Inject(repositoryInterface) private readonly repository: UserRepository) {}

	async run(request: SoftDeleteUserRequest): Promise<SoftDeleteUserResponse> {
		const softDeletedUser = await this.repository.softDelete(request.id);

		if (!softDeletedUser) {
			throw new UserNotExistsException(context);
		}

		return SoftDeleteUserResponse.create(request.id);
	}
}
