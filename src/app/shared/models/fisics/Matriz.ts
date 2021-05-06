export class Matriz {
  private _id: string;
  private _idSolicitudMatriz: string;
  private _idArea: number;
  private _idSolicitante: string;
  private _idSupervisor: string;
  private _periodo: string;
  private _estado: string;
  private _usuarioRegistro: string;
  private _fechaRegistro: Date;
  private _usuarioModifica: string;
  private _fechaModifica: Date;
  private _solicitante: string;
  private _emailSolicitante: string;
  private _supervisor: string;
  private _emailSupervisor: string;
  private _jefeArea: string;
  private _emailJefeArea: string;
  private _gerenteArea: string;
  private _emailGerenteArea: string;
  private _empresa: string;
  private _observacion: string;
  private _centro: string;
  private _area: string;
  private _alcance: string;
  private _proceso: string;
  private _descEstado: string;

  constructor(
    id?: string,
    idSolicitudMatriz?: string,
    idArea?: number,
    idSolicitante?: string,
    idSupervisor?: string,
    periodo?: string,
    estado?: string,
    usuarioRegistro?: string,
    fechaRegistro?: Date,
    usuarioModifica?: string,
    fechaModifica?: Date,
    solicitante?: string,
    emailSolicitante?: string,
    supervisor?: string,
    emailSupervisor?: string,
    jefeArea?: string,
    emailJefeArea?: string,
    gerenteArea?: string,
    emailGerenteArea?: string,
    empresa?: string,
    observacion?: string,
    centro?: string,
    area?: string,
    alcance?: string,
    proceso?: string,
    descEstado?: string
  ) {
    this._id = id ? id : null;
    this._idSolicitudMatriz = idSolicitudMatriz ? idSolicitudMatriz : null;
    this._idArea = idArea ? idArea : null;
    this._idSolicitante = idSolicitante ? idSolicitante : null;
    this._idSupervisor = idSupervisor ? idSupervisor : null;
    this._periodo = periodo ? periodo : null;
    this._estado = estado ? estado : null;
    this._usuarioRegistro = usuarioRegistro ? usuarioRegistro : null;
    this._fechaRegistro = fechaRegistro
      ? fechaRegistro instanceof Date
        ? fechaRegistro
        : new Date(fechaRegistro)
      : null;
    this._usuarioModifica = usuarioModifica ? usuarioModifica : null;
    this._fechaModifica = fechaModifica
      ? fechaModifica instanceof Date
        ? fechaModifica
        : new Date(fechaModifica)
      : null;
    this._solicitante = solicitante ? solicitante : null;
    this._emailSolicitante = emailSolicitante ? emailSolicitante : null;
    this._supervisor = supervisor ? supervisor : null;
    this._emailSupervisor = emailSupervisor ? emailSupervisor : null;
    this._jefeArea = jefeArea ? jefeArea : null;
    this._emailJefeArea = emailJefeArea ? emailJefeArea : null;
    this._gerenteArea = gerenteArea ? gerenteArea : null;
    this._emailGerenteArea = emailGerenteArea ? emailGerenteArea : null;
    this._empresa = empresa ? empresa : null;
    this._observacion = observacion ? observacion : null;
    this._centro = centro ? centro : null;
    this._area = area ? area : null;
    this._alcance = alcance ? alcance : null;
    this._proceso = proceso ? proceso : null;
    this._descEstado = descEstado ? descEstado : null;
  }

  /**
   * Getter id
   * @return {string}
   */
  public get id(): string {
    return this._id;
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
   * Getter periodo
   * @return {string}
   */
  public get periodo(): string {
    return this._periodo;
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
   * Getter solicitante
   * @return {string}
   */
  public get solicitante(): string {
    return this._solicitante;
  }

  /**
   * Getter emailSolicitante
   * @return {string}
   */
  public get emailSolicitante(): string {
    return this._emailSolicitante;
  }

  /**
   * Getter supervisor
   * @return {string}
   */
  public get supervisor(): string {
    return this._supervisor;
  }

  /**
   * Getter emailSupervisor
   * @return {string}
   */
  public get emailSupervisor(): string {
    return this._emailSupervisor;
  }

  /**
   * Getter jefeArea
   * @return {string}
   */
  public get jefeArea(): string {
    return this._jefeArea;
  }

  /**
   * Getter emailJefeArea
   * @return {string}
   */
  public get emailJefeArea(): string {
    return this._emailJefeArea;
  }

  /**
   * Getter gerenteArea
   * @return {string}
   */
  public get gerenteArea(): string {
    return this._gerenteArea;
  }

  /**
   * Getter emailGerenteArea
   * @return {string}
   */
  public get emailGerenteArea(): string {
    return this._emailGerenteArea;
  }

  /**
   * Getter empresa
   * @return {string}
   */
  public get empresa(): string {
    return this._empresa;
  }

  /**
   * Getter observacion
   * @return {string}
   */
  public get observacion(): string {
    return this._observacion;
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
   * Getter descEstado
   * @return {string}
   */
  public get descEstado(): string {
    return this._descEstado;
  }

  /**
   * Setter id
   * @param {string} value
   */
  public set id(value: string) {
    this._id = value;
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
   * Setter periodo
   * @param {string} value
   */
  public set periodo(value: string) {
    this._periodo = value;
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
   * Setter solicitante
   * @param {string} value
   */
  public set solicitante(value: string) {
    this._solicitante = value;
  }

  /**
   * Setter emailSolicitante
   * @param {string} value
   */
  public set emailSolicitante(value: string) {
    this._emailSolicitante = value;
  }

  /**
   * Setter supervisor
   * @param {string} value
   */
  public set supervisor(value: string) {
    this._supervisor = value;
  }

  /**
   * Setter emailSupervisor
   * @param {string} value
   */
  public set emailSupervisor(value: string) {
    this._emailSupervisor = value;
  }

  /**
   * Setter jefeArea
   * @param {string} value
   */
  public set jefeArea(value: string) {
    this._jefeArea = value;
  }

  /**
   * Setter emailJefeArea
   * @param {string} value
   */
  public set emailJefeArea(value: string) {
    this._emailJefeArea = value;
  }

  /**
   * Setter gerenteArea
   * @param {string} value
   */
  public set gerenteArea(value: string) {
    this._gerenteArea = value;
  }

  /**
   * Setter emailGerenteArea
   * @param {string} value
   */
  public set emailGerenteArea(value: string) {
    this._emailGerenteArea = value;
  }

  /**
   * Setter empresa
   * @param {string} value
   */
  public set empresa(value: string) {
    this._empresa = value;
  }

  /**
   * Setter observacion
   * @param {string} value
   */
  public set observacion(value: string) {
    this._observacion = value;
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

  /**
   * Setter descEstado
   * @param {string} value
   */
  public set descEstado(value: string) {
    this._descEstado = value;
  }
}
