import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserGetController } from './controllers/user-get.controller';
import { UserPostController } from './controllers/user-post.controller';
import { UserPutController } from './controllers/user-put.controller';
import { TypeOrmUserRepository } from './persistence/typeorm-user.repository';
import { UserEntity } from './persistence/user.entity';
import { UserEntitySubscriber } from './persistence/user-entity.subscriber';
import { UserCreator } from './services/user-creator.service';
import { UserFinderById } from './services/user-finder-by-id.service';
import { UserRawFinderByOptions } from './services/user-raw-finder-by-options.service';
import { UserUpdater } from './services/user-updater.service';
import { UsersFinderByCriteria } from './services/users-finder-by-criteria.service';
import { usersConfig } from './users.config';

const { repositoryInterface } = usersConfig.repository;

@Module({
	imports: [TypeOrmModule.forFeature([UserEntity])],
	controllers: [UserGetController, UserPostController, UserPutController],
	providers: [
		UserCreator,
		UserEntitySubscriber,
		UsersFinderByCriteria,
		UserFinderById,
		UserRawFinderByOptions,
		UserUpdater,
		{ provide: repositoryInterface, useClass: TypeOrmUserRepository },
	],
})
export class UsersModule {}
