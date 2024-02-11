import { UserBusiness } from "../../src/business/UserBusiness";
import { SignupSchema } from "../../src/dtos/user/signup.dto";
import { UnprocessableEntityError } from "../../src/errors";
import { IdServiceMock } from "../mocks/IdServiceMock";
import { PasswordServiceMock } from "../mocks/PasswordServiceMock";
import { TokenServiceMock } from "../mocks/TokenServiceMock";
import { UserDatabaseMock } from "../mocks/UserDatabaseMock";

describe("Testando login", () => {
  const userBusiness = new UserBusiness(
    new UserDatabaseMock(),
    new IdServiceMock(),
    new TokenServiceMock(),
    new PasswordServiceMock()
  );

  test("Deve retornar token ao cadastar novo usuário", async () => {
    const input = SignupSchema.parse({
      apelido: "Novo User",
      email: "novo@email.com",
      password: "novo_pass",
    });

    const output = await userBusiness.signup(input);

    expect(output).toHaveProperty("token");
    expect(output.token).toBe("hash");
  });

  test("Deve Gerar erro para email duplicado", async () => {
    const input = SignupSchema.parse({
      apelido: "Ciclano ja existe",
      email: "ciclano@email.com",
      password: "novo_pass",
    });

    await expect(userBusiness.signup(input)).rejects.toThrow(
      UnprocessableEntityError
    );
  });
});
