import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CreateUserCommandHandler } from './application/handlers/create-user.handler';
import { UserCreator } from './application/services/user-creator.service';
import { UserFinderById } from './application/services/user-finder-by-id.service';
import { UserRawFinderByOptions } from './application/services/user-raw-finder-by-options.service';
import { UserUpdater } from './application/services/user-updater.service';
import { UsersFinderByCriteria } from './application/services/users-finder-by-criteria.service';
import { UserGetController } from './intrastructure/controllers/user-get.controller';
import { UserPostController } from './intrastructure/controllers/user-post.controller';
import { UserPutController } from './intrastructure/controllers/user-put.controller';
import { TypeOrmUserRepository } from './intrastructure/persistence/typeorm-user.repository';
import { UserEntity } from './intrastructure/persistence/user.entity';
import { UserEntitySubscriber } from './intrastructure/persistence/user-entity.subscriber';
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
		CreateUserCommandHandler,
		{ provide: repositoryInterface, useClass: TypeOrmUserRepository },
	],
})
export class UsersModule {}
