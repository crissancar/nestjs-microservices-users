import { Exact } from '../../../../shared/app/modules/shared/types/exact.type';
import { FindByOptions } from '../../../../shared/app/modules/shared/types/find-by-options.type';
import { FindRawUserByOptionsRequestInterface } from '../../../../shared/app/modules/users/interfaces/find-raw-user-by-options-request.interface';
import { User } from '../../../../shared/app/modules/users/models/user.model';

export class FindRawUserByOptionsRequest
	implements Exact<FindRawUserByOptionsRequestInterface, FindRawUserByOptionsRequest>
{
	options: FindByOptions<User>;
}
