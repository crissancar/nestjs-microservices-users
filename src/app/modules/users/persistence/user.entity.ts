import { Column, Entity, PrimaryColumn } from 'typeorm';

import { TimestampEntity } from '../../../../shared/app/modules/shared/persistence/timestamp.entity';
import { Bcrypt } from '../../../../shared/app/modules/shared/services/bcrypt.service';
import { UserAudiences } from '../../../../shared/app/modules/users/enums/user-audiences.enum';
import { usersConfig } from '../users.config';

const { entity } = usersConfig;

@Entity(entity)
export class UserEntity extends TimestampEntity {
	@PrimaryColumn({ update: false })
	id: string;

	@Column()
	name: string;

	@Column({ unique: true })
	email: string;

	@Column({ select: false })
	password: string;

	@Column({
		type: 'enum',
		enum: UserAudiences,
		array: true,
		default: [UserAudiences.GENERAL],
		select: false,
	})
	audiences: Array<UserAudiences>;

	constructor(
		id: string,
		name: string,
		email: string,
		password: string,
		audiences: Array<UserAudiences>,
	) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.password = password;
		this.audiences = audiences;
	}

	static create(
		id: string,
		name: string,
		email: string,
		password: string,
		audiences?: Array<UserAudiences>,
	): UserEntity {
		return new UserEntity(id, name, email, password, audiences);
	}

	static comparePasswords(password: string, hashedPassword: string): boolean {
		return Bcrypt.compare(password, hashedPassword);
	}
}
