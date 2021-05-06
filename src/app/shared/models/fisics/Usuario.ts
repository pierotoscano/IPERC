export class Usuario {
  private _idUsuario: string;
  private _idUbicacion: string;
  private _rol: string;
  private _apellidoPaterno: string;
  private _apellidoMaterno: string;
  private _nombres: string;
  private _email: string;
  private _usuario: string;
  private _key: string;
  private _estado: string;
  private _usuarioRegistro: string;
  private _fechaRegistro: Date;
  private _usuarioModifica: string;
  private _fechaModifica: Date;
  private _selected: number;
  private _tipo: number;
  private _idLogin: Number;

  constructor(
    idUsuario?: string,
    idUbicacion?: string,
    rol?: string,
    apellidoPaterno?: string,
    apellidoMaterno?: string,
    nombres?: string,
    email?: string,
    usuario?: string,
    key?: string,
    estado?: string,
    usuarioRegistro?: string,
    fechaRegistro?: Date,
    usuarioModifica?: string,
    fechaModifica?: Date,
    selected?: number,
    tipo?: number,
    idLogin?: Number
  ) {
    this._idUsuario = idUsuario;
    this._idUbicacion = idUbicacion;
    this._rol = rol;
    this._apellidoPaterno = apellidoPaterno;
    this._apellidoMaterno = apellidoMaterno;
    this._nombres = nombres;
    this._email = email;
    this._usuario = usuario;
    this._key = key;
    this._estado = estado;
    this._usuarioRegistro = usuarioRegistro;
    this._fechaRegistro =
      fechaRegistro instanceof Date ? fechaRegistro : new Date(fechaRegistro);
    this._usuarioModifica = usuarioModifica;
    this._fechaModifica =
      fechaModifica instanceof Date ? fechaModifica : new Date(fechaModifica);
    this._selected = selected;
    this._tipo = tipo;
    this._idLogin = idLogin;
  }

  /**
   * Getter idUsuario
   * @return {string}
   */
  public get idUsuario(): string {
    return this._idUsuario;
  }

  /**
   * Getter idUbicacion
   * @return {string}
   */
  public get idUbicacion(): string {
    return this._idUbicacion;
  }

  /**
   * Getter rol
   * @return {string}
   */
  public get rol(): string {
    return this._rol;
  }

  /**
   * Getter apellidoPaterno
   * @return {string}
   */
  public get apellidoPaterno(): string {
    return this._apellidoPaterno;
  }

  /**
   * Getter apellidoMaterno
   * @return {string}
   */
  public get apellidoMaterno(): string {
    return this._apellidoMaterno;
  }

  /**
   * Getter nombres
   * @return {string}
   */
  public get nombres(): string {
    return this._nombres;
  }

  /**
   * Getter email
   * @return {string}
   */
  public get email(): string {
    return this._email;
  }

  /**
   * Getter usuario
   * @return {string}
   */
  public get usuario(): string {
    return this._usuario;
  }

  /**
   * Getter key
   * @return {string}
   */
  public get key(): string {
    return this._key;
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
   * Getter selected
   * @return {number}
   */
  public get selected(): number {
    return this._selected;
  }

  /**
   * Getter tipo
   * @return {number}
   */
  public get tipo(): number {
    return this._tipo;
  }

  /**
   * Getter idLogin
   * @return {Number}
   */
  public get idLogin(): Number {
    return this._idLogin;
  }

  /**
   * Setter idUsuario
   * @param {string} value
   */
  public set idUsuario(value: string) {
    this._idUsuario = value;
  }

  /**
   * Setter idUbicacion
   * @param {string} value
   */
  public set idUbicacion(value: string) {
    this._idUbicacion = value;
  }

  /**
   * Setter rol
   * @param {string} value
   */
  public set rol(value: string) {
    this._rol = value;
  }

  /**
   * Setter apellidoPaterno
   * @param {string} value
   */
  public set apellidoPaterno(value: string) {
    this._apellidoPaterno = value;
  }

  /**
   * Setter apellidoMaterno
   * @param {string} value
   */
  public set apellidoMaterno(value: string) {
    this._apellidoMaterno = value;
  }

  /**
   * Setter nombres
   * @param {string} value
   */
  public set nombres(value: string) {
    this._nombres = value;
  }

  /**
   * Setter email
   * @param {string} value
   */
  public set email(value: string) {
    this._email = value;
  }

  /**
   * Setter usuario
   * @param {string} value
   */
  public set usuario(value: string) {
    this._usuario = value;
  }

  /**
   * Setter key
   * @param {string} value
   */
  public set key(value: string) {
    this._key = value;
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
   * Setter selected
   * @param {number} value
   */
  public set selected(value: number) {
    this._selected = value;
  }

  /**
   * Setter tipo
   * @param {number} value
   */
  public set tipo(value: number) {
    this._tipo = value;
  }

  /**
   * Setter idLogin
   * @param {Number} value
   */
  public set idLogin(value: Number) {
    this._idLogin = value;
  }
}
