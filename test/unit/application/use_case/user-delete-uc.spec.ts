
import { DatabaseAdapter } from "@adapter/database/database-interface";
import { UserDeleteUC } from "@application/use_case/user-delete-uc";
import { UserEntity } from "@domain/entities/user-entity";
import { UserEntityBuilder } from "test/unit/domain/builder/user-builder";

jest.mock('@adapter/database/database-interface');

describe('UserDeleteUC', () => {
  let userDeleteUC: UserDeleteUC;
  let mockDatabaseAdapter: jest.Mocked<DatabaseAdapter>;
  let mockUserEntity: UserEntity;

  beforeEach(() => {
    // Mock DatabaseAdapter
    mockDatabaseAdapter = {
      setConfig: jest.fn().mockResolvedValue(Promise.resolve()),
      delete: jest.fn().mockResolvedValue(Promise.resolve())
    } as any;

    // Use UserEntityBuilder to create a mock UserEntity
    mockUserEntity = new UserEntityBuilder().build();

    // Setup UserDeleteUC with the mocked DatabaseAdapter
    userDeleteUC = new UserDeleteUC(mockDatabaseAdapter);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should delete user correctly', async () => {
    const userId = 'user-id';
    mockDatabaseAdapter.delete.mockResolvedValueOnce(mockUserEntity);

    const result = await userDeleteUC.execute(userId);

    expect(mockDatabaseAdapter.setConfig).toHaveBeenCalledWith('public', 'User');
    expect(mockDatabaseAdapter.delete).toHaveBeenCalledWith(userId, UserEntity);
    expect(result).toEqual(mockUserEntity);
  });
});
