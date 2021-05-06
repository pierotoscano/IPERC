export class Evidencia {
  private _id: number;
  private _idAsignacion: number;
  private _idMatriz: number;
  private _evidencia: number;
  private _url: number;
  private _observacion: string;
  private _avance: number;
  private _estado: string;
  private _usuarioRegistro: string;
  private _fechaRegistro: Date;
  private _usuarioModifica: string;
  private _fechaModifica: Date;

  constructor(
    id: number,
    idAsignacion: number,
    idMatriz: number,
    evidencia: number,
    url: number,
    observacion: string,
    avance: number,
    estado: string,
    usuarioRegistro: string,
    fechaRegistro: Date,
    usuarioModifica: string,
    fechaModifica: Date
  ) {
    this._id = id;
    this._idAsignacion = idAsignacion;
    this._idMatriz = idMatriz;
    this._evidencia = evidencia;
    this._url = url;
    this._observacion = observacion;
    this._avance = avance;
    this._estado = estado;
    this._usuarioRegistro = usuarioRegistro;
    this._fechaRegistro = fechaRegistro;
    this._usuarioModifica = usuarioModifica;
    this._fechaModifica = fechaModifica;
  }

  /**
   * Getter id
   * @return {number}
   */
  public get id(): number {
    return this._id;
  }

  /**
   * Getter idAsignacion
   * @return {number}
   */
  public get idAsignacion(): number {
    return this._idAsignacion;
  }

  /**
   * Getter idMatriz
   * @return {number}
   */
  public get idMatriz(): number {
    return this._idMatriz;
  }

  /**
   * Getter evidencia
   * @return {number}
   */
  public get evidencia(): number {
    return this._evidencia;
  }

  /**
   * Getter url
   * @return {number}
   */
  public get url(): number {
    return this._url;
  }

  /**
   * Getter observacion
   * @return {string}
   */
  public get observacion(): string {
    return this._observacion;
  }

  /**
   * Getter avance
   * @return {number}
   */
  public get avance(): number {
    return this._avance;
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
   * Setter id
   * @param {number} value
   */
  public set id(value: number) {
    this._id = value;
  }

  /**
   * Setter idAsignacion
   * @param {number} value
   */
  public set idAsignacion(value: number) {
    this._idAsignacion = value;
  }

  /**
   * Setter idMatriz
   * @param {number} value
   */
  public set idMatriz(value: number) {
    this._idMatriz = value;
  }

  /**
   * Setter evidencia
   * @param {number} value
   */
  public set evidencia(value: number) {
    this._evidencia = value;
  }

  /**
   * Setter url
   * @param {number} value
   */
  public set url(value: number) {
    this._url = value;
  }

  /**
   * Setter observacion
   * @param {string} value
   */
  public set observacion(value: string) {
    this._observacion = value;
  }

  /**
   * Setter avance
   * @param {number} value
   */
  public set avance(value: number) {
    this._avance = value;
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
