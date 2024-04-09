import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'nestjs-pino';

import { loggerConfig } from '../config/logger/logger.config';
import { typeOrmConfig } from '../config/orm/typeorm.config';
import { providersConfig } from './app.config';
import { AppController } from './app.controller';
import { UsersModule } from './modules/users/users.module';

@Module({
	imports: [
		LoggerModule.forRoot(loggerConfig),
		TypeOrmModule.forRoot(typeOrmConfig),
		CqrsModule.forRoot(),
		UsersModule,
	],
	controllers: [AppController],
	providers: providersConfig,
})
export class AppModule {}
