import { DatabaseAdapter } from "@adapter/database/database-interface";
import IUserUpdatePutUC from "@application/interfaces/user-update-put-interface";
import { UserUpdateUC } from "@application/use_case/user-update-uc";
import { UserEntityBuilder } from "test/unit/domain/builder/user-builder";


describe('UserUpdateUC', () => {
  let databaseAdapter: DatabaseAdapter;
  let userUpdateUC: UserUpdateUC;

  beforeEach(() => {
    // Crie um mock para o DatabaseAdapter
    databaseAdapter = ({
      setConfig: jest.fn(),
      update: jest.fn(),
    } as unknown) as DatabaseAdapter;

    // Crie a instância de UserUpdateUC com o mock
    userUpdateUC = new UserUpdateUC(databaseAdapter);
  });

  it('should update a user', async () => {
    const user = new UserEntityBuilder().build();
    const input: IUserUpdatePutUC = {
      id: user.id,
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

    // Defina o que o método update deve retornar quando chamado
    (databaseAdapter.update as jest.Mock).mockResolvedValue(user);

    const result = await userUpdateUC.execute(input);

    // Verifique se o método setConfig foi chamado com os argumentos corretos
    expect(databaseAdapter.setConfig).toHaveBeenCalledWith('public', 'User');

    // Verifique se o método update foi chamado com o id e o usuário correto
    expect(databaseAdapter.update).toHaveBeenCalledWith(input.id, user);

    // Verifique se o resultado é o esperado
    expect(result).toBe(user);
  });
});
