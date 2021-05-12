import { User } from './models/fisics/base/User';
export class Variables {
  private static readonly mainUrlIpercApi =
    'https://qas.yapu.pe/iperc-api/api/';

  static readonly Grupos = {
    GrupoDT: 'GrupoDT',
    GrupoEECC: 'GrupoEECC',
    GrupoSL: 'GrupoSL',
    GrupoLAB: 'GrupoLAB',
    GrupoRDM: 'GrupoRDM',
    Administradores: 'Administradores',
  };

  static readonly colores = {
    Plomo: 'c0c0c0',
    Celeste: '99ccff',
    Naranja: 'ffcc99',
    Verde: 'ccffcc',
    Crema: 'ffff99',
    Azul: '89a4d1',
    Morado: 'ccc0da',
    Blanco: 'ffffff',
    VerdeTono: '92d050',
    Flujo: {
      // Creadas: 'rgba(255,0,0,0.3)',// '#5a5ff0',
      EnProceso: '#03a9f4', // '#e2e983',
      Cerradas: '#8a8787', // '#85ed89'
    },
  };

  static readonly constantes = {
    AnnioInicial: 2020,
    IdEtapaFinal: 14,
    IdSiRequiereEspecificacionTecnica: 5771,
    PlazoDiasVencimientoSolicitud: 2,
    Lista: 'Lista',
    Biblioteca: 'Biblioteca',
  };

  static readonly path = {
    home: 'home',
    inicio: 'inicio',
    login: 'login',
    bandejaSolicitudMaterial: 'material-bandeja-solicitud',
    bandejaSolicitudMaterialEtapa: 'material-bandeja-solicitud/:etapa',
    duplicarMatriz: 'duplicar-matriz',
    formSolicitudMaterial: 'material-formulario-solicitud/:id',
    enviarSolicitud: 'enviar-solicitud',
    editarSolicitud: 'enviar-solicitud/:idSolicitudMatriz',
  };

  static readonly lists = {
    Approvers: 'Approvers',
    Categories: 'Categories',
    IdGroups: 'IdGroups',
    Log: 'Log',
    Roles: 'Roles',
    SentEmails: 'SentEmails',
    AssignmentEvaluatorPermissions: 'AssignmentEvaluatorPermissions',
    MaestroDesplegables: 'MaestroDesplegables',
    MaestroParametros: 'MaestroParametros',
    MaestroMaterial: 'MaestroMaterial',
    MaestroCampos: 'MaestroCampos',
    MaestroFLujoEtapa: 'MaestroFLujoEtapa',
    MaestroLinea: 'MaestroLinea',
    MaestroProveedores: 'MaestroProveedores',
    MaestroMaterialFlujoLog: 'MaestroMaterialFlujoLog',
    MaestroMaterialDocs: 'MaestroMaterialDocs',
    MasterObjetosPermiso: 'MasterObjetosPermiso',
  };

