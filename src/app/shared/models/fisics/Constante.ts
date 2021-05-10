export class Constante {
  private _id: string;
  private _valor1: string;
  private _valor2: string;
  private _valor3: string;
  private _valor4: string;
  private _estado: string;

  constructor(
    id: string,
    valor1: string,
    valor2: string,
    valor3: string,
    valor4: string,
    estado: string
  ) {
    this._id = id;
    this._valor1 = valor1;
    this._valor2 = valor2;
    this._valor3 = valor3;
    this._valor4 = valor4;
    this._estado = estado;
  }

  /**
   * Getter id
   * @return {string}
   */
  public get id(): string {
    return this._id;
  }

  /**
   * Getter valor1
   * @return {string}
   */
  public get valor1(): string {
    return this._valor1;
  }

  /**
   * Getter valor2
   * @return {string}
   */
  public get valor2(): string {
    return this._valor2;
  }

  /**
   * Getter valor3
   * @return {string}
   */
  public get valor3(): string {
    return this._valor3;
  }

  /**
   * Getter valor4
   * @return {string}
   */
  public get valor4(): string {
    return this._valor4;
  }

  /**
   * Getter estado
   * @return {string}
   */
  public get estado(): string {
    return this._estado;
  }

  /**
   * Setter id
   * @param {string} value
   */
  public set id(value: string) {
    this._id = value;
  }

  /**
   * Setter valor1
   * @param {string} value
   */
  public set valor1(value: string) {
    this._valor1 = value;
  }

  /**
   * Setter valor2
   * @param {string} value
   */
  public set valor2(value: string) {
    this._valor2 = value;
  }

  /**
   * Setter valor3
   * @param {string} value
   */
  public set valor3(value: string) {
    this._valor3 = value;
  }

  /**
   * Setter valor4
   * @param {string} value
   */
  public set valor4(value: string) {
    this._valor4 = value;
  }

  /**
   * Setter estado
   * @param {string} value
   */
  public set estado(value: string) {
    this._estado = value;
  }
}
