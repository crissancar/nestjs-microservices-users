import { Seeder } from '@jorgebodega/typeorm-seeding';
import { DataSource } from 'typeorm';

import { UserEntity } from '../../../src/app/modules/users/intrastructure/persistence/user.entity';
import { config } from '../../../src/config/app/index';
import { Bcrypt } from '../../../src/shared/app/modules/shared/services/bcrypt.service';
import { Uuid } from '../../../src/shared/app/modules/shared/services/uuid.service';

const { seeds } = config.typeorm;

export default class UserSeed extends Seeder {
	async run(dataSource: DataSource): Promise<void> {
		const id = Uuid.random();
		const name = seeds.name;
		const email = seeds.email;
		const password = Bcrypt.hash(seeds.password);
		const audiences = seeds.userAudiences;

		const userEntity = UserEntity.create(id, name, email, password, audiences);

		try {
			await dataSource.createEntityManager().save<UserEntity>(userEntity);
		} catch (error) {
			console.log(' -> data already exists :)');
		}
	}
}
