
import { IUserSaveUC } from '@application/interfaces/user-save-uc-interface';
import { UserSaveUC } from '@application/use_case/user-save-uc';
import { LambdaHandler } from '@infrastructure/middleware/lambda';
import { Container } from 'inversify';
import { TYPES } from './type-injector';
import { DatabaseAdapter } from '@adapter/database/database-interface';
import { MongoService } from '@adapter/database/mongodb/mongo-service';
import { UserUpdateUC } from '@application/use_case/user-update-uc';
import { IUserUpdateUC } from '@application/interfaces/user-update-uc-interface';
import { IUserViewUC } from '@application/interfaces/user-view-uc-interface';
import { UserViewUC } from '@application/use_case/user-view-uc';
import { IUserDeleteUC } from '@application/interfaces/user-delete-uc-interface';
import { UserDeleteUC } from '@application/use_case/user-delete-uc';
import { IUserListUC } from '@application/interfaces/user-list-uc-interface';
import { UserListUC } from '@application/use_case/user-list-uc';
import { PostgresAdapter } from '@adapter/database/postgres/adapter';

const container = new Container();

switch(process.env.DB_PROJECT){
    case "MONGO":
        container.bind<DatabaseAdapter>(TYPES.DatabaseAdapter).to(MongoService).inSingletonScope();
        break;
    case "PSQL":
        container.bind<DatabaseAdapter>(TYPES.DatabaseAdapter).to(PostgresAdapter).inSingletonScope();
        break;
    default:
        container.bind<DatabaseAdapter>(TYPES.DatabaseAdapter).to(MongoService).inSingletonScope();
}

container.bind<IUserSaveUC>(TYPES.IUserUC).to(UserSaveUC).whenTargetNamed('save');
container.bind<IUserUpdateUC>(TYPES.IUserUC).to(UserUpdateUC).whenTargetNamed('update');
container.bind<IUserViewUC>(TYPES.IUserUC).to(UserViewUC).whenTargetNamed('view');
container.bind<IUserDeleteUC>(TYPES.IUserUC).to(UserDeleteUC).whenTargetNamed('delete')
container.bind<IUserListUC>(TYPES.IUserUC).to(UserListUC).whenTargetNamed('list')
container.bind<LambdaHandler>(TYPES.LambdaHandler).to(LambdaHandler).inSingletonScope()

export { container };
