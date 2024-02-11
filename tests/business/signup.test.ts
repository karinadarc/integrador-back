import { UserBusiness } from "../../src/business/UserBusiness";
import { LoginSchema } from "../../src/dtos/user/login.dto";
import { UnauthorizedError } from "../../src/errors";
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

  test("Deve gerar token ao logar", async () => {
    const input = LoginSchema.parse({
      email: "fulano@email.com",
      password: "fulano_pass",
    });

    const output = await userBusiness.login(input);

    expect(output).toHaveProperty("token");
    expect(output.token).toBe("hash");
  });

  test("Deve Gerar erro com senha incorreta", async () => {
    const input = LoginSchema.parse({
      email: "fulano@email.com",
      password: "fail_password",
    });

    await expect(userBusiness.login(input)).rejects.toThrow(UnauthorizedError);
  });
});
