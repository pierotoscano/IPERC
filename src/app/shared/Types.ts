import { ISiteUserInfo } from '@pnp/sp/site-users/types';

export type SolicitudMatrizBody = {
  Id_Solicitud_Matriz: string;
  Id_Solicitante: string;
  Id_Supervisor: string;
  Id_Area: number;
  Tipo: string;
  Id_Tipo_Motivo: number;
  Motivo: string;
  Estado: string;
  UsuarioRegistro: string;
  FechaRegistro: string;
  UsuarioModifica: string;
  FechaModifica: string;
};

export type AsignacionBody = {
  Id_Asignacion: number;
  Id_Matriz: number;
  Id_Matriz_Riesgo: number;
  Id_PRG: number;
  Id_MC: number;
  Id_Supervisor: string;
  Id_Responsable: number;
  Fecha_Inicio: string;
  Fecha_Fin: string;
  Avance: number;
  Observacion: string;
  Estado: string;
  UsuarioRegistro: string;
  FechaRegistro: string;
  UsuarioModifica: string;
  FechaModifica: string;
};

export type EvidenciaBody = {
  Id_Evidencia: number;
  Id_Asignacion: number;
  Id_Matriz: number;
  Evidencia: number;
  Url: number;
  Observacion: string;
  Avance: number;
  Estado: string;
  UsuarioRegistro: string;
  FechaRegistro: string;
  UsuarioModifica: string;
  FechaModifica: string;
};

export type MatrizBody = {
  Id_Matriz: string;
  Id_Solicitud_Matriz: string;
  Id_Solicitante: string;
  Id_Supervisor: string;
  Id_Area: string | number;
  Periodo: string;
  Estado: string;
  UsuarioRegistro: string;
  FechaRegistro: string;
  UsuarioModifica: string;
  FechaModifica: string;
};

export type ListaMatrizBody = {
  Id_Matriz: string;
  Id_Solicitud_Matriz: string;
  Id_Area: number;
  Id_Solicitante: string;
  Id_Supervisor: string;
  Periodo: string;
  Estado: string;
  UsuarioRegistro: string;
  FechaRegistro: string;
  UsuarioModifica: string;
  FechaModifica: string;
  Solicitante: string;
  Email_Solicitante: string;
  Supervisor: string;
  Email_Supervisor: string;
  JefeArea: string;
  Email_JefeArea: string;
  GerenteArea: string;
  Email_GerenteArea: string;
  Empresa: string;
  Observacion: string;
  Centro: string;
  Area: string;
  Alcance: string;
  Proceso: string;
  DescEstado: string;
};

export type MCERiesgoBody = {
  Id_Riesgo_MCE: number;
  Id_Matriz_Riesgo: string;
  Id_Area: number;
  Id_Riesgo: string;
  MC: string;
  Id_Tipo: string;
  Id_Responsable: number;
  Estado: string;
  Observacion: string;
  UsuarioRegistro: string;
  FechaRegistro: string;
  UsuarioModifica: string;
  FechaModifica: string;
};

export type PeligroMatrizBody = {
  Id_Matriz_Peligro: number;
  Id_Matriz: string;
  Id_Area: number;
  Id_Actividad: number;
  Peligro: string;
  Observacion: string;
  UsuarioRegistro: string;
  FechaRegistro: string;
};

export type PuestoBody = {
  Id_Matriz: string;
  Id_Puesto: number;
  Id_Area: number;
  Puesto: string;
  Observacion: string;
  UsuarioRegistro: string;
  FechaRegistro: string;
  UsuarioModifica: string;
  FechaModifica: string;
};

export type RiesgoMatrizBody = {
  Id_Matriz: string;
  Id_Matriz_Riesgo: string;
  Id_Area: number;
  Id_Actividad: number;
  Id_Peligro: number;
  Riesgo: string;
  RP_G: number;
  RP_DH: number;
  RP_MCE: number;
  RP_PG: number;
  RP_NE: number;
  RP_P: number;
  RP_ID_NIVEL_RIESGO: number;
  RR_G: number;
  RR_DH: number;
  RR_MCE: number;
  RR_PG: number;
  RR_NE: number;
  RR_P: number;
  RR_ID_NIVEL_RIESGO: number;
  Observacion: string;
  UsuarioRegistro: string;
  FechaRegistro: string;
  UsuarioModifica: string;
  FechaModifica: string;
};

export type ParticipanteValue = {
  idVisita: string;
  participante: ISiteUserInfo;
};

export type ParticipanteBody = {
  Id_Visita: string;
  json: string;
};

export type MCPRiesgoBody = {
  Id_Riesgo_MCP: number;
  Id_Matriz_Riesgo: string;
  Id_Area: number;
  Id_Riesgo: string;
  MC: string;
  Id_Tipo: string;
  Id_Responsable: number;
  Estado: string;
  Observacion: string;
  UsuarioRegistro: string;
  FechaRegistro: string;
  UsuarioModifica: string;
  FechaModifica: string;
};

export type UsuarioBody = {
  Id_Usuario: string;
  Id_Ubicacion: string;
  Rol: string;
  ApellidoPaterno: string;
  ApellidoMaterno: string;
  Nombres: string;
  Email: string;
  Key: string;
  Estado: string;
  UsuarioRegistro: string;
  FechaRegistro: string;
  UsuarioModifica: string;
  FechaModifica: string;
};

export type SupervisorBody = {
  Id_Supervisor: string;
  Id_Area: number;
  UsuarioModifica: string;
  FechaModifica: string;
};

export type VisitaBody = {
  Id_Visita: string;
  Id_Solicitud_Matriz: string;
  Id_Area: number;
  Id_Centro: number;
  InicioVisita: string;
  FinVisita: string;
  Estado: string;
  UsuarioRegistro: string;
  FechaRegistro: string;
  UsuarioModifica: string;
  FechaModifica: string;
};

export type UsuarioLoginBody = {
  Usuario: string;
  Key: string;
  Id_Usuario: string;
  Tipo: number;
  UsuarioRegistro: string;
  FechaRegistro: string;
  UsuarioModifica: string;
  FechaModifica: string;
};

export type EmpresaFilter = {
  idEmpresa: number;
  empresa: string;
};

export type CentroFilter = {
  idCentro: number;
  centro: string;
  idEmpresa: number;
};

export type AreaFilter = {
  idArea: number;
  area: string;
  idCentro: number;
  idEmpresa: number;
};

export type AlcanceFilter = {
  idAlcance: number;
  alcance: string;
  idArea: number;
  idCentro: number;
  idEmpresa: number;
};

export type ProcesoFilter = {
  idProceso: number;
  proceso: string;
  idAlcance: number;
  idArea: number;
  idCentro: number;
  idEmpresa: number;
};
