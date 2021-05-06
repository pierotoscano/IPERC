export class Empresa {
  private _idEmpresa: number;
  private _empresa: string;

  constructor(idEmpresa: number, empresa: string) {
    this._idEmpresa = idEmpresa;
    this._empresa = empresa;
  }

  /**
   * Getter idEmpresa
   * @return {number}
   */
  public get idEmpresa(): number {
    return this._idEmpresa;
  }

  /**
   * Getter empresa
   * @return {string}
   */
  public get empresa(): string {
    return this._empresa;
  }

  /**
   * Setter idEmpresa
   * @param {number} value
   */
  public set idEmpresa(value: number) {
    this._idEmpresa = value;
  }

  /**
   * Setter empresa
   * @param {string} value
   */
  public set empresa(value: string) {
    this._empresa = value;
  }
}
