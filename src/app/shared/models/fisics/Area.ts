export class Area {
  private _idArea: number;
  private _idCentro: number;
  private _idAlcance: number;
  private _area: string;
  private _estado: string;
  private _usuarioRegistro: string;
  private _fechaRegistro: Date;
  private _usuarioModifica: string;
  private _fechaModifica: Date;

  constructor(
    idArea: number,
    idCentro: number,
    idAlcance: number,
    area: string,
    estado: string,
    usuarioRegistro: string,
    fechaRegistro: Date,
    usuarioModifica: string,
    fechaModifica: Date
  ) {
    this._idArea = idArea;
    this._idCentro = idCentro;
    this._idAlcance = idAlcance;
    this._area = area;
    this._estado = estado;
    this._usuarioRegistro = usuarioRegistro;
    this._fechaRegistro =
      fechaRegistro instanceof Date ? fechaRegistro : new Date(fechaRegistro);
    this._usuarioModifica = usuarioModifica;
    this._fechaModifica =
      fechaModifica instanceof Date ? fechaModifica : new Date(fechaModifica);
  }

  /**
   * Getter idArea
   * @return {number}
   */
  public get idArea(): number {
    return this._idArea;
  }

  /**
   * Getter idCentro
   * @return {number}
   */
  public get idCentro(): number {
    return this._idCentro;
  }

  /**
   * Getter idAlcance
   * @return {number}
   */
  public get idAlcance(): number {
    return this._idAlcance;
  }

  /**
   * Getter area
   * @return {string}
   */
  public get area(): string {
    return this._area;
  }

  /**
   * Getter estado
   * @return {string}
   */
  public get estado(): string {
    return this._estado;
  }

  /**
   * Getter usuarioRegistro
   * @return {string}
   */
  public get usuarioRegistro(): string {
    return this._usuarioRegistro;
  }

  /**
   * Getter fechaRegistro
   * @return {Date}
   */
  public get fechaRegistro(): Date {
    return this._fechaRegistro;
  }

  /**
   * Getter usuarioModifica
   * @return {string}
   */
  public get usuarioModifica(): string {
    return this._usuarioModifica;
  }

  /**
   * Getter fechaModifica
   * @return {Date}
   */
  public get fechaModifica(): Date {
    return this._fechaModifica;
  }

  /**
   * Setter idArea
   * @param {number} value
   */
  public set idArea(value: number) {
    this._idArea = value;
  }

  /**
   * Setter idCentro
   * @param {number} value
   */
  public set idCentro(value: number) {
    this._idCentro = value;
  }

  /**
   * Setter idAlcance
   * @param {number} value
   */
  public set idAlcance(value: number) {
    this._idAlcance = value;
  }

  /**
   * Setter area
   * @param {string} value
   */
  public set area(value: string) {
    this._area = value;
  }

  /**
   * Setter estado
   * @param {string} value
   */
  public set estado(value: string) {
    this._estado = value;
  }

  /**
   * Setter usuarioRegistro
   * @param {string} value
   */
  public set usuarioRegistro(value: string) {
    this._usuarioRegistro = value;
  }

  /**
   * Setter fechaRegistro
   * @param {Date} value
   */
  public set fechaRegistro(value: Date) {
    this._fechaRegistro = value;
  }

  /**
   * Setter usuarioModifica
   * @param {string} value
   */
  public set usuarioModifica(value: string) {
    this._usuarioModifica = value;
  }

  /**
   * Setter fechaModifica
   * @param {Date} value
   */
  public set fechaModifica(value: Date) {
    this._fechaModifica = value;
  }
}
