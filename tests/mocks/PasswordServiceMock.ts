export class PasswordServiceMock {
  public async hash(password: string): Promise<string> {
    return "hashed";
  }

  public validate = async (
    plaintext: string,
    hash: string
  ): Promise<boolean> => {
    if (plaintext === "fail_password") {
      return false;
    }
    return true;
  };
}
