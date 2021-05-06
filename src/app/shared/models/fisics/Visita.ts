export class Visita {
  private _idVisita: string;
  private _idSolicitudMatriz: string;
  private _idArea: number;
  private _idCentro: number;
  private _inicioVisita: Date;
  private _finVisita: Date;
  private _centro: string;
  private _area: string;
  private _estadoDesc: string;
  private _estado: string;
  private _usuarioRegistro: string;
  private _fechaRegistro: Date;
  private _usuarioModifica: string;
  private _fechaModifica: Date;

  constructor(
    idVisita?: string,
    idSolicitudMatriz?: string,
    idArea?: number,
    idCentro?: number,
    inicioVisita?: Date,
    finVisita?: Date,
    centro?: string,
    area?: string,
    estadoDesc?: string,
    estado?: string,
    usuarioRegistro?: string,
    fechaRegistro?: Date,
    usuarioModifica?: string,
    fechaModifica?: Date
  ) {
    this._idVisita = idVisita;
    this._idSolicitudMatriz = idSolicitudMatriz;
    this._idArea = idArea;
    this._idCentro = idCentro;
    this._inicioVisita =
      inicioVisita instanceof Date ? inicioVisita : new Date(inicioVisita);
    this._finVisita =
      finVisita instanceof Date ? finVisita : new Date(finVisita);
    this._centro = centro;
    this._area = area;
    this._estadoDesc = estadoDesc;
    this._estado = estado;
    this._usuarioRegistro = usuarioRegistro;
    this._fechaRegistro =
      fechaRegistro instanceof Date ? fechaRegistro : new Date(fechaRegistro);
    this._usuarioModifica = usuarioModifica;
    this._fechaModifica =
      fechaModifica instanceof Date ? fechaModifica : new Date(fechaModifica);
  }

  /**
   * Getter idVisita
   * @return {string}
   */
  public get idVisita(): string {
    return this._idVisita;
  }

  /**
   * Getter idSolicitudMatriz
   * @return {string}
   */
  public get idSolicitudMatriz(): string {
    return this._idSolicitudMatriz;
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
   * Getter inicioVisita
   * @return {Date}
   */
  public get inicioVisita(): Date {
    return this._inicioVisita;
  }

  /**
   * Getter finVisita
   * @return {Date}
   */
  public get finVisita(): Date {
    return this._finVisita;
  }

  /**
   * Getter centro
   * @return {string}
   */
  public get centro(): string {
    return this._centro;
  }

  /**
   * Getter area
   * @return {string}
   */
  public get area(): string {
    return this._area;
  }

  /**
   * Getter estadoDesc
   * @return {string}
   */
  public get estadoDesc(): string {
    return this._estadoDesc;
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
   * Setter idVisita
   * @param {string} value
   */
  public set idVisita(value: string) {
    this._idVisita = value;
  }

  /**
   * Setter idSolicitudMatriz
   * @param {string} value
   */
  public set idSolicitudMatriz(value: string) {
    this._idSolicitudMatriz = value;
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
   * Setter inicioVisita
   * @param {Date} value
   */
  public set inicioVisita(value: Date) {
    this._inicioVisita = value;
  }

  /**
   * Setter finVisita
   * @param {Date} value
   */
  public set finVisita(value: Date) {
    this._finVisita = value;
  }

  /**
   * Setter centro
   * @param {string} value
   */
  public set centro(value: string) {
    this._centro = value;
  }

  /**
   * Setter area
   * @param {string} value
   */
  public set area(value: string) {
    this._area = value;
  }

  /**
   * Setter estadoDesc
   * @param {string} value
   */
  public set estadoDesc(value: string) {
    this._estadoDesc = value;
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
