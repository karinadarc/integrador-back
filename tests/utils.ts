import { UserModel } from "../src/models/User";

/**
 *
 * @param id Overhide default ID
 * @returns UserModel
 */
export function createUser(id?: string): UserModel {
  const user: UserModel = {
    id: id || "11111111-1111-1111-1111-111111111111",
    apelido: "Fulano",
    email: "fulano@email.com",
    createdAt: new Date().toISOString(),
  };
  return user;
}
