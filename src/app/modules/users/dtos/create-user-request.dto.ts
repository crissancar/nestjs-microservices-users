import { Exact } from '../../../../shared/app/modules/shared/types/exact.type';
import { CreateUserRequestInterface } from '../../../../shared/app/modules/users/interfaces/create-user-request.interface';

export class CreateUserRequest implements Exact<CreateUserRequestInterface, CreateUserRequest> {
	readonly id: never;

	readonly name: string;

	readonly email: string;

	readonly password: string;
}
