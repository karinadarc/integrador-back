import { UserDatabase } from "../database/UserDataBase";
import { LoginInputDTO, LoginOutputDTO } from "../dtos/user/login.dto";
import { SignupInputDTO, SignupOutputDTO } from "../dtos/user/signup.dto";
import { UnauthorizedError, UnprocessableEntityError } from "../errors";
import { TokenPayload } from "../models/Token";
import { User } from "../models/User";
import { IdService } from "../services/IdService";
import { PasswordService } from "../services/PasswordService";
import { TokenService } from "../services/TokenService";

export class UserBusiness {
  constructor(
    private userDatabase: UserDatabase,
    private idService: IdService,
    private tokenService: TokenService,
    private passwordService: PasswordService
  ) {}

  public signup = async (input: SignupInputDTO): Promise<SignupOutputDTO> => {
    const exists = await this.userDatabase.getByEmail(input.email);

    if (exists) {
      throw new UnprocessableEntityError(
        `E-mail ${input.email} já está em uso.`
      );
    }

    const password = await this.passwordService.hash(input.password);

    const user = new User(
      this.idService.newId(),
      input.apelido,
      input.email,
      password,
      new Date().toISOString()
    );

    await this.userDatabase.addUser(user.toDatabaseModel());
    console.info("INFO: usuário criado: %s", user.getId());

    const tokenData: TokenPayload = {
      id: user.getId(),
      apelido: user.getApelido(),
    };

    const token = this.tokenService.generateToken(tokenData);

    return {
      token,
    };
  };

  public login = async (loginInput: LoginInputDTO): Promise<LoginOutputDTO> => {
    const result = await this.userDatabase.getByEmail(loginInput.email);

    if (result) {
      const user = User.fromDatabaseModel(result);

      if (
        await this.passwordService.validate(
          loginInput.password,
          user.getPassword()
        )
      ) {
        const payload: TokenPayload = {
          id: user.getId(),
          apelido: user.getApelido(),
        };
        const token = this.tokenService.generateToken(payload);

        return { token };
      }
    }

    throw new UnauthorizedError("Usuário ou senha inválidos");
  };
}