  static readonly columns = {
    IdCanalDistribucion: 'IdCanalDistribucion',
    IdEtapaSiguiente: 'IdEtapaSiguiente',
    EtapaHabilitado: 'EtapaHabilitado',
    CargaDocumentos: 'CargaDocumentos',
    TextoLargo: 'TextoLargo',
    RolMaterialesSolicitantes: 'RolMaterialesSolicitantes',
    Nombre: 'Nombre',
    Oculto: 'Oculto',
    Texto: 'Texto',
    OrdenCampo: 'OrdenCampo',
    DesplegableCampo: 'DesplegableCampo',
    ListaCampo: 'ListaCampo',
    Seccion: 'Seccion',
    Comentarios: 'Comentarios',
    IdEtapaSiguienteEspecificacionTe: 'IdEtapaSiguienteEspecificacionTe',
    Rechazo: 'Rechazo',
    EnBorrador: 'EnBorrador',
    Abreviatura: 'Abreviatura',
    LAB: 'LAB',
    DT: 'DT',
    RDM: 'RDM',
    Categoria: 'Categoria',
    MaestroProveedor: 'MaestroProveedor',
    EECC: 'EECC',
    Author: 'Author',
    MaestroFlujoEtapa: 'MaestroFlujoEtapa',
    MaestroFLujoEtapa: 'MaestroFLujoEtapa',
    ResponsableLaboratorio: 'ResponsableLaboratorio',
    EjecutivoComercial: 'EjecutivoComercial',
    ResponsableDT: 'ResponsableDT',
    ResponsableRDM: 'ResponsableRDM',
    Padre: 'Padre',
    Codigo: 'Codigo',
    CodigoOp: 'CodigoOp',
    GruposParticipantes: 'GruposParticipantes',
    NombreGrupo: 'NombreGrupo',
    TextoBreveMaterial: 'TextoBreveMaterial',
    Valor: 'Valor',
    ContentTypeId: 'ContentTypeId',
    Id: 'Id',
    ID: 'ID',
    Title: 'Title',
    EncodedAbsUrl: 'EncodedAbsUrl',
    Email: 'Email',
    EMail: 'EMail',
    Abbreviation: 'Abbreviation',
    AdministratorsGroup: 'AdministratorsGroup',
    Answer: 'Answer',
    ApprovalDate: 'ApprovalDate',
    Approvers: 'Approvers',
    Approver: 'Approver',
    ApproversText: 'ApproversText',
    AssignedTo: 'AssignedTo1',
    Benchmark: 'Benchmark',
    BenefitsFormula: 'BenefitsFormula',
    Body: 'Body1',
    Category: 'Category1',
    CategoryText: 'CategoryText',
    CategoryAbbreviationText: 'CategoryAbbreviationText',
    CharacteristicTemplate: 'CharacteristicTemplate',
    Creado: 'Created',
    CreadoPor: 'Author',
    Code: 'Code',
    Comments: 'Comments1',
    CompletedComment: 'CompletedComment',
    ContentType: 'ContentType',
    CostSale: 'CostSale',
    CurrencySale: 'CurrencySale',
    DaysStart: 'DaysStart',
    DaysTerm: 'DaysTerm',
    Description: 'Description',
    Determinant: 'Determinant',
    DocumentOwner: 'DocumentOwner',
    DocumentOwnersGroup: 'DocumentOwnersGroup',
    Editor: 'Editor',
    EndDate: 'EndDate1',
    EsProductoTercero: 'EsProductoTercero',
    EstadoAsignacionPermisosFolderPdf: 'EstadoAsignacionPermisosFolderPd',
    EvalSheetDetailHTML: 'EvalSheetDetailHTML',
    Evaluation: 'Evaluation',
    EvaluationScale: 'EvaluationScale',
    EvaluationSheet: 'EvaluationSheet',
    EvaluationSheetCharacteristic: 'EvaluationSheetCharacteristic',
    EvaluationStatus: 'EvaluationStatus',
    Evaluator: 'Evaluator',
    ExpectedValues: 'ExpectedValues',
    FeedbackDate: 'FeedbackDate',
    FormulaDevelopmentStartDate: 'FormulaDevelopmentStartDate',
    FormulaCost: 'FormulaCost',
    FormulaReceiptDate: 'FormulaReceiptDate',
    Goodness: 'Goodness',
    Group: 'Group1',
    GroupDocumentOwner: 'GroupDocumentOwner',
    GroupingCharacteristic: 'GroupingCharacteristic',
    Ingredients: 'Ingredients',
    LastEvaluationSheet: 'LastEvaluationSheet',
    Line: 'Line',
    MailTitle: 'MailTitle',
    MailBody: 'MailBody',
    Modified: 'Modified',
    NotificationGroup: 'NotificationGroup',
    Pagina: 'Pagina',
    ParentId: 'ParentId',
    PredecessorId: 'PredecessorId',
    ProductName: 'ProductName',
    ProductProposal: 'ProductProposal',
    ProjectCode: 'ProjectCode',
    ProjectTypes: 'ProjectTypes',
    ProjectTypeLookup: 'ProjectTypeLookup',
    ProyectoAbreviaturaCategoria: 'CategoryAbbreviationText',
    ProyectoAnioCreacion: 'TargetYear',
    Reason: 'Reason',
    ReleaseCampaignCode: 'ReleaseCampaignCode',
    ReleaseStartDate: 'ReleaseStartDate',
    ReleaseEndDate: 'ReleaseEndDate',
    ReleaseYear: 'ReleaseYear',
    RequiereAprobacionG1: 'RequiereAprobacionG1',
    ReviewDate: 'ReviewDate',
    ReasonRejection: 'ReasonRejection',
    ReasonRework: 'ReasonRework',
    ReviewUser: 'ReviewUser',
    RolType: 'RolType',
    RutaPdfEvaluacionResumen: 'RutaPdfEvaluacionResumen',
    Sale: 'Sale',
    SalePrice: 'SalePrice',
    SaleUnits: 'SaleUnits',
    ShowButtonViewEvaluation: 'ShowButtonViewEvaluation',
    Segment: 'Segment',
    SendMailGroupTypeG2: 'SendMailGroupTypeG2',
    SKU: 'SKU',
    State: 'State',
    StartDate: 'StartDate1',
    Status: 'Status',
    SubmissionCount: 'SubmissionCount',
    SubmissionNumber: 'SubmissionNumber',
    Sumision: 'Sumision',
    TargetCost: 'TargetCost',
    TargetDate: 'TargetDate',
    TargetYear: 'TargetYear',
    TipoDevolucion: 'TipoDevolucion',
    Type: 'Type',
    UseFormula: 'UseFormula',
    User: 'User1',
    UserEmails: 'UserEmails',
    UserEmailsCopy: 'UserEmailsCopy',
    VacationRegistrationStatus: 'VacationRegistrationStatus',
    ValueScale: 'ValueScale',
    Weight: 'Weight',
    FormulatorTeam: 'FormulatorTeam',
    ShowDaysAlertExpiration: 'ShowDaysAlertExpiration',
    ParedFolderId: 'ParedFolderId',
    EstadoCreacionCarpetaPared: 'EstadoCreacionCarpetaPared',
    CarpetaPadre: 'CarpetaPadre',
    GrupoEscritura: 'GrupoEscritura',
    GrupoLectura: 'GrupoLectura',
    Path: 'Path',
    Member: 'Member',
    RoleDefinitionBindings: 'RoleDefinitionBindings',
    Name: 'Name',
    FileDirRef: 'FileDirRef',
    FileLeafRef: 'FileLeafRef',
    File: 'File',
    Folder: 'Folder',
    PathSavePdfEvaluators: 'PathSavePdfEvaluators',
    EvaluationSheetCode: 'EvaluationSheetCode',
    EvaluationSheetId: 'EvaluationSheetId',
    PathFolder: 'PathFolder',
    PathId: 'PathId',
    UrlSitio: 'UrlSitio',
    ResRequest: 'ResRequest',
    UsuariosEscrituraId: 'UsuariosEscrituraId',

    TipoText: 'TipoText',
    Tipo: 'Tipo',
  };

