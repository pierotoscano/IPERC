import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Variables } from './shared/variables';
import { HomeComponent } from './components/home/home.component';
import { BandejaSolicitudComponent } from './components/bandeja-solicitud/bandeja-solicitud.component';
import { EnviarSolicitudComponent } from './components/enviar-solicitud/enviar-solicitud.component';
import { AsignarSupervisorComponent } from './components/asignar-supervisor/asignar-supervisor.component';
import { FormularioSolicitudComponent } from './components/formulario-solicitud/formulario-solicitud.component';
import { BandejaParametrosComponent } from './components/mantenimiento/bandeja-parametros/bandeja-parametros.component';
import { FormularioParametrosComponent } from './components/mantenimiento/formulario-parametros/formulario-parametros.component';
import { BandejaEtapasComponent } from './components/mantenimiento/bandeja-etapas/bandeja-etapas.component';
import { FormularioEtapasComponent } from './components/mantenimiento/formulario-etapas/formulario-etapas.component';
import { RegistrarVisitaComponent } from './components/registrar-visita/registrar-visita.component';
import { RegistrarActividadComponent } from './components/registrar-actividad/registrar-actividad.component';
import { RegistrarRiesgoComponent } from './components/registrar-riesgo/registrar-riesgo.component';
import { ActividadesComponent } from './components/peligros-y-riesgos/actividades/actividades.component';
import { AgregarActividadComponent } from './components/puestos-y-actividades/pop-up/agregar-actividad/agregar-actividad.component';
import { LoginComponent } from './components/login/login.component';
import { DuplicarMatrizComponent } from './components/duplicar-matriz/duplicar-matriz.component';



const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home'  },
  {
    path: Variables.path.home,
    component: HomeComponent,
    //loadChildren: () => import('./components/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: Variables.path.bandejaSolicitudMaterial,
    component: BandejaSolicitudComponent,
    //loadChildren: () => import('./components/bandeja-solicitud/bandeja-solicitud.component').then(m => m.BandejaSolicitudComponent)
  },
  {
    path: `${Variables.path.bandejaSolicitudMaterialEtapa}`,
    component: BandejaSolicitudComponent,
    //loadChildren: () => import('./components/bandeja-solicitud/bandeja-solicitud.component').then(m => m.BandejaSolicitudComponent)
  },
  {
    path: Variables.path.duplicarMatriz,
    component: DuplicarMatrizComponent
  },
  {
    path: Variables.path.formSolicitudMaterial,
    component: FormularioSolicitudComponent,
    //loadChildren: () => import('./components/formulario-solicitud/formulario-solicitud.component').then(m => m.FormularioSolicitudComponent)
  },
  {
    path: Variables.path.login,
    component: LoginComponent
  },
  {
    path: "enviar-solicitud",
    component: EnviarSolicitudComponent,
    //loadChildren: () => import('./components/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: "enviar-solicitud/:idSolicitudMatriz",
    component: EnviarSolicitudComponent,
    //loadChildren: () => import('./components/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: "asignar-supervisor",
    component: AsignarSupervisorComponent,
    //loadChildren: () => import('./components/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: "registrar-visita",
    component: RegistrarVisitaComponent,
    //loadChildren: () => import('./components/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: "registrar-actividad",
    component: RegistrarActividadComponent,
    //loadChildren: () => import('./components/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: "registrar-riesgo",
    component: RegistrarRiesgoComponent,
    //loadChildren: () => import('./components/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: "tabla-actividades",
    component: ActividadesComponent,
    //loadChildren: () => import('./components/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: "agregar-actividad",
    component: AgregarActividadComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
