export class PeligroMatriz {
  private _idMatrizPeligro: number;
  private _idMatriz: string;
  private _idPeligro: number;
  private _idArea: number;
  private _idActividad: number;
  private _actividad: string;
  private _peligro: string;
  private _estado: string;
  private _observacion: string;
  private _usuarioRegistro: string;
  private _fechaRegistro: Date;
  private _usuarioModifica: string;
  private _fechaModifica: Date;

  constructor(
    idMatrizPeligro?: number,
    idMatriz?: string,
    idPeligro?: number,
    idArea?: number,
    idActividad?: number,
    actividad?: string,
    peligro?: string,
    estado?: string,
    observacion?: string,
    usuarioRegistro?: string,
    fechaRegistro?: Date,
    usuarioModifica?: string,
    fechaModifica?: Date
  ) {
    this._idMatrizPeligro = idMatrizPeligro;
    this._idPeligro = idPeligro;
    this._idMatriz = idMatriz;
    this._idPeligro = idPeligro;
    this._idArea = idArea;
    this._idActividad = idActividad;
    this._actividad = actividad;
    this._peligro = peligro;
    this._estado = estado;
    this._observacion = observacion;
    this._usuarioRegistro = usuarioRegistro;
    this._fechaRegistro = fechaRegistro;
    this._usuarioModifica = usuarioModifica;
    this._fechaModifica = fechaModifica;
  }

  /**
   * Getter idMatrizPeligro
   * @return {number}
   */
  public get idMatrizPeligro(): number {
    return this._idMatrizPeligro;
  }

  /**
   * Getter idMatriz
   * @return {string}
   */
  public get idMatriz(): string {
    return this._idMatriz;
  }

  /**
   * Getter idPeligro
   * @return {number}
   */
  public get idPeligro(): number {
    return this._idPeligro;
  }

  /**
   * Getter idArea
   * @return {number}
   */
  public get idArea(): number {
    return this._idArea;
  }

  /**
   * Getter idActividad
   * @return {number}
   */
  public get idActividad(): number {
    return this._idActividad;
  }

  /**
   * Getter actividad
   * @return {string}
   */
  public get actividad(): string {
    return this._actividad;
  }

  /**
   * Getter peligro
   * @return {string}
   */
  public get peligro(): string {
    return this._peligro;
  }

  /**
   * Getter estado
   * @return {string}
   */
  public get estado(): string {
    return this._estado;
  }

  /**
   * Getter observacion
   * @return {string}
   */
  public get observacion(): string {
    return this._observacion;
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
   * Setter idMatrizPeligro
   * @param {number} value
   */
  public set idMatrizPeligro(value: number) {
    this._idMatrizPeligro = value;
  }

  /**
   * Setter idMatriz
   * @param {string} value
   */
  public set idMatriz(value: string) {
    this._idMatriz = value;
  }

  /**
   * Setter idPeligro
   * @param {number} value
   */
  public set idPeligro(value: number) {
    this._idPeligro = value;
  }

  /**
   * Setter idArea
   * @param {number} value
   */
  public set idArea(value: number) {
    this._idArea = value;
  }

  /**
   * Setter idActividad
   * @param {number} value
   */
  public set idActividad(value: number) {
    this._idActividad = value;
  }

  /**
   * Setter actividad
   * @param {string} value
   */
  public set actividad(value: string) {
    this._actividad = value;
  }

  /**
   * Setter peligro
   * @param {string} value
   */
  public set peligro(value: string) {
    this._peligro = value;
  }

  /**
   * Setter estado
   * @param {string} value
   */
  public set estado(value: string) {
    this._estado = value;
  }

  /**
   * Setter observacion
   * @param {string} value
   */
  public set observacion(value: string) {
    this._observacion = value;
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
