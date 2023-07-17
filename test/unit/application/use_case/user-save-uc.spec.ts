import { DatabaseAdapter } from '@adapter/database/database-interface';
import { UserSaveUC } from '@application/use_case/user-save-uc';
import { UserEntityBuilder } from 'test/unit/domain/builder/user-builder';
import IUserSavePostUC from '@application/interfaces/user-save-post-interface';
import { v4 as uuidv4 } from 'uuid';

describe('UserSaveUC', () => {
  let databaseAdapter: DatabaseAdapter;
  let userSaveUC: UserSaveUC;
  jest.mock('uuid', () => ({ v4: () => 'id1' }));

  beforeEach(() => {
    // Crie um mock para o DatabaseAdapter
    databaseAdapter = ({
      setConfig: jest.fn(),
      create: jest.fn(),
    } as unknown) as DatabaseAdapter;

    // Crie a instância de UserSaveUC com o mock
    userSaveUC = new UserSaveUC(databaseAdapter);
  });

  it('should save a user', async () => {
    const user = new UserEntityBuilder().withId(uuidv4()).build();

    const input: IUserSavePostUC = {
      id: '',
      username: user.username,
      pass: user.pass,
      name: user.name,
      lastName: user.lastName,
      cpf: user.cpf,
      phone: user.phone,
      email: user.email,
      address: user.address,
      status: user.status
    };

    (databaseAdapter.create as jest.Mock).mockResolvedValue(user);

    const result = await userSaveUC.execute(input);

    // Verifique se o método setConfig foi chamado com os argumentos corretos
    expect(databaseAdapter.setConfig).toHaveBeenCalledWith('public', 'User');

    // Verifique se o resultado é o esperado
    expect(result).toBe(user);
  });
});

