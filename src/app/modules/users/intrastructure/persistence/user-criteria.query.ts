import { FindOptionsWhere, ILike } from 'typeorm';

import { CriteriaQuery } from '../../../../../shared/app/modules/shared/interfaces/criteria-query.interface';
import { SortColumn } from '../../../../../shared/app/modules/shared/types/sort-column.type';
import { SortOrder } from '../../../../../shared/app/modules/shared/types/sort-order.type';
import { FindUsersByCriteriaRequestInterface } from '../../../../../shared/app/modules/users/interfaces/find-users-by-criteria-request.interface';
import { UserEntity } from './user.entity';

export class UserCriteriaQuery implements CriteriaQuery<UserEntity> {
	readonly where: FindOptionsWhere<UserEntity>;

	readonly name: string;

	readonly email: string;

	readonly take: number;

	readonly page: number;

	readonly skip: number;

	readonly sortName: string;

	readonly sortColumn: SortColumn<UserEntity>;

	readonly sortOrder: SortOrder;

	constructor(
		where: FindOptionsWhere<UserEntity>,
		name: string,
		email: string,
		take: number,
		page: number,
		sortName: string,
		sortColumn: SortColumn<UserEntity>,
		sortOrder: SortOrder,
	) {
		this.where = where;
		this.name = name;
		this.email = email;
		this.take = take ?? 10;
		this.page = page ?? 1;
		this.skip = (this.page - 1) * this.take;
		this.sortName = sortName;
		this.sortColumn = sortColumn ?? 'createdAt';
		this.sortOrder = sortOrder ?? 'DESC';
	}

	static create(request: FindUsersByCriteriaRequestInterface): UserCriteriaQuery {
		const { name, email, keyword, take, page, sortName, sortColumn, sortOrder } = request;

		const where = this.createFindOptionsWhere(name, email, keyword);

		return new UserCriteriaQuery(where, name, email, take, page, sortName, sortColumn, sortOrder);
	}

	private static createFindOptionsWhere(
		name: string,
		email: string,
		keyword: string,
	): FindOptionsWhere<UserEntity> {
		return {
			...(name && { name }),
			...(email && { email }),
			...(keyword && { email: ILike(`%${keyword}%`) }),
		};
	}
}
