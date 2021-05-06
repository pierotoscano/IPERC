export class Ubicacion {
  private _idGroup: number;
  private _idUbicacion: number;
  private _idEmpresa: number;
  private _idCentro: number;
  private _idArea: number;
  private _idAlcance: number;
  private _idProceso: number;
  private _empresa: string;
  private _centro: string;
  private _area: string;
  private _alcance: string;
  private _proceso: string;

  constructor(
    idGroup: number,
    idUbicacion: number,
    idEmpresa: number,
    idCentro: number,
    idArea: number,
    idAlcance: number,
    idProceso: number,
    empresa: string,
    centro: string,
    area: string,
    alcance: string,
    proceso: string
  ) {
    this._idGroup = idGroup;
    this._idUbicacion = idUbicacion;
    this._idEmpresa = idEmpresa;
    this._idCentro = idCentro;
    this._idArea = idArea;
    this._idAlcance = idAlcance;
    this._idProceso = idProceso;
    this._empresa = empresa;
    this._centro = centro;
    this._area = area;
    this._alcance = alcance;
    this._proceso = proceso;
  }

  /**
   * Getter idGroup
   * @return {number}
   */
  public get idGroup(): number {
    return this._idGroup;
  }

  /**
   * Getter idUbicacion
   * @return {number}
   */
  public get idUbicacion(): number {
    return this._idUbicacion;
  }

  /**
   * Getter idEmpresa
   * @return {number}
   */
  public get idEmpresa(): number {
    return this._idEmpresa;
  }

  /**
   * Getter idCentro
   * @return {number}
   */
  public get idCentro(): number {
    return this._idCentro;
  }

  /**
   * Getter idArea
   * @return {number}
   */
  public get idArea(): number {
    return this._idArea;
  }

  /**
   * Getter idAlcance
   * @return {number}
   */
  public get idAlcance(): number {
    return this._idAlcance;
  }

  /**
   * Getter idProceso
   * @return {number}
   */
  public get idProceso(): number {
    return this._idProceso;
  }

  /**
   * Getter empresa
   * @return {string}
   */
  public get empresa(): string {
    return this._empresa;
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
   * Getter alcance
   * @return {string}
   */
  public get alcance(): string {
    return this._alcance;
  }

  /**
   * Getter proceso
   * @return {string}
   */
  public get proceso(): string {
    return this._proceso;
  }

  /**
   * Setter idGroup
   * @param {number} value
   */
  public set idGroup(value: number) {
    this._idGroup = value;
  }

  /**
   * Setter idUbicacion
   * @param {number} value
   */
  public set idUbicacion(value: number) {
    this._idUbicacion = value;
  }

  /**
   * Setter idEmpresa
   * @param {number} value
   */
  public set idEmpresa(value: number) {
    this._idEmpresa = value;
  }

  /**
   * Setter idCentro
   * @param {number} value
   */
  public set idCentro(value: number) {
    this._idCentro = value;
  }

  /**
   * Setter idArea
   * @param {number} value
   */
  public set idArea(value: number) {
    this._idArea = value;
  }

  /**
   * Setter idAlcance
   * @param {number} value
   */
  public set idAlcance(value: number) {
    this._idAlcance = value;
  }

  /**
   * Setter idProceso
   * @param {number} value
   */
  public set idProceso(value: number) {
    this._idProceso = value;
  }

  /**
   * Setter empresa
   * @param {string} value
   */
  public set empresa(value: string) {
    this._empresa = value;
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
   * Setter alcance
   * @param {string} value
   */
  public set alcance(value: string) {
    this._alcance = value;
  }

  /**
   * Setter proceso
   * @param {string} value
   */
  public set proceso(value: string) {
    this._proceso = value;
  }
}