  static readonly contentTypes = {
    Approver: '0x01002F0DE5159DB83747B7DE82292E7B5803',
    Characteristic: '0x0100361BE556D73734439D6C87AE770B6804',
    CharacteristicEvaluation: '0x0100361BE556D73734439D6C87AE770B680401',
    CharacteristicEvaluationTemplate:
      '0x0100361BE556D73734439D6C87AE770B68040101',
    CharacteristicTemplate: '0x01001EE78AC9E2281541966943E33C72FC9A',
    EvaluationScale: '0x0100C0BC5A5140F3544EB01E8B4866EAA417',
  };

  public readonly ColumnasMaestroDesplegables = {
    TipoDocumentoAdjunto: 'TipoDocumentoAdjunto',
    CanalDistribucion: 'CanalDistribucion',
    SusceptibleBonificacion: 'SusceptibleBonificacion',
    VerificacionDisponibilidad: 'VerificacionDisponibilidad',
    MostrarClientes: 'MostrarClientes',
    MostrarStocks: 'MostrarStocks',
    MarcaMostrarPalmWeb: 'MarcaMostrarPalmWeb',
    SusceptibleBonEsp: 'SusceptibleBonEsp',
    GrupoTipoPosicionGeneral: 'GrupoTipoPosicionGeneral',
    GrupoTransporte: 'GrupoTransporte',
    PaisOrigen: 'PaisOrigen',
    PaisCreacion: 'PaisCreacion',
    FormaFarmaceutica: 'FormaFarmaceutica',
    GrupoImputacionMaterial: 'GrupoImputacionMaterial',
    ReqEspecificacionTecnica: 'ReqEspecificacionTecnica',
    ClaseTerapeutica1: 'ClaseTerapeutica1',
    ClaseTerapeutica2: 'ClaseTerapeutica2',
    ClaseTerapeutica3: 'ClaseTerapeutica3',
    ClaseTerapeutica4: 'ClaseTerapeutica4',
    CaracteristicaPlanificacion: 'CaracteristicaPlanificacion',
    CategoriaMaterial: 'CategoriaMaterial',
    ClaseEtiqueta: 'ClaseEtiqueta',
    ClasificacionArticulo: 'ClasificacionArticulo',
    ClasificacionMaterial: 'ClasificacionMaterial',
    CondicionAlmacenaje: 'CondicionAlmacenaje',
    CondicionTemperatura: 'CondicionTemperatura',
    Consignado: 'Consignado',
    DIM: 'DIM',
    Flete: 'Flete',
    FormaEtiqueta: 'FormaEtiqueta',
    GrupoArticuloExterno: 'GrupoArticuloExterno',
    GrupoCompras: 'GrupoCompras',
    IGV: 'IGV',
    ISC: 'ISC',
    Incoterm: 'Incoterm',
    IndicadorABY: 'IndicadorABY',
    IndicadorImpuestoCompraQ: 'IndicadorImpuestoCompraQ',
    IndicadorImpuestoCompraSLA: 'IndicadorImpuestoCompraSLA',
    IndicadorPeriodoCaducidad: 'IndicadorPeriodoCaducidad',
    InventarioCiclico: 'InventarioCiclico',
    Jerarquia1: 'Jerarquia1',
    Jerarquia2: 'Jerarquia2',
    Jerarquia3: 'Jerarquia3',
    Jerarquia4: 'Jerarquia4',
    Jerarquia5: 'Jerarquia5',
    MarcaRecuperacionDcto: 'MarcaRecuperacionDcto',
    MarcaRxOtc: 'MarcaRxOtc',
    MaterialSuceptibleBonficacion: 'MaterialSuceptibleBonficacion',
    MonedaCompraQS: 'MonedaCompraQS',
    MonedaVenta: 'MonedaVenta',
    PESO: 'PESO',
    PreferenciaArancelaria: 'PreferenciaArancelaria',
    Refrigerado: 'Refrigerado',
    Sector: 'Sector',
    SujetoLote: 'SujetoLote',
    TipoMaterial: 'TipoMaterial',
    UMI: 'UMI',
    UsoMaterialPromocional: 'UsoMaterialPromocional',
  };

