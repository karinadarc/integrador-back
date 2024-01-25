import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { TokenPayload } from "../models/Token";

dotenv.config();

export class TokenService {
  /**
   * Gera um token jwt
   * @param payload Dados do payload
   * @returns um token
   */
  public generateToken(payload: TokenPayload): string {
    return jwt.sign(payload, process.env.JWT_KEY as string, {
      expiresIn: process.env.JWT_EXPIRES_IN || "1h",
    });
  }
}
