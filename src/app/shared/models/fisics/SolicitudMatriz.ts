export class SolicitudMatriz {
  private _id: string;
  private _idMatriz: string;
  private _idArea: number;
  private _idSolicitante: string;
  private _idSupervisor: string;
  private _idTipoMotivo: number;
  private _idMessage: number;
  private _motivo: string;
  private _usuarioRegistro: string;
  private _usuarioModifica: string;
  private _fechaRegistro: Date;
  private _fechaModifica: Date;
  private _estado: string;
  private _estadoMatriz: string;
  private _tipo: string;
  private _tipoMotivo: string;
  private _solicitante: string;
  private _supervisor: string;
  private _emailSolicitante: string;
  private _emailSupervisor: string;
  private _area: string;
  private _idCentro: number;
  private _centro: string;
  private _descEstado: string;
  private _matriz: string;
  private _etapa: string;
  private _visita: string;
  private _totalRows: number;

  constructor(
    id?: string,
    idMatriz?: string,
    idArea?: number,
    idSolicitante?: string,
    idSupervisor?: string,
    idTipoMotivo?: number,
    idMessage?: number,
    motivo?: string,
    usuarioRegistro?: string,
    usuarioModifica?: string,
    fechaRegistro?: Date,
    fechaModifica?: Date,
    estado?: string,
    estadoMatriz?: string,
    tipo?: string,
    tipoMotivo?: string,
    solicitante?: string,
    supervisor?: string,
    emailSolicitante?: string,
    emailSupervisor?: string,
    area?: string,
    idCentro?: number,
    centro?: string,
    descEstado?: string,
    // matriz: string,
    etapa?: string,
    visita?: string,
    totalRows?: number
  ) {
    this._id = id ? id : null;
    this._idMatriz = idMatriz ? idMatriz : null;
    this._idArea = idArea ? idArea : null;
    this._idSolicitante = idSolicitante ? idSolicitante : null;
    this._idSupervisor = idSupervisor ? idSupervisor : null;
    this._idTipoMotivo = idTipoMotivo ? idTipoMotivo : null;
    this._idMessage = idMessage ? idMessage : null;
    this._motivo = motivo ? motivo : null;
    this._usuarioRegistro = usuarioRegistro ? usuarioRegistro : null;
    this._usuarioModifica = usuarioModifica ? usuarioModifica : null;
    this._fechaRegistro = fechaRegistro
      ? fechaRegistro instanceof Date
        ? fechaRegistro
        : new Date(fechaRegistro)
      : null;
    this._fechaModifica = fechaModifica
      ? fechaModifica instanceof Date
        ? fechaModifica
        : new Date(fechaModifica)
      : null;
    this._estado = estado ? estado : null;
    this._estadoMatriz = estadoMatriz ? estadoMatriz : null;
    this._tipo = tipo ? tipo : null;
    this._tipoMotivo = tipoMotivo ? tipoMotivo : null;
    this._solicitante = solicitante ? solicitante : null;
    this._supervisor = supervisor ? supervisor : null;
    this._emailSolicitante = emailSolicitante ? emailSolicitante : null;
    this._emailSupervisor = emailSupervisor ? emailSupervisor : null;
    this._area = area ? area : null;
    this._idCentro = idCentro ? idCentro : null;
    this._centro = centro ? centro : null;
    this._descEstado = descEstado ? descEstado : null;
    // this._matriz = matriz;
    this._etapa = etapa;
    this._visita = visita;
    this._totalRows = totalRows;
  }

  /**
   * Getter id
   * @return {string}
   */
  public get id(): string {
    return this._id;
  }

  /**
   * Getter idArea
   * @return {number}
   */
  public get idArea(): number {
    return this._idArea;
  }

  /**
   * Getter idSolicitante
   * @return {string}
   */
  public get idSolicitante(): string {
    return this._idSolicitante;
  }

  /**
   * Getter idSupervisor
   * @return {string}
   */
  public get idSupervisor(): string {
    return this._idSupervisor;
  }

  /**
   * Getter idTipoMotivo
   * @return {number}
   */
  public get idTipoMotivo(): number {
    return this._idTipoMotivo;
  }

  /**
   * Getter idMessage
   * @return {number}
   */
  public get idMessage(): number {
    return this._idMessage;
  }

  /**
   * Getter motivo
   * @return {string}
   */
  public get motivo(): string {
    return this._motivo;
  }

  /**
   * Getter usuarioRegistro
   * @return {string}
   */
  public get usuarioRegistro(): string {
    return this._usuarioRegistro;
  }

  /**
   * Getter usuarioModifica
   * @return {string}
   */
  public get usuarioModifica(): string {
    return this._usuarioModifica;
  }

  /**
   * Getter fechaRegistro
   * @return {Date}
   */
  public get fechaRegistro(): Date {
    return this._fechaRegistro;
  }

  /**
   * Getter fechaModifica
   * @return {Date}
   */
  public get fechaModifica(): Date {
    return this._fechaModifica;
  }

  /**
   * Getter estado
   * @return {string}
   */
  public get estado(): string {
    return this._estado;
  }

  /**
   * Getter tipo
   * @return {string}
   */
  public get tipo(): string {
    return this._tipo;
  }

  /**
   * Getter solicitante
   * @return {string}
   */
  public get solicitante(): string {
    return this._solicitante;
  }

  /**
   * Getter supervisor
   * @return {string}
   */
  public get supervisor(): string {
    return this._supervisor;
  }

  /**
   * Getter emailSolicitante
   * @return {string}
   */
  public get emailSolicitante(): string {
    return this._emailSolicitante;
  }

  /**
   * Getter emailSupervisor
   * @return {string}
   */
  public get emailSupervisor(): string {
    return this._emailSupervisor;
  }

  /**
   * Getter area
   * @return {string}
   */
  public get area(): string {
    return this._area;
  }

  /**
   * Getter idCentro
   * @return {number}
   */
  public get idCentro(): number {
    return this._idCentro;
  }

  /**
   * Getter centro
   * @return {string}
   */
  public get centro(): string {
    return this._centro;
  }

  /**
   * Getter descEstado
   * @return {string}
   */
  public get descEstado(): string {
    return this._descEstado;
  }

  /**
   * Getter matriz
   * @return {string}
   */
  public get matriz(): string {
    return this._matriz;
  }

  /**
   * Getter etapa
   * @return {string}
   */
  public get etapa(): string {
    return this._etapa;
  }

  /**
   * Getter visita
   * @return {string}
   */
  public get visita(): string {
    return this._visita;
  }

  /**
   * Getter idMatriz
   * @return {string}
   */
  public get idMatriz(): string {
    return this._idMatriz;
  }

  /**
   * Getter estadoMatriz
   * @return {string}
   */
  public get estadoMatriz(): string {
    return this._estadoMatriz;
  }

  /**
   * Getter tipoMotivo
   * @return {string}
   */
  public get tipoMotivo(): string {
    return this._tipoMotivo;
  }

  /**
   * Getter totalRows
   * @return {number}
   */
  public get totalRows(): number {
    return this._totalRows;
  }

  /**
   * Setter id
   * @param {string} value
   */
  public set id(value: string) {
    this._id = value;
  }

  /**
   * Setter idArea
   * @param {number} value
   */
  public set idArea(value: number) {
    this._idArea = value;
  }

  /**
   * Setter idSolicitante
   * @param {string} value
   */
  public set idSolicitante(value: string) {
    this._idSolicitante = value;
  }

  /**
   * Setter idSupervisor
   * @param {string} value
   */
  public set idSupervisor(value: string) {
    this._idSupervisor = value;
  }

  /**
   * Setter idTipoMotivo
   * @param {number} value
   */
  public set idTipoMotivo(value: number) {
    this._idTipoMotivo = value;
  }

  /**
   * Setter idMessage
   * @param {number} value
   */
  public set idMessage(value: number) {
    this._idMessage = value;
  }

  /**
   * Setter motivo
   * @param {string} value
   */
  public set motivo(value: string) {
    this._motivo = value;
  }

  /**
   * Setter usuarioRegistro
   * @param {string} value
   */
  public set usuarioRegistro(value: string) {
    this._usuarioRegistro = value;
  }

  /**
   * Setter usuarioModifica
   * @param {string} value
   */
  public set usuarioModifica(value: string) {
    this._usuarioModifica = value;
  }

  /**
   * Setter fechaRegistro
   * @param {Date} value
   */
  public set fechaRegistro(value: Date) {
    this._fechaRegistro = value;
  }

  /**
   * Setter fechaModifica
   * @param {Date} value
   */
  public set fechaModifica(value: Date) {
    this._fechaModifica = value;
  }

  /**
   * Setter estado
   * @param {string} value
   */
  public set estado(value: string) {
    this._estado = value;
  }

  /**
   * Setter tipo
   * @param {string} value
   */
  public set tipo(value: string) {
    this._tipo = value;
  }

  /**
   * Setter solicitante
   * @param {string} value
   */
  public set solicitante(value: string) {
    this._solicitante = value;
  }

  /**
   * Setter supervisor
   * @param {string} value
   */
  public set supervisor(value: string) {
    this._supervisor = value;
  }

  /**
   * Setter emailSolicitante
   * @param {string} value
   */
  public set emailSolicitante(value: string) {
    this._emailSolicitante = value;
  }

  /**
   * Setter emailSupervisor
   * @param {string} value
   */
  public set emailSupervisor(value: string) {
    this._emailSupervisor = value;
  }

  /**
   * Setter area
   * @param {string} value
   */
  public set area(value: string) {
    this._area = value;
  }

  /**
   * Setter idCentro
   * @param {number} value
   */
  public set idCentro(value: number) {
    this._idCentro = value;
  }

  /**
   * Setter centro
   * @param {string} value
   */
  public set centro(value: string) {
    this._centro = value;
  }

  /**
   * Setter descEstado
   * @param {string} value
   */
  public set descEstado(value: string) {
    this._descEstado = value;
  }
  /**
   * Setter descEstado
   * @param {string} value
   */
  public set matriz(value: string) {
    this._matriz = value;
  }

  /**
   * Setter etapa
   * @param {string} value
   */
  public set etapa(value: string) {
    this._etapa = value;
  }

  /**
   * Setter visita
   * @param {string} value
   */
  public set visita(value: string) {
    this._visita = value;
  }

  /**
   * Setter idMatriz
   * @param {string} value
   */
  public set idMatriz(value: string) {
    this._idMatriz = value;
  }

  /**
   * Setter estadoMatriz
   * @param {string} value
   */
  public set estadoMatriz(value: string) {
    this._estadoMatriz = value;
  }

  /**
   * Setter tipoMotivo
   * @param {string} value
   */
  public set tipoMotivo(value: string) {
    this._tipoMotivo = value;
  }

  /**
   * Setter totalRows
   * @param {number} value
   */
  public set totalRows(value: number) {
    this._totalRows = value;
  }
}
