import { Inject, Injectable } from '@nestjs/common';

import { UserRepository } from '../../domain/repositories/user.repository';
import { UserCriteriaQuery } from '../../intrastructure/persistence/user-criteria.query';
import { usersConfig } from '../../users.config';
import { FindUsersByCriteriaRequest } from '../dtos/find-users-by-criteria-request.dto';
import { FindUsersByCriteriaResponse } from '../dtos/find-users-by-criteria-response.dto';

const { repositoryInterface } = usersConfig.repository;

@Injectable()
export class UsersFinderByCriteria {
	constructor(@Inject(repositoryInterface) private readonly repository: UserRepository) {}

	async run(request: FindUsersByCriteriaRequest): Promise<FindUsersByCriteriaResponse> {
		const query = UserCriteriaQuery.create(request);

		const criteriaResult = await this.repository.findByCriteria(query);

		return FindUsersByCriteriaResponse.create(query, criteriaResult);
	}
}
