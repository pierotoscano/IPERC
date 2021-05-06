export class Participante {
  private _idVisita: string;
  private _json: string;

  constructor(idVisita: string, json: string) {
    this._idVisita = idVisita;
    this._json = json;
  }

  /**
   * Getter idVisita
   * @return {string}
   */
  public get idVisita(): string {
    return this._idVisita;
  }

  /**
   * Getter json
   * @return {string}
   */
  public get json(): string {
    return this._json;
  }

  /**
   * Setter idVisita
   * @param {string} value
   */
  public set idVisita(value: string) {
    this._idVisita = value;
  }

  /**
   * Setter json
   * @param {string} value
   */
  public set json(value: string) {
    this._json = value;
  }
}
