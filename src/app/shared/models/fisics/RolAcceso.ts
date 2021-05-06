export default class RolAcceso {
  private _idRol: string;
  private _idInterfaz: number;
  private _visualizar: boolean;
  private _registrar: boolean;
  private _editar: boolean;
  private _eliminar: boolean;
  private _aprobar: boolean;
  private _rechazar: boolean;
  private _estado: string;
  private _usuarioRegistro: string;
  private _fechaRegistro: Date;
  private _usuarioModifica: string;
  private _fechaModifica: Date;

  constructor(
    idRol: string,
    idInterfaz: number,
    visualizar: boolean,
    registrar: boolean,
    editar: boolean,
    eliminar: boolean,
    aprobar: boolean,
    rechazar: boolean,
    estado: string,
    usuarioRegistro: string,
    fechaRegistro: Date,
    usuarioModifica: string,
    fechaModifica: Date
  ) {
    this._idRol = idRol;
    this._idInterfaz = idInterfaz;
    this._visualizar = visualizar;
    this._registrar = registrar;
    this._editar = editar;
    this._eliminar = eliminar;
    this._aprobar = aprobar;
    this._rechazar = rechazar;
    this._estado = estado;
    this._usuarioRegistro = usuarioRegistro;
    this._fechaRegistro = fechaRegistro;
    this._usuarioModifica = usuarioModifica;
    this._fechaModifica = fechaModifica;
  }

  /**
   * Getter idRol
   * @return {string}
   */
  public get idRol(): string {
    return this._idRol;
  }

  /**
   * Getter idInterfaz
   * @return {number}
   */
  public get idInterfaz(): number {
    return this._idInterfaz;
  }

  /**
   * Getter visualizar
   * @return {boolean}
   */
  public get visualizar(): boolean {
    return this._visualizar;
  }

  /**
   * Getter registrar
   * @return {boolean}
   */
  public get registrar(): boolean {
    return this._registrar;
  }

  /**
   * Getter editar
   * @return {boolean}
   */
  public get editar(): boolean {
    return this._editar;
  }

  /**
   * Getter eliminar
   * @return {boolean}
   */
  public get eliminar(): boolean {
    return this._eliminar;
  }

  /**
   * Getter aprobar
   * @return {boolean}
   */
  public get aprobar(): boolean {
    return this._aprobar;
  }

  /**
   * Getter rechazar
   * @return {boolean}
   */
  public get rechazar(): boolean {
    return this._rechazar;
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
   * Setter idRol
   * @param {string} value
   */
  public set idRol(value: string) {
    this._idRol = value;
  }

  /**
   * Setter idInterfaz
   * @param {number} value
   */
  public set idInterfaz(value: number) {
    this._idInterfaz = value;
  }

  /**
   * Setter visualizar
   * @param {boolean} value
   */
  public set visualizar(value: boolean) {
    this._visualizar = value;
  }

  /**
   * Setter registrar
   * @param {boolean} value
   */
  public set registrar(value: boolean) {
    this._registrar = value;
  }

  /**
   * Setter editar
   * @param {boolean} value
   */
  public set editar(value: boolean) {
    this._editar = value;
  }

  /**
   * Setter eliminar
   * @param {boolean} value
   */
  public set eliminar(value: boolean) {
    this._eliminar = value;
  }

  /**
   * Setter aprobar
   * @param {boolean} value
   */
  public set aprobar(value: boolean) {
    this._aprobar = value;
  }

  /**
   * Setter rechazar
   * @param {boolean} value
   */
  public set rechazar(value: boolean) {
    this._rechazar = value;
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
