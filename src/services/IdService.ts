import { v4 } from "uuid";

/**
 * Serviço gerador de IDS
 */
export class IdService {
  /**
   * Essa função gera um novo ID aleatorio
   * @returns uma string com o ID
   */
  public newId(): string {
    return v4();
  }
}
