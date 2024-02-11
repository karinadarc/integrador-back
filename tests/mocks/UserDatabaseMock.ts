import { UserDBModel } from "../../src/models/User";
import { BaseDatabaseMock } from "./BaseDatabaseMock";

const usersMock: UserDBModel[] = [
  {
    id: "11111111-1111-1111-1111-111111111111",
    apelido: "Fulano",
    email: "fulano@email.com",
    password: "fulano_pass",
    created_at: new Date().toISOString(),
  },
  {
    id: "22222222-2222-2222-2222-222222222222",
    apelido: "Ciclano",
    email: "ciclano@email.com",
    password: "ciclano_pass",
    created_at: new Date().toISOString(),
  },
];

export class UserDatabaseMock extends BaseDatabaseMock {
  public addUser = async (user: UserDBModel): Promise<void> => {
    return Promise.resolve();
  };

  public async getByEmail(email: string): Promise<UserDBModel | undefined> {
    return usersMock.filter((user) => user.email === email)[0];
  }
}
