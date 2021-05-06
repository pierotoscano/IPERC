export class ListaRiesgoMatriz {
  private _idMatriz: string;
  private _idMatrizRiesgo: string;
  private _idArea: number;
  private _idActividad: number;
  private _idPeligro: number;
  private _idRiesgo: number;
  private _riesgo: string;
  private _rPG: number;
  private _rPDH: number;
  private _rPMCE: number;
  private _rPPG: number;
  private _rPNE: number;
  private _rPP: number;
  private _rPIdNivelRiesgo: number;
  private _rRG: number;
  private _rRDH: number;
  private _rRMCE: number;
  private _rRPG: number;
  private _rRNE: number;
  private _rRP: number;
  private _rRIdNivelRiesgo: number;
  private _observacion: string;
  private _usuarioRegistro: string;
  private _fechaRegistro: Date;
  private _usuarioModifica: string;
  private _fechaModifica: Date;
  private _puesto: string;
  private _actividad: string;
  private _herramienta: string;
  private _peligro: string;
  private _nivelRiesgoPuro: string;
  private _nivelRiesgoRemanente: string;
  private _observacionPeligro: string;

  constructor(
    idMatriz?: string,
    idMatrizRiesgo?: string,
    idArea?: number,
    idActividad?: number,
    idPeligro?: number,
    idRiesgo?: number,
    riesgo?: string,
    rPG?: number,
    rPDH?: number,
    rPMCE?: number,
    rPPG?: number,
    rPNE?: number,
    rPP?: number,
    rPIdNivelRiesgo?: number,
    rRG?: number,
    rRDH?: number,
    rRMCE?: number,
    rRPG?: number,
    rRNE?: number,
    rRP?: number,
    rRIdNivelRiesgo?: number,
    observacion?: string,
    usuarioRegistro?: string,
    fechaRegistro?: Date,
    usuarioModifica?: string,
    fechaModifica?: Date,
    puesto?: string,
    actividad?: string,
    herramienta?: string,
    peligro?: string,
    nivelRiesgoPuro?: string,
    nivelRiesgoRemanente?: string,
    observacionPeligro?: string
  ) {
    this._idMatriz = idMatriz;
    this._idMatrizRiesgo = idMatrizRiesgo;
    this._idArea = idArea;
    this._idActividad = idActividad;
    this._idPeligro = idPeligro;
    this._idRiesgo = idRiesgo;
    this._riesgo = riesgo;
    this._rPG = rPG;
    this._rPDH = rPDH;
    this._rPMCE = rPMCE;
    this._rPPG = rPPG;
    this._rPNE = rPNE;
    this._rPP = rPP;
    this._rPIdNivelRiesgo = rPIdNivelRiesgo;
    this._rRG = rRG;
    this._rRDH = rRDH;
    this._rRMCE = rRMCE;
    this._rRPG = rRPG;
    this._rRNE = rRNE;
    this._rRP = rRP;
    this._rRIdNivelRiesgo = rRIdNivelRiesgo;
    this._observacion = observacion;
    this._usuarioRegistro = usuarioRegistro;
    this._fechaRegistro =
      fechaRegistro instanceof Date ? fechaRegistro : new Date(fechaRegistro);
    this._usuarioModifica = usuarioModifica;
    this._fechaModifica =
      fechaModifica instanceof Date ? fechaModifica : new Date(fechaModifica);
    this._puesto = puesto;
    this._actividad = actividad;
    this._herramienta = herramienta;
    this._peligro = peligro;
    this._nivelRiesgoPuro = nivelRiesgoPuro;
    this._nivelRiesgoRemanente = nivelRiesgoRemanente;
    this._observacionPeligro = observacionPeligro;
  }

  /**
   * Getter idMatriz
   * @return {string}
   */
  public get idMatriz(): string {
    return this._idMatriz;
  }

  /**
   * Getter idMatrizRiesgo
   * @return {string}
   */
  public get idMatrizRiesgo(): string {
    return this._idMatrizRiesgo;
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
   * Getter idPeligro
   * @return {number}
   */
  public get idPeligro(): number {
    return this._idPeligro;
  }

  /**
   * Getter idRiesgo
   * @return {number}
   */
  public get idRiesgo(): number {
    return this._idRiesgo;
  }

  /**
   * Getter riesgo
   * @return {string}
   */
  public get riesgo(): string {
    return this._riesgo;
  }

  /**
   * Getter rPG
   * @return {number}
   */
  public get rPG(): number {
    return this._rPG;
  }

  /**
   * Getter rPDH
   * @return {number}
   */
  public get rPDH(): number {
    return this._rPDH;
  }

  /**
   * Getter rPMCE
   * @return {number}
   */
  public get rPMCE(): number {
    return this._rPMCE;
  }

  /**
   * Getter rPPG
   * @return {number}
   */
  public get rPPG(): number {
    return this._rPPG;
  }

  /**
   * Getter rPNE
   * @return {number}
   */
  public get rPNE(): number {
    return this._rPNE;
  }

  /**
   * Getter rPP
   * @return {number}
   */
  public get rPP(): number {
    return this._rPP;
  }

  /**
   * Getter rPIdNivelRiesgo
   * @return {number}
   */
  public get rPIdNivelRiesgo(): number {
    return this._rPIdNivelRiesgo;
  }

  /**
   * Getter rRG
   * @return {number}
   */
  public get rRG(): number {
    return this._rRG;
  }

  /**
   * Getter rRDH
   * @return {number}
   */
  public get rRDH(): number {
    return this._rRDH;
  }

  /**
   * Getter rRMCE
   * @return {number}
   */
  public get rRMCE(): number {
    return this._rRMCE;
  }

  /**
   * Getter rRPG
   * @return {number}
   */
  public get rRPG(): number {
    return this._rRPG;
  }

  /**
   * Getter rRNE
   * @return {number}
   */
  public get rRNE(): number {
    return this._rRNE;
  }

  /**
   * Getter rRP
   * @return {number}
   */
  public get rRP(): number {
    return this._rRP;
  }

  /**
   * Getter rRIdNivelRiesgo
   * @return {number}
   */
  public get rRIdNivelRiesgo(): number {
    return this._rRIdNivelRiesgo;
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
   * Getter puesto
   * @return {string}
   */
  public get puesto(): string {
    return this._puesto;
  }

  /**
   * Getter actividad
   * @return {string}
   */
  public get actividad(): string {
    return this._actividad;
  }

  /**
   * Getter herramienta
   * @return {string}
   */
  public get herramienta(): string {
    return this._herramienta;
  }

  /**
   * Getter peligro
   * @return {string}
   */
  public get peligro(): string {
    return this._peligro;
  }

  /**
   * Getter nivelRiesgoPuro
   * @return {string}
   */
  public get nivelRiesgoPuro(): string {
    return this._nivelRiesgoPuro;
  }

  /**
   * Getter nivelRiesgoRemanente
   * @return {string}
   */
  public get nivelRiesgoRemanente(): string {
    return this._nivelRiesgoRemanente;
  }

  /**
   * Getter observacionPeligro
   * @return {string}
   */
  public get observacionPeligro(): string {
    return this._observacionPeligro;
  }

  /**
   * Setter idMatriz
   * @param {string} value
   */
  public set idMatriz(value: string) {
    this._idMatriz = value;
  }

  /**
   * Setter idMatrizRiesgo
   * @param {string} value
   */
  public set idMatrizRiesgo(value: string) {
    this._idMatrizRiesgo = value;
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
   * Setter idPeligro
   * @param {number} value
   */
  public set idPeligro(value: number) {
    this._idPeligro = value;
  }

  /**
   * Setter idRiesgo
   * @param {number} value
   */
  public set idRiesgo(value: number) {
    this._idRiesgo = value;
  }

  /**
   * Setter riesgo
   * @param {string} value
   */
  public set riesgo(value: string) {
    this._riesgo = value;
  }

  /**
   * Setter rPG
   * @param {number} value
   */
  public set rPG(value: number) {
    this._rPG = value;
  }

  /**
   * Setter rPDH
   * @param {number} value
   */
  public set rPDH(value: number) {
    this._rPDH = value;
  }

  /**
   * Setter rPMCE
   * @param {number} value
   */
  public set rPMCE(value: number) {
    this._rPMCE = value;
  }

  /**
   * Setter rPPG
   * @param {number} value
   */
  public set rPPG(value: number) {
    this._rPPG = value;
  }

  /**
   * Setter rPNE
   * @param {number} value
   */
  public set rPNE(value: number) {
    this._rPNE = value;
  }

  /**
   * Setter rPP
   * @param {number} value
   */
  public set rPP(value: number) {
    this._rPP = value;
  }

  /**
   * Setter rPIdNivelRiesgo
   * @param {number} value
   */
  public set rPIdNivelRiesgo(value: number) {
    this._rPIdNivelRiesgo = value;
  }

  /**
   * Setter rRG
   * @param {number} value
   */
  public set rRG(value: number) {
    this._rRG = value;
  }

  /**
   * Setter rRDH
   * @param {number} value
   */
  public set rRDH(value: number) {
    this._rRDH = value;
  }

  /**
   * Setter rRMCE
   * @param {number} value
   */
  public set rRMCE(value: number) {
    this._rRMCE = value;
  }

  /**
   * Setter rRPG
   * @param {number} value
   */
  public set rRPG(value: number) {
    this._rRPG = value;
  }

  /**
   * Setter rRNE
   * @param {number} value
   */
  public set rRNE(value: number) {
    this._rRNE = value;
  }

  /**
   * Setter rRP
   * @param {number} value
   */
  public set rRP(value: number) {
    this._rRP = value;
  }

  /**
   * Setter rRIdNivelRiesgo
   * @param {number} value
   */
  public set rRIdNivelRiesgo(value: number) {
    this._rRIdNivelRiesgo = value;
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

  /**
   * Setter puesto
   * @param {string} value
   */
  public set puesto(value: string) {
    this._puesto = value;
  }

  /**
   * Setter actividad
   * @param {string} value
   */
  public set actividad(value: string) {
    this._actividad = value;
  }

  /**
   * Setter herramienta
   * @param {string} value
   */
  public set herramienta(value: string) {
    this._herramienta = value;
  }

  /**
   * Setter peligro
   * @param {string} value
   */
  public set peligro(value: string) {
    this._peligro = value;
  }

  /**
   * Setter nivelRiesgoPuro
   * @param {string} value
   */
  public set nivelRiesgoPuro(value: string) {
    this._nivelRiesgoPuro = value;
  }

  /**
   * Setter nivelRiesgoRemanente
   * @param {string} value
   */
  public set nivelRiesgoRemanente(value: string) {
    this._nivelRiesgoRemanente = value;
  }

  /**
   * Setter observacionPeligro
   * @param {string} value
   */
  public set observacionPeligro(value: string) {
    this._observacionPeligro = value;
  }
}
