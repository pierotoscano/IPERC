export class Asignacion {
  private _id: number;
  private _idMatriz: number;
  private _idMatrizRiesgo: number;
  private _idPRG: number;
  private _idMC: number;
  private _idSupervisor: string;
  private _idResponsable: number;
  private _fechaInicio: Date;
  private _fechaFin: Date;
  private _avance: number;
  private _observacion: string;
  private _estado: string;
  private _usuarioRegistro: string;
  private _fechaRegistro: Date;
  private _usuarioModifica: string;
  private _fechaModifica: Date;

  constructor(
    id: number,
    idMatriz: number,
    idMatrizRiesgo: number,
    idPRG: number,
    idMC: number,
    idSupervisor: string,
    idResponsable: number,
    fechaInicio: Date,
    fechaFin: Date,
    avance: number,
    observacion: string,
    estado: string,
    usuarioRegistro: string,
    fechaRegistro: Date,
    usuarioModifica: string,
    fechaModifica: Date
  ) {
    this._id = id;
    this._idMatriz = idMatriz;
    this._idMatrizRiesgo = idMatrizRiesgo;
    this._idPRG = idPRG;
    this._idMC = idMC;
    this._idSupervisor = idSupervisor;
    this._idResponsable = idResponsable;
    this._fechaInicio = fechaInicio;
    this._fechaFin = fechaFin;
    this._avance = avance;
    this._observacion = observacion;
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
   * Getter idMatriz
   * @return {number}
   */
  public get idMatriz(): number {
    return this._idMatriz;
  }

  /**
   * Getter idMatrizRiesgo
   * @return {number}
   */
  public get idMatrizRiesgo(): number {
    return this._idMatrizRiesgo;
  }

  /**
   * Getter idPRG
   * @return {number}
   */
  public get idPRG(): number {
    return this._idPRG;
  }

  /**
   * Getter idMC
   * @return {number}
   */
  public get idMC(): number {
    return this._idMC;
  }

  /**
   * Getter idSupervisor
   * @return {string}
   */
  public get idSupervisor(): string {
    return this._idSupervisor;
  }

  /**
   * Getter idResponsable
   * @return {number}
   */
  public get idResponsable(): number {
    return this._idResponsable;
  }

  /**
   * Getter fechaInicio
   * @return {Date}
   */
  public get fechaInicio(): Date {
    return this._fechaInicio;
  }

  /**
   * Getter fechaFin
   * @return {Date}
   */
  public get fechaFin(): Date {
    return this._fechaFin;
  }

  /**
   * Getter avance
   * @return {number}
   */
  public get avance(): number {
    return this._avance;
  }

  /**
   * Getter observacion
   * @return {string}
   */
  public get observacion(): string {
    return this._observacion;
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
   * Setter idMatriz
   * @param {number} value
   */
  public set idMatriz(value: number) {
    this._idMatriz = value;
  }

  /**
   * Setter idMatrizRiesgo
   * @param {number} value
   */
  public set idMatrizRiesgo(value: number) {
    this._idMatrizRiesgo = value;
  }

  /**
   * Setter idPRG
   * @param {number} value
   */
  public set idPRG(value: number) {
    this._idPRG = value;
  }

  /**
   * Setter idMC
   * @param {number} value
   */
  public set idMC(value: number) {
    this._idMC = value;
  }

  /**
   * Setter idSupervisor
   * @param {string} value
   */
  public set idSupervisor(value: string) {
    this._idSupervisor = value;
  }

  /**
   * Setter idResponsable
   * @param {number} value
   */
  public set idResponsable(value: number) {
    this._idResponsable = value;
  }

  /**
   * Setter fechaInicio
   * @param {Date} value
   */
  public set fechaInicio(value: Date) {
    this._fechaInicio = value;
  }

  /**
   * Setter fechaFin
   * @param {Date} value
   */
  public set fechaFin(value: Date) {
    this._fechaFin = value;
  }

  /**
   * Setter avance
   * @param {number} value
   */
  public set avance(value: number) {
    this._avance = value;
  }

  /**
   * Setter observacion
   * @param {string} value
   */
  public set observacion(value: string) {
    this._observacion = value;
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
