import { Exact } from '../../../../../shared/app/modules/shared/types/exact.type';
import { UpdateUserResponseInterface } from '../../../../../shared/app/modules/users/interfaces/update-user-response.interface';
import { UserEntity } from '../../intrastructure/persistence/user.entity';

export class UpdateUserResponse implements Exact<UpdateUserResponseInterface, UpdateUserResponse> {
	readonly id: string;

	readonly name: string;

	readonly email: string;

	constructor(id: string, name: string, email: string) {
		this.id = id;
		this.name = name;
		this.email = email;
	}

	static create(UpdatedUser: UserEntity): UpdateUserResponse {
		const { id, name, email } = UpdatedUser;

		return new UpdateUserResponse(id, name, email);
	}
}
