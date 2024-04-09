import { CriteriaResult } from '../../../../../shared/app/modules/shared/interfaces/criteria-result.interface';
import { FindByOptions } from '../../../../../shared/app/modules/shared/types/find-by-options.type';
import { Nullable } from '../../../../../shared/app/modules/shared/types/nullable.type';
import { User } from '../../../../../shared/app/modules/users/models/user.model';
import { UpdateUserRequest } from '../../application/dtos/update-user-request.dto';
import { UserEntity } from '../../intrastructure/persistence/user.entity';
import { UserCriteriaQuery } from '../../intrastructure/persistence/user-criteria.query';

export interface UserRepository {
	create(user: UserEntity): Promise<User>;
	findBy(options: FindByOptions<UserEntity>): Promise<Nullable<User>>;
	findByCriteria(query: UserCriteriaQuery): Promise<CriteriaResult<User>>;
	findByWithSelectedColumns(options: FindByOptions<UserEntity>): Promise<Nullable<User>>;
	findRawBy(options: FindByOptions<UserEntity>): Promise<Nullable<User>>;
	softDelete(id: string): Promise<boolean>;
	update(id: string, request: UpdateUserRequest): Promise<User>;
}
