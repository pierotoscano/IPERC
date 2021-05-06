export class TipoMotivo {
  private _idTipoMotivo: number;
  private _tipoMotivo: string;
  private _estado: string;
  private _usuarioRegistro: string;
  private _fechaRegistro: Date;
  private _usuarioModifica: string;
  private _fechaModifica: Date;

  constructor(
    idTipoMotivo: number,
    tipoMotivo: string,
    estado: string,
    usuarioRegistro: string,
    fechaRegistro: Date,
    usuarioModifica: string,
    fechaModifica: Date
  ) {
    this._idTipoMotivo = idTipoMotivo;
    this._tipoMotivo = tipoMotivo;
    this._estado = estado;
    this._usuarioRegistro = usuarioRegistro;
    this._fechaRegistro =
      fechaRegistro instanceof Date ? fechaRegistro : new Date(fechaRegistro);
    this._usuarioModifica = usuarioModifica;
    this._fechaModifica =
      fechaModifica instanceof Date ? fechaModifica : new Date(fechaModifica);
  }

  /**
   * Getter idTipoMotivo
   * @return {number}
   */
  public get idTipoMotivo(): number {
    return this._idTipoMotivo;
  }

  /**
   * Getter tipoMotivo
   * @return {string}
   */
  public get tipoMotivo(): string {
    return this._tipoMotivo;
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
   * Setter idTipoMotivo
   * @param {number} value
   */
  public set idTipoMotivo(value: number) {
    this._idTipoMotivo = value;
  }

  /**
   * Setter tipoMotivo
   * @param {string} value
   */
  public set tipoMotivo(value: string) {
    this._tipoMotivo = value;
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
