export class ParticipanteData {
  private _idVisita: string;
  private _idParticipante: string;
  private _asistencia: string;
  private _usuario: string;
  private _email: string;

  constructor(
    idVisita?: string,
    idParticipante?: string,
    asistencia?: string,
    usuario?: string,
    email?: string
  ) {
    this._idVisita = idVisita;
    this._idParticipante = idParticipante;
    this._asistencia = asistencia;
    this._usuario = usuario;
    this._email = email;
  }

  /**
   * Getter idVisita
   * @return {string}
   */
  public get idVisita(): string {
    return this._idVisita;
  }

  /**
   * Getter idParticipante
   * @return {string}
   */
  public get idParticipante(): string {
    return this._idParticipante;
  }

  /**
   * Getter asistencia
   * @return {string}
   */
  public get asistencia(): string {
    return this._asistencia;
  }

  /**
   * Getter usuario
   * @return {string}
   */
  public get usuario(): string {
    return this._usuario;
  }

  /**
   * Getter email
   * @return {string}
   */
  public get email(): string {
    return this._email;
  }

  /**
   * Setter idVisita
   * @param {string} value
   */
  public set idVisita(value: string) {
    this._idVisita = value;
  }

  /**
   * Setter idParticipante
   * @param {string} value
   */
  public set idParticipante(value: string) {
    this._idParticipante = value;
  }

  /**
   * Setter asistencia
   * @param {string} value
   */
  public set asistencia(value: string) {
    this._asistencia = value;
  }

  /**
   * Setter usuario
   * @param {string} value
   */
  public set usuario(value: string) {
    this._usuario = value;
  }

  /**
   * Setter email
   * @param {string} value
   */
  public set email(value: string) {
    this._email = value;
  }
}
