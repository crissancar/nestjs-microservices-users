import { CriteriaResult } from '../../../../shared/app/modules/shared/interfaces/criteria-result.interface';
import { FindByOptions } from '../../../../shared/app/modules/shared/types/find-by-options.type';
import { Nullable } from '../../../../shared/app/modules/shared/types/nullable.type';
import { UpdateUserRequest } from '../dtos/update-user-request.dto';
import { UserEntity } from '../persistence/user.entity';
import { UserCriteriaQuery } from '../persistence/user-criteria.query';

export interface UserRepository {
	create(user: UserEntity): Promise<UserEntity>;
	findBy(options: FindByOptions<UserEntity>): Promise<Nullable<UserEntity>>;
	findByCriteria(query: UserCriteriaQuery): Promise<CriteriaResult<UserEntity>>;
	findByWithSelectedColumns(options: FindByOptions<UserEntity>): Promise<Nullable<UserEntity>>;
	findRawBy(options: FindByOptions<UserEntity>): Promise<Nullable<UserEntity>>;
	softDelete(id: string): Promise<boolean>;
	update(id: string, request: UpdateUserRequest): Promise<UserEntity>;
}
