export class MatrizActividad {
  private _idMatrizActividad: number;
  private _idMatriz: string;
  private _idPuesto: number;
  private _idActividad: number;
  private _idTipoActividad: number;
  private _idMaquina: number;
  private _idHerramienta: number;
  private _idEquipo: number;
  private _idProducto: number;
  private _observacion: string;
  private _usuarioRegistro: string;
  private _fechaRegistro: Date;
  private _usuarioModifica: string;
  private _fechaModifica: Date;
  private _idArea: number;
  private _area: string;
  private _tipoRiesgo: string;
  private _puesto: string;
  private _actividad: string;
  private _herramienta: string;
  private _maquina: string;
  private _producto: string;
  private _equipo: string;

  constructor(
    idMatrizActividad?: number,
    idMatriz?: string,
    idPuesto?: number,
    idActividad?: number,
    idTipoActividad?: number,
    idMaquina?: number,
    idHerramienta?: number,
    idEquipo?: number,
    idProducto?: number,
    observacion?: string,
    usuarioRegistro?: string,
    fechaRegistro?: Date,
    usuarioModifica?: string,
    fechaModifica?: Date,
    idArea?: number,
    area?: string,
    tipoRiesgo?: string,
    puesto?: string,
    actividad?: string,
    herramienta?: string,
    maquina?: string,
    producto?: string,
    equipo?: string
  ) {
    this._idMatrizActividad = idMatrizActividad;
    this._idMatriz = idMatriz;
    this._idPuesto = idPuesto;
    this._idActividad = idActividad;
    this._idTipoActividad = idTipoActividad;
    this._idMaquina = idMaquina;
    this._idHerramienta = idHerramienta;
    this._idEquipo = idEquipo;
    this._idProducto = idProducto;
    this._observacion = observacion;
    this._usuarioRegistro = usuarioRegistro;
    this._fechaRegistro =
      fechaRegistro instanceof Date ? fechaRegistro : new Date(fechaRegistro);
    this._usuarioModifica = usuarioModifica;
    this._fechaModifica =
      fechaModifica instanceof Date ? fechaModifica : new Date(fechaModifica);
    this._idArea = idArea;
    this._area = area;
    this._tipoRiesgo = tipoRiesgo;
    this._puesto = puesto;
    this._actividad = actividad;
    this._herramienta = herramienta;
    this._maquina = maquina;
    this._producto = producto;
    this._equipo = equipo;
  }

  /**
   * Getter idMatrizActividad
   * @return {number}
   */
  public get idMatrizActividad(): number {
    return this._idMatrizActividad;
  }

  /**
   * Getter idMatriz
   * @return {string}
   */
  public get idMatriz(): string {
    return this._idMatriz;
  }

  /**
   * Getter idPuesto
   * @return {number}
   */
  public get idPuesto(): number {
    return this._idPuesto;
  }

  /**
   * Getter idActividad
   * @return {number}
   */
  public get idActividad(): number {
    return this._idActividad;
  }

  /**
   * Getter idTipoActividad
   * @return {number}
   */
  public get idTipoActividad(): number {
    return this._idTipoActividad;
  }

  /**
   * Getter idMaquina
   * @return {number}
   */
  public get idMaquina(): number {
    return this._idMaquina;
  }

  /**
   * Getter idHerramienta
   * @return {number}
   */
  public get idHerramienta(): number {
    return this._idHerramienta;
  }

  /**
   * Getter idEquipo
   * @return {number}
   */
  public get idEquipo(): number {
    return this._idEquipo;
  }

  /**
   * Getter idProducto
   * @return {number}
   */
  public get idProducto(): number {
    return this._idProducto;
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
   * Getter idArea
   * @return {number}
   */
  public get idArea(): number {
    return this._idArea;
  }

  /**
   * Getter area
   * @return {string}
   */
  public get area(): string {
    return this._area;
  }

  /**
   * Getter tipoRiesgo
   * @return {string}
   */
  public get tipoRiesgo(): string {
    return this._tipoRiesgo;
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
   * Getter maquina
   * @return {string}
   */
  public get maquina(): string {
    return this._maquina;
  }

  /**
   * Getter producto
   * @return {string}
   */
  public get producto(): string {
    return this._producto;
  }

  /**
   * Getter equipo
   * @return {string}
   */
  public get equipo(): string {
    return this._equipo;
  }

  /**
   * Setter idMatrizActividad
   * @param {number} value
   */
  public set idMatrizActividad(value: number) {
    this._idMatrizActividad = value;
  }

  /**
   * Setter idMatriz
   * @param {string} value
   */
  public set idMatriz(value: string) {
    this._idMatriz = value;
  }

  /**
   * Setter idPuesto
   * @param {number} value
   */
  public set idPuesto(value: number) {
    this._idPuesto = value;
  }

  /**
   * Setter idActividad
   * @param {number} value
   */
  public set idActividad(value: number) {
    this._idActividad = value;
  }

  /**
   * Setter idTipoActividad
   * @param {number} value
   */
  public set idTipoActividad(value: number) {
    this._idTipoActividad = value;
  }

  /**
   * Setter idMaquina
   * @param {number} value
   */
  public set idMaquina(value: number) {
    this._idMaquina = value;
  }

  /**
   * Setter idHerramienta
   * @param {number} value
   */
  public set idHerramienta(value: number) {
    this._idHerramienta = value;
  }

  /**
   * Setter idEquipo
   * @param {number} value
   */
  public set idEquipo(value: number) {
    this._idEquipo = value;
  }

  /**
   * Setter idProducto
   * @param {number} value
   */
  public set idProducto(value: number) {
    this._idProducto = value;
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
   * Setter idArea
   * @param {number} value
   */
  public set idArea(value: number) {
    this._idArea = value;
  }

  /**
   * Setter area
   * @param {string} value
   */
  public set area(value: string) {
    this._area = value;
  }

  /**
   * Setter tipoRiesgo
   * @param {string} value
   */
  public set tipoRiesgo(value: string) {
    this._tipoRiesgo = value;
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
   * Setter maquina
   * @param {string} value
   */
  public set maquina(value: string) {
    this._maquina = value;
  }

  /**
   * Setter producto
   * @param {string} value
   */
  public set producto(value: string) {
    this._producto = value;
  }

  /**
   * Setter equipo
   * @param {string} value
   */
  public set equipo(value: string) {
    this._equipo = value;
  }
}
