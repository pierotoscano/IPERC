export class MCPRiesgo {
  private _idRiesgoMCP: number;
  private _idMatrizRiesgo: string;
  private _idRiesgo: string;
  private _idMCP: number;
  private _idArea: number;
  private _idTipo: string;
  private _idResponsable: number;
  private _observacion: string;
  private _estado: string;
  private _usuarioRegistro: string;
  private _fechaRegistro: Date;
  private _usuarioModifica: string;
  private _fechaModifica: Date;
  private _mC: string;
  private _tipoMC: string;
  private _estadoDesc: string;
  private _Responsable: string;

  constructor(
    idRiesgoMCP?: number,
    idMatrizRiesgo?: string,
    idRiesgo?: string,
    idMCP?: number,
    idArea?: number,
    idResponsable?: number,
    observacion?: string,
    idTipo?: string,
    estado?: string,
    usuarioRegistro?: string,
    fechaRegistro?: Date,
    usuarioModifica?: string,
    fechaModifica?: Date,
    mC?: string,
    tipoMC?: string,
    estadoDesc?: string,
    Responsable?: string
  ) {
    this._idRiesgoMCP = idRiesgoMCP;
    this._idMatrizRiesgo = idMatrizRiesgo;
    this._idArea = idArea;
    this._idRiesgo = idRiesgo;
    this._mC = mC;
    this._idTipo = idTipo;
    this._idResponsable = idResponsable;
    this._estado = estado;
    this._observacion = observacion;
    this._fechaRegistro = fechaRegistro;
    this._usuarioModifica = usuarioModifica;
    this._fechaModifica = fechaModifica;
    this._idMCP = idMCP;
    this._usuarioRegistro = usuarioRegistro;
    this._tipoMC = tipoMC;
    this._estadoDesc = estadoDesc;
    this._Responsable = Responsable;
  }

  /**
   * Getter idRiesgoMCP
   * @return {number}
   */
  public get idRiesgoMCP(): number {
    return this._idRiesgoMCP;
  }

  /**
   * Getter idMatrizRiesgo
   * @return {string}
   */
  public get idMatrizRiesgo(): string {
    return this._idMatrizRiesgo;
  }

  /**
   * Getter idRiesgo
   * @return {string}
   */
  public get idRiesgo(): string {
    return this._idRiesgo;
  }

  /**
   * Getter idMCP
   * @return {number}
   */
  public get idMCP(): number {
    return this._idMCP;
  }

  /**
   * Getter idArea
   * @return {number}
   */
  public get idArea(): number {
    return this._idArea;
  }

  /**
   * Getter idTipo
   * @return {string}
   */
  public get idTipo(): string {
    return this._idTipo;
  }

  /**
   * Getter idResponsable
   * @return {number}
   */
  public get idResponsable(): number {
    return this._idResponsable;
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
   * Getter mC
   * @return {string}
   */
  public get mC(): string {
    return this._mC;
  }

  /**
   * Getter tipoMC
   * @return {string}
   */
  public get tipoMC(): string {
    return this._tipoMC;
  }

  /**
   * Getter estadoDesc
   * @return {string}
   */
  public get estadoDesc(): string {
    return this._estadoDesc;
  }

  /**
   * Getter Responsable
   * @return {string}
   */
  public get Responsable(): string {
    return this._Responsable;
  }

  /**
   * Setter idRiesgoMCP
   * @param {number} value
   */
  public set idRiesgoMCP(value: number) {
    this._idRiesgoMCP = value;
  }

  /**
   * Setter idMatrizRiesgo
   * @param {string} value
   */
  public set idMatrizRiesgo(value: string) {
    this._idMatrizRiesgo = value;
  }

  /**
   * Setter idRiesgo
   * @param {string} value
   */
  public set idRiesgo(value: string) {
    this._idRiesgo = value;
  }

  /**
   * Setter idMCP
   * @param {number} value
   */
  public set idMCP(value: number) {
    this._idMCP = value;
  }

  /**
   * Setter idArea
   * @param {number} value
   */
  public set idArea(value: number) {
    this._idArea = value;
  }

  /**
   * Setter idTipo
   * @param {string} value
   */
  public set idTipo(value: string) {
    this._idTipo = value;
  }

  /**
   * Setter idResponsable
   * @param {number} value
   */
  public set idResponsable(value: number) {
    this._idResponsable = value;
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

  /**
   * Setter mC
   * @param {string} value
   */
  public set mC(value: string) {
    this._mC = value;
  }

  /**
   * Setter tipoMC
   * @param {string} value
   */
  public set tipoMC(value: string) {
    this._tipoMC = value;
  }

  /**
   * Setter estadoDesc
   * @param {string} value
   */
  public set estadoDesc(value: string) {
    this._estadoDesc = value;
  }

  /**
   * Setter Responsable
   * @param {string} value
   */
  public set Responsable(value: string) {
    this._Responsable = value;
  }
}
