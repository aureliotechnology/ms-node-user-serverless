
import { IUserSaveUC } from '@application/interfaces/user-save-uc-interface';
import { UserSaveUC } from '@application/use_case/user-save-uc';
import { LambdaHandler } from '@infrastructure/middleware/lambda';
import { Container } from 'inversify';
import { TYPES } from './type-injector';
import { DatabaseAdapter } from '@adapter/database/database-interface';
import { MongoService } from '@adapter/database/mongodb/mongo-service';
import { MongoConnectionService } from '@adapter/database/mongodb/mongo-connect';
import { UserUpdateUC } from '@application/use_case/user-update-uc';
import { IUserUpdateUC } from '@application/interfaces/user-update-uc-interface';

const container = new Container();

container.bind<MongoConnectionService>(TYPES.MongoConnectionService).to(MongoConnectionService).inSingletonScope();
container.bind<DatabaseAdapter>(TYPES.DatabaseAdapter).to(MongoService).inSingletonScope();
container.bind<IUserSaveUC>(TYPES.IUserSaveUC).to(UserSaveUC).inTransientScope();
container.bind<IUserUpdateUC>(TYPES.IUserUpdateUC).to(UserUpdateUC).inTransientScope();
container.bind<LambdaHandler>(TYPES.LambdaHandler).to(LambdaHandler).inSingletonScope()

export { container };
