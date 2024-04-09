import { Exact } from '../../../../../shared/app/modules/shared/types/exact.type';
import { FindUserByIdRequestInterface } from '../../../../../shared/app/modules/users/interfaces/find-user-by-id-request.interface';

export class FindUserByIdRequest
	implements Exact<FindUserByIdRequestInterface, FindUserByIdRequest>
{
	readonly id: string;
}
