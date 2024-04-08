// import { Controller } from '@nestjs/common';
// import { MessagePattern, Payload } from '@nestjs/microservices';

// import { LoggerFactory } from '../../../../shared/microservices/shared/services/logger-factory.service';
// import { UsersConfig } from '../config/Users.config';
// import { DeleteUserRequest } from '../dtos/delete-user-request.dto';
// import { DeleteUserResponse } from '../dtos/delete-user-response.dto';
// import { SoftDeleteUserRequest } from '../dtos/soft-delete-user-request.dto';
// import { SoftDeleteUserResponse } from '../dtos/soft-delete-user-response.dto';
// import { UserDeleter } from '../services/user-deleter.service';
// import { UsersoftDeleter } from '../services/user-soft-deleter.service';

// const { globalRoute, deleteController } = UsersConfig;
// const { context, routes, params } = deleteController.constants;
// const { softDelete, deleteUser } = deleteController.logs;

// const logger = LoggerFactory.create(context);

// @Controller(globalRoute)
// export class UserDeleteController {
// 	constructor(
// 		private readonly deleter: UserDeleter,
// 		private readonly softDeleter: UsersoftDeleter,
// 	) {}

// 	@MessagePattern('user.delete')
// 	async delete(@Payload() payload: any): Promise<DeleteUserResponse> {
// 		logger.log(deleteUser.requestLog);

// 		const request = payload.data.attributes as DeleteUserRequest;

// 		return this.deleter.run(request);
// 	}

// 	@MessagePattern('user.softDelete')
// 	async softDelete(@Payload() payload: any): Promise<SoftDeleteUserResponse> {
// 		logger.log(softDelete.requestLog);

// 		const request = payload.data.attributes as SoftDeleteUserRequest;

// 		return this.softDeleter.run(request);
// 	}
// }
