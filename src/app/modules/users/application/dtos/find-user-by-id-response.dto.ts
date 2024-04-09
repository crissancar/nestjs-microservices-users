import { User } from '../../../../../shared/app/modules/users/models/user.model';

export class FindUserByIdResponse {
	readonly id: string;

	readonly name: string;

	readonly email: string;

	constructor(id: string, name: string, email: string) {
		this.id = id;
		this.name = name;
		this.email = email;
	}

	static create(foundUser: User): FindUserByIdResponse {
		const { id, name, email } = foundUser;

		return new FindUserByIdResponse(id, name, email);
	}
}
