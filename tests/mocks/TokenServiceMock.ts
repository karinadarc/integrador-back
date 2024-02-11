import { TokenPayload } from "../../src/models/Token";
export class TokenServiceMock {
  public generateToken(payload: TokenPayload): string {
    return "hash";
  }
}
