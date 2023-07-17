import { DatabaseAdapter } from "@adapter/database/database-interface";
import { UserViewUC } from "@application/use_case/user-view-uc";
import { UserEntity } from "@domain/entities/user-entity";
import { UserEntityBuilder } from "test/unit/domain/builder/user-builder";

describe('UserViewUC', () => {
  let databaseAdapter: DatabaseAdapter;
  let userViewUC: UserViewUC;

  beforeEach(() => {
    // Crie um mock para o DatabaseAdapter
    databaseAdapter = ({
      setConfig: jest.fn(),
      findOne: jest.fn(),
    } as unknown) as DatabaseAdapter;

    // Crie a instância de UserViewUC com o mock
    userViewUC = new UserViewUC(databaseAdapter);
  });

  it('should find a user by id', async () => {
    const user = new UserEntityBuilder().build();
    const id = user.id;

    // Defina o que o método findOne deve retornar quando chamado
    (databaseAdapter.findOne as jest.Mock).mockResolvedValue(user);

    const result = await userViewUC.execute(id);

    // Verifique se o método setConfig foi chamado com os argumentos corretos
    expect(databaseAdapter.setConfig).toHaveBeenCalledWith('public', 'User');

    // Verifique se o método findOne foi chamado com o id correto
    expect(databaseAdapter.findOne).toHaveBeenCalledWith(id, UserEntity);

    // Verifique se o resultado é o esperado
    expect(result).toBe(user);
  });
});
