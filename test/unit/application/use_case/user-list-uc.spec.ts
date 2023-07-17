
import { UserEntity } from '@domain/entities/user-entity';
import { DatabaseAdapter } from '@adapter/database/database-interface';
import { UserListUC } from '@application/use_case/user-list-uc';

describe('UserListUC', () => {
  let databaseAdapter: DatabaseAdapter;
  let userListUC: UserListUC;

  beforeEach(() => {
    databaseAdapter = ({
      setConfig: jest.fn(),
      findAll: jest.fn(),
    } as unknown) as DatabaseAdapter;

    userListUC = new UserListUC(databaseAdapter);
  });

  it('should list all users', async () => {
    const users = [new UserEntity(), new UserEntity()];

    (databaseAdapter.findAll as jest.Mock).mockResolvedValue(users);

    const result = await userListUC.execute();

    expect(databaseAdapter.setConfig).toHaveBeenCalledWith('public', 'User');

    expect(databaseAdapter.findAll).toHaveBeenCalled();

    expect(result).toBe(users);
  });
});
