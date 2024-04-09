import { Exact } from '../../../../../shared/app/modules/shared/types/exact.type';
import { UpdateUserRequestInterface } from '../../../../../shared/app/modules/users/interfaces/update-user-request.interface';

export class UpdateUserRequest implements Exact<UpdateUserRequestInterface, UpdateUserRequest> {
	id?: never;

	name?: string;

	email?: string;
}