  static readonly ipercApis = {
    ObtenerAcceso: `${Variables.mainUrlIpercApi}PA_obtenerAccesoTest`,
    ObtenerActividadMatriz: `${Variables.mainUrlIpercApi}PA_ObtenerActividadMatrizTest`,
    ObtenerAlcance: `${Variables.mainUrlIpercApi}PA_ObtenerAlcanceTest`,
    ObtenerArea: `${Variables.mainUrlIpercApi}PA_ObtenerAreaTest`,
    ObtenerCentro: `${Variables.mainUrlIpercApi}PA_ObtenerCentroTest`,
    ObtenerConstante: `${Variables.mainUrlIpercApi}PA_ObtenerConstanteTest`,
    ObtenerHerramienta: `${Variables.mainUrlIpercApi}PA_ObtenerHerramientaTest`,
    ObtenerMatriz: `${Variables.mainUrlIpercApi}PA_ObtenerMatrizTest`,
    ObtenerMenuAcceso: `${Variables.mainUrlIpercApi}PA_ObtenerMenuAccesoTest`,
    ObtenerMenu: `${Variables.mainUrlIpercApi}PA_ObtenerMenuTest`,
    ObtenerProceso: `${Variables.mainUrlIpercApi}PA_ObtenerProcesoTest`,
    ObtenerPuesto: `${Variables.mainUrlIpercApi}PA_ObtenerMatrizPuestoTest`,
    ObtenerResponsable: `${Variables.mainUrlIpercApi}PA_ObtenerResponsableTest`,
    ObtenerRol: `${Variables.mainUrlIpercApi}PA_ObtenerRolTest`,
    ObtenerSolicitudMatriz: `${Variables.mainUrlIpercApi}PA_ObtenerSolicitudMatrizTest`,
    ObtenerSubProceso: `${Variables.mainUrlIpercApi}PA_ObtenerSubProcesoTest`,
    ObtenerTipoMC: `${Variables.mainUrlIpercApi}PA_ObtenerTipoMCTest`,
    ObtenerTipoMotivo: `${Variables.mainUrlIpercApi}PA_ObtenerTipoMotivoTest`,
    ObtenerTipoRiesgo: `${Variables.mainUrlIpercApi}PA_ObtenerTipoRiesgoTest`,
    ObtenerUsuario: `${Variables.mainUrlIpercApi}PA_ObtenerUsuarioTest`,
    ObtenerUbicacion: `${Variables.mainUrlIpercApi}PA_obtenerUbicacionTest`,
    ObtenerVisita: `${Variables.mainUrlIpercApi}PA_ObtenerVisitaTest`,
    ObtenerPeligro: `${Variables.mainUrlIpercApi}PA_ObtenerPeligroTest`,
    ObtenerMatrizPeligroByIdMatriz: `${Variables.mainUrlIpercApi}PA_ObtenerMatrizPeligroTest`,
    ObtenerRiesgo: `${Variables.mainUrlIpercApi}PA_ObtenerRiesgoTest`,
    ObtenerMatrizRiesgoByIdMatriz: `${Variables.mainUrlIpercApi}PA_obtenerMatrizRiesgoTest`,
    ObtenerMCERiesgo: `${Variables.mainUrlIpercApi}PA_ObtenerMCERiesgoTest`,
    ObtenerMCPRiesgo: `${Variables.mainUrlIpercApi}PA_ObtenerMCPRiesgoTest`,
    ObtenerParticipantes: `${Variables.mainUrlIpercApi}PA_obtenerParticipantesTEST`,

    ObtenerLogin: `${Variables.mainUrlIpercApi}PA_LoginUsuarioTest`,
    ObtenerIndicadores: `${Variables.mainUrlIpercApi}PA_ObtenerIndicadoresTest`,

    EliminarPuesto: `${Variables.mainUrlIpercApi}WF_EliminarPuestoTest`,
    EliminarActividad: `${Variables.mainUrlIpercApi}WF_EliminarActividadTest`,
    EliminarRiesgo: `${Variables.mainUrlIpercApi}WF_EliminarRiesgoTest`,
    EliminarPeligro: `${Variables.mainUrlIpercApi}WF_EliminarPeligroTest`,
    EliminarRiesgoMCPRiesgo: `${Variables.mainUrlIpercApi}WF_EliminarRiesgoMCPTest`,
    EliminarRiesgoMCERiesgo: `${Variables.mainUrlIpercApi}WF_EliminarRiesgoMCETest`,

    GuardarSolicitudMatriz: `${Variables.mainUrlIpercApi}WF_GuardarSolicitudMatrizTest`,
    GuardarActividadMatriz: `${Variables.mainUrlIpercApi}WF_GuardarActividadMatrizTest`,
    GuardarAsignacion: `${Variables.mainUrlIpercApi}WF_GuardarAsignacionTest`,
    GuardarEvidencia: `${Variables.mainUrlIpercApi}WF_GuardarEvidenciaTest`,
    GuardarMatriz: `${Variables.mainUrlIpercApi}WF_GuardarMatrizTest`,
    GuardarMCERiesgo: `${Variables.mainUrlIpercApi}WF_GuardarMCERiesgoTest`,
    GuardarPeligroMatriz: `${Variables.mainUrlIpercApi}WF_GuardarPeligroMatrizTest`,
    GuardarPuesto: `${Variables.mainUrlIpercApi}WF_GuardarPuestoTest`,
    GuardarRiesgoMatriz: `${Variables.mainUrlIpercApi}WF_GuardarRiesgoMatrizTest`,
    GuardarParticipantes: `${Variables.mainUrlIpercApi}WF_GuardarParticipantesTest`,
    GuardarMCPRiesgo: `${Variables.mainUrlIpercApi}WF_GuardarMCPRiesgoTest`,
    GuardarUsuario: `${Variables.mainUrlIpercApi}WF_GuardarUsuarioTest`,
    GuardarVisita: `${Variables.mainUrlIpercApi}WF_GuardarVisitaTest`,

    AsignarSupervisor: `${Variables.mainUrlIpercApi}WF_AsignarSupervisorTest`,
    GenerarMatriz: `${Variables.mainUrlIpercApi}WF_GenerarMatrizTest`,

    UpdateMatrizEstado: `${Variables.mainUrlIpercApi}WF_UpdateMatrizEstadoTest`,
  };
}

export class UsuarioConsultado {
  static _user: User = null;
}

export class SPParse {
  static getBool(valor: any): boolean {
    if (valor) {
      return valor;
    }

    return false;
  }

  static getString(valor: any): string {
    if (valor) {
      return valor.toString();
    }

    return '';
  }

  static getNumber(valor: any): number {
    if (valor) {
      return parseInt(valor, 10);
    }

    return 0;
  }

  static getDecimal(valor: any): number {
    if (valor) {
      return parseFloat(valor);
    }

    return 0;
  }

  static getVinculo(valor: any): string {
    if (valor) {
      return valor.Url;
    }

    return '';
  }

  static getDate(valor: any): Date {
    if (valor) {
      return new Date(valor);
    }

    return null;
  }
}
