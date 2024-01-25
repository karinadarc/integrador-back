export interface UserDBModel {
  id: string;
  apelido: string;
  email: string;
  password: string;
  created_at: string;
}

export interface UserModel {
  id: string;
  apelido: string;
  email: string;
  createdAt: string;
}

export class User {
  constructor(
    private id: string,
    private apelido: string,
    private email: string,
    private password: string,
    private createdAt: string
  ) {}

  public getId(): string {
    return this.id;
  }

  public setId(value: string): void {
    this.id = value;
  }

  public getApelido(): string {
    return this.apelido;
  }

  public setApelido(value: string): void {
    this.apelido = value;
  }

  public getEmail(): string {
    return this.email;
  }

  public setEmail(value: string): void {
    this.email = value;
  }

  public getPassword(): string {
    return this.password;
  }

  public setPassword(value: string): void {
    this.password = value;
  }

  public getCreatedAt(): string {
    return this.createdAt;
  }

  public setCreatedAt(value: string): void {
    this.createdAt = value;
  }

  public toDatabaseModel(): UserDBModel {
    return {
      id: this.id,
      apelido: this.apelido,
      email: this.email,
      password: this.password,
      created_at: this.createdAt,
    };
  }

  public static fromDatabaseModel(model: UserDBModel) {
    return new User(
      model.id,
      model.apelido,
      model.email,
      model.password,
      model.created_at
    );
  }

  public toBusinessModel(): UserModel {
    return {
      id: this.id,
      apelido: this.apelido,
      email: this.email,
      createdAt: this.createdAt,
    };
  }
}
