
import { IUserSaveUC } from '@application/interfaces/user-save-uc-interface';
import { UserSaveUC } from '@application/use_case/user-save-uc';
import { LambdaHandler } from '@infrastructure/middleware/lambda';
import { Container } from 'inversify';
import { TYPES } from './type-injector';

const container = new Container();

container.bind<IUserSaveUC>(TYPES.IUserSaveUC).to(UserSaveUC).inTransientScope();
container.bind<LambdaHandler>(TYPES.LambdaHandler).to(LambdaHandler).inSingletonScope()

export { container };
