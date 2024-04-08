import { Exact } from '../../../../shared/app/modules/shared/types/exact.type';
import { SoftDeleteUserRequestInterface } from '../../../../shared/app/modules/users/interfaces/soft-delete-user-request.interface';

export class SoftDeleteUserRequest
	implements Exact<SoftDeleteUserRequestInterface, SoftDeleteUserRequest>
{
	readonly id: never;
}
