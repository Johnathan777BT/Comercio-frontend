import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ListComerciantesComponent } from './components/list-comerciantes/list-comerciantes.component';
import { CrearComerciantesComponent } from './components/crear-comerciantes/crear-comerciantes.component';
import { CrearEstablecimientosComponent } from './components/crear-establecimientos/crear-establecimientos.component';
import { ContainerEstablecimientoComponent } from './components/container-establecimiento/container-establecimiento.component';
import { PersonalDetailsComponent } from './components/personal-details/personal-details.component';
import { ListUsuariosComponent } from './components/list-usuarios/list-usuarios.component';
import { UsuarioComponent } from './auth/usuario/usuario.component';

const routes: Routes = [
  {path:'',redirectTo:'/inicio', pathMatch:'full'},
  {path:'inicio',component:DashboardComponent}, //
  {path:'iniciar-sesion',component:LoginComponent},
  {path:'crear-comerciantes/:id/:tot',component:CrearComerciantesComponent},
  {path:'crear-establecimiento/:id', component:CrearEstablecimientosComponent},
  {path:'container-establecimiento/:id', component:ContainerEstablecimientoComponent },
  {path:'actualizar-perfil/:id', component:PersonalDetailsComponent  },
  {path:'listar-usuarios', component:ListUsuariosComponent},
  {path:'nuevo-usuario', component:UsuarioComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
