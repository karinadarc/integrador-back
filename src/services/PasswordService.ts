import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

export class PasswordService {
  public async hash(password: string): Promise<string> {
    const rounds = Number(process.env.BCRYPT_COST);
    const salt = await bcrypt.genSalt(rounds);

    return await bcrypt.hash(password, salt);
  }
}
