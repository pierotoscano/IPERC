import { MatrizActividad } from './MatrizActividad';

export class Puesto {
  private _idMatrizPuesto: number;
  private _idMatriz: string;
  private _idPuesto: number;
  private _idArea: number;
  private _puesto: string;
  private _observacion: string;
  private _estado: string;
  private _usuarioRegistro: string;
  private _fechaRegistro: Date;
  private _usuarioModifica: string;
  private _fechaModifica: Date;
  private _listMatrizActividades: MatrizActividad[];

  constructor(
    idMatrizPuesto?: number,
    idMatriz?: string,
    idPuesto?: number,
    idArea?: number,
    puesto?: string,
    observacion?: string,
    estado?: string,
    usuarioRegistro?: string,
    fechaRegistro?: Date,
    usuarioModifica?: string,
    fechaModifica?: Date
  ) {
    this._idMatrizPuesto = idMatrizPuesto;
    this._idMatriz = idMatriz;
    this._idPuesto = idPuesto;
    this._idArea = idArea;
    this._puesto = puesto;
    this._observacion = observacion;
    this._estado = estado;
    this._usuarioRegistro = usuarioRegistro;
    this._fechaRegistro =
      fechaRegistro instanceof Date ? fechaRegistro : new Date(fechaRegistro);
    this._usuarioModifica = usuarioModifica;
    this._fechaModifica =
      fechaModifica instanceof Date ? fechaModifica : new Date(fechaModifica);
  }

  /**
   * Getter idPuesto
   * @return {number}
   */
  public get idPuesto(): number {
    return this._idPuesto;
  }

  /**
   * Getter idArea
   * @return {number}
   */
  public get idArea(): number {
    return this._idArea;
  }

  /**
   * Getter puesto
   * @return {string}
   */
  public get puesto(): string {
    return this._puesto;
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
   * Getter idMatrizPuesto
   * @return {number}
   */
  public get idMatrizPuesto(): number {
    return this._idMatrizPuesto;
  }

  /**
   * Getter idMatriz
   * @return {string}
   */
  public get idMatriz(): string {
    return this._idMatriz;
  }

  /**
   * Getter observacion
   * @return {string}
   */
  public get observacion(): string {
    return this._observacion;
  }

  /**
   * Setter idPuesto
   * @param {number} value
   */
  public set idPuesto(value: number) {
    this._idPuesto = value;
  }

  /**
   * Setter idArea
   * @param {number} value
   */
  public set idArea(value: number) {
    this._idArea = value;
  }

  /**
   * Setter puesto
   * @param {string} value
   */
  public set puesto(value: string) {
    this._puesto = value;
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
   * Getter listMatrizActividades
   * @return {MatrizActividad[]}
   */
  public get listMatrizActividades(): MatrizActividad[] {
    return this._listMatrizActividades;
  }

  /**
   * Setter listMatrizActividades
   * @param {MatrizActividad[]} value
   */
  public set listMatrizActividades(value: MatrizActividad[]) {
    this._listMatrizActividades = value;
  }

  /**
   * Setter idMatrizPuesto
   * @param {number} value
   */
  public set idMatrizPuesto(value: number) {
    this._idMatrizPuesto = value;
  }

  /**
   * Setter idMatriz
   * @param {string} value
   */
  public set idMatriz(value: string) {
    this._idMatriz = value;
  }

  /**
   * Setter observacion
   * @param {string} value
   */
  public set observacion(value: string) {
    this._observacion = value;
  }
}
