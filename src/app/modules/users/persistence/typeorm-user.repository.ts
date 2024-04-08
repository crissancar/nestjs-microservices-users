import { FindOptionsWhere } from 'typeorm';

import { CriteriaResult } from '../../../../shared/app/modules/shared/interfaces/criteria-result.interface';
import { TypeOrmRepository } from '../../../../shared/app/modules/shared/persistence/typeorm.repository';
import { FindByOptions } from '../../../../shared/app/modules/shared/types/find-by-options.type';
import { GenericEntityClassOrSchema } from '../../../../shared/app/modules/shared/types/generic-entity-class-or-schema.type';
import { Nullable } from '../../../../shared/app/modules/shared/types/nullable.type';
import { UpdateUserRequest } from '../dtos/update-user-request.dto';
import { UserRepository } from '../repositories/user.repository';
import { UserEntity } from './user.entity';
import { UserCriteriaQuery } from './user-criteria.query';

export class TypeOrmUserRepository extends TypeOrmRepository<UserEntity> implements UserRepository {
	async create(userEntity: UserEntity): Promise<UserEntity> {
		return this.persistEntity(userEntity);
	}

	async findBy(options: FindByOptions<UserEntity>): Promise<UserEntity> {
		const { key, value } = options;
		const where = { [key]: value } as FindOptionsWhere<UserEntity>;

		const builder = this.createTypeOrmQueryBuilder();
		builder.where(where);

		return builder.executeGetOne();
	}

	async findByWithSelectedColumns(options: FindByOptions<UserEntity>): Promise<UserEntity> {
		const { key, value, columns } = options;
		const where = { [key]: value } as FindOptionsWhere<UserEntity>;

		const builder = this.createTypeOrmQueryBuilder();
		builder.select(columns);
		builder.where(where);

		return builder.executeGetOne();
	}

	async findRawBy(options: FindByOptions<UserEntity>): Promise<UserEntity> {
		const { key, value, columns } = options;
		const where = { [key]: value } as FindOptionsWhere<UserEntity>;

		const builder = this.createTypeOrmQueryBuilder();
		builder.addSelect(columns);
		builder.where(where);

		return builder.executeGetOne();
	}

	async update(id: string, request: UpdateUserRequest): Promise<Nullable<UserEntity>> {
		const { affected } = await this.persistPartialEntity(id, request);

		return affected === 1 ? this.findBy({ key: 'id', value: id }) : null;
	}

	async findByCriteria(query: UserCriteriaQuery): Promise<CriteriaResult<UserEntity>> {
		const { where, take, skip, sortName, sortOrder, sortColumn } = query;

		const builder = this.createTypeOrmQueryBuilder();

		builder.where(where);
		builder.addOrderByColumnCase('name', sortName, sortOrder);
		builder.addOrderByColumn(sortColumn, sortOrder);
		builder.pagination(take, skip);

		return builder.executeGetManyAndCount();
	}

	async softDelete(id: string): Promise<boolean> {
		const { affected } = await this.softDeleteEntity(id);

		return affected !== 0;
	}

	protected entitySchema(): GenericEntityClassOrSchema<UserEntity> {
		return UserEntity;
	}
}
